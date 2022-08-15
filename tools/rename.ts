import {argv} from 'process';
import {basename, dirname} from 'path';
import {fileURLToPath} from 'url';
import readline from 'readline';
import fs from 'fs';

(async () => {
	let displayUsage = true;

	// Display Usage When Missing Required Arguments
	function DisplayUsage() {
		if (!displayUsage) return true;
		displayUsage = false;
		console.log(`npm run rename -- "Project Name" executable-name [package-name]`);
		console.log();
		console.log('package-name: defaults to the name of the parent directory.');
		console.log();
		return true;
	}

	// Open Line Reader
	const reader = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	// Ask a Question as a Promise
	const question = (str) => new Promise<string>(resolve => reader.question(`${str} `, resolve));

	// Read and Sanitize Project Name
	let askForPackageName = argv.length <= 3;
	while (!(argv[2] = argv[2]?.trim()) && DisplayUsage()) argv[2] = await question("Project Name?");
	const projectName = argv[2];

	// Read and Sanitize Executable Name
	while (!(argv[3] = argv[3]?.replace(/[\\\/:\*\?"<>\|]/g, '')) && DisplayUsage()) argv[3] = await question("Executable Filename?");
	const executableName = argv[3];

	// Read and Sanitize Package Name
	const sanitizePackageName = packageName => packageName.replace(/[^a-z0-9_-]/gi, '').toLowerCase();
	let packageName = sanitizePackageName(basename(dirname(dirname(fileURLToPath(import.meta.url)))));
	if (askForPackageName) {
		while (!(argv[4] = sanitizePackageName(!argv[4] ? '' : argv[4])) && DisplayUsage()) {
			argv[4] = await question(`Package Name? [${packageName}]`);
			if (argv[4] === '') argv[4] = packageName;
		}
		packageName = argv[4];
	}

	// Close Line Reader
	reader.close();

	// Rename Package
	const packageJsonFilename = 'package.json';
	const packageJson = JSON.parse(fs.readFileSync(packageJsonFilename).toString());
	packageJson['name'] = packageName;
	fs.writeFileSync(packageJsonFilename, JSON.stringify(packageJson, null, 2));

	// Rename Executable
	const executableJsonFilename = 'src/public/package.json';
	const executableJson = JSON.parse(fs.readFileSync(executableJsonFilename).toString());
	executableJson['name'] = executableName;
	fs.writeFileSync(executableJsonFilename, JSON.stringify(executableJson, null, 2));

	// Rename Project
	const indexHtmlFilename = 'src/index.html';
	fs.writeFileSync(indexHtmlFilename, fs.readFileSync(indexHtmlFilename).toString().replace(/<title>[^<]*<\/title>/gi, `<title>${projectName}</title>`));
})();
