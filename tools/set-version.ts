import {argv} from 'process';
import readline from 'readline';
import fs from 'fs';

(async () => {
	let displayUsage = true;

	// Display Usage When Missing Required Arguments
	function DisplayUsage() {
		if (!displayUsage) return true;
		displayUsage = false;
		console.log(`npm run set-version -- 1.0.0`);
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
	while (!(argv[2] = argv[2]?.trim()) && DisplayUsage()) argv[2] = await question("Version (Major.Minor.Patch)?");
	const projectVersion = argv[2];

	// Close Line Reader
	reader.close();

	// Rename Package
	const packageJsonFilename = 'package.json';
	const packageJson = JSON.parse(fs.readFileSync(packageJsonFilename).toString());
	packageJson['version'] = projectVersion;
	fs.writeFileSync(packageJsonFilename, JSON.stringify(packageJson, null, 2));

	// Rename Executable
	const executableJsonFilename = 'src/public/package.json';
	const executableJson = JSON.parse(fs.readFileSync(executableJsonFilename).toString());
	executableJson['version'] = projectVersion;
	fs.writeFileSync(executableJsonFilename, JSON.stringify(executableJson, null, 2));
})();
