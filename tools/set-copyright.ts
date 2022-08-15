import {argv} from 'process';
import readline from 'readline';
import fs from 'fs';

(async () => {
	let displayUsage = true;

	// Display Usage When Missing Required Arguments
	function DisplayUsage() {
		if (!displayUsage) return true;
		displayUsage = false;
		console.log(`npm run set-copyright -- "© ${new Date().getFullYear()} Caleb Gray"`);
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
	while (!(argv[2] = argv[2]?.trim()) && DisplayUsage()) argv[2] = await question(`Copyright (© ${new Date().getFullYear()} Author Name)?`);
	const projectCopyright = argv[2];

	// Close Line Reader
	reader.close();

	// Rename Copyright
	const copyrightJsonFilename = 'src/public/package.json';
	const copyrightJson = JSON.parse(fs.readFileSync(copyrightJsonFilename).toString());
	copyrightJson['build']['win']['copyright'] = projectCopyright;
	copyrightJson['build']['mac']['copyright'] = projectCopyright;
	copyrightJson['build']['linux']['copyright'] = projectCopyright;
	fs.writeFileSync(copyrightJsonFilename, JSON.stringify(copyrightJson, null, 2));
})();
