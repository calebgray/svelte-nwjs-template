import {argv} from 'process';
import fs from 'fs';
import path from 'path';
//import evb from 'enigmavirtualbox';
//import AdmZip from 'adm-zip';

// Configurable Platforms
const configurablePlatforms = {
	'win32': 'win-x86',
	'win64': 'win-x64',
	'mac64': 'mac-x64',
	'lin32': 'linux-x86',
	'lin64': 'linux-x64',
};

(async () => {
	// Display Usage?
	if (argv.includes('-h') || argv.includes('--help')) {
		console.log(`npm run bundle -- [platform]...`);
		console.log();
		console.log(`platforms: ${Object.keys(configurablePlatforms).sort().join(' ')}`);
		console.log();
		console.log('examples:');
		console.log(' npm run bundle');
		console.log(' npm run bundle -- win32 win64');
		console.log();
		console.log('Bundles all platforms found in dist/dist by default.');
		console.log();
		return;
	}

	// Read App Info
	const packageJson = JSON.parse(fs.readFileSync('src/public/package.json').toString());
	const appName = packageJson['name'];
	const appVersion = packageJson['version'];

	// Find Built Platforms
	const platformPrefix = `${appName}-${appVersion}-`;
	const platformDirs = !fs.existsSync('dist/dist') ? [] : fs.readdirSync('dist/dist', {withFileTypes: true})
	.filter(dirent => dirent.isDirectory() && dirent.name.startsWith(platformPrefix))
	.map(dirent => dirent.name)
	.reduce((k, v) => ({...k, [v]: null}), {});
	if (Object.keys(platformDirs).length == 0) {
		console.error("No platform builds found in `dist/dist` directory, be sure to build your distributables:");
		console.error("npm run build");
		console.error("npm run dist");
		return;
	}

	// Determine Target Platforms
	const targetPlatforms = [];
	for (const arg of argv.slice(2)) {
		if (arg in configurablePlatforms) {
			targetPlatforms.push(configurablePlatforms[arg]);
		} else {
			console.error(`Unknown Argument: ${arg}`);
		}
	}

	// Auto-Detect Platforms?
	if (targetPlatforms.length == 0) {
		targetPlatforms.push(...Object.values(configurablePlatforms));
	} else if (targetPlatforms.length > 1) {
		console.log(`Bundling Platforms: ${targetPlatforms.join(' ')}`);
	}

	// Platform Bundlers
	const platformBundler = {
		'win-x86': async (platform = 'x32') => {
			console.log(`TODO: ${platform}`);

			/*const evpName = `${appName}.evp`;
			const executableName = `${appName}.exe`;*/

			/*const zipName = `package.nw`;
			const zip = new AdmZip();

			for (const path of fs.readdirSync('.', {withFileTypes: true})) {
				if (path.name == executableName) continue;
				if (path.name == evpName) continue;
				if (path.name == zipName) continue;
				if (path.isDirectory()) {
					zip.addLocalFolder(path.name);
				} else {
					zip.addLocalFile(path.name);
				}
			}
			zip.writeZip(zipName);*/

			/*try {
				await evb.gen(evpName, `../${appName}-${platform}-${appVersion}.exe`, executableName, zipName);
				//await evb.gui(evpName);
				await evb.cli(evpName);
			} catch (err) {
				console.error(err);
			}*/
		},
		'win-x64': async () => {
			await platformBundler['win-x86']('x64');
		},
		'mac-x64': async () => {
			console.log('TODO');
		},
		'linux-x86': async () => {
			console.log('TODO');
		},
		'linux-x64': async () => {
			console.log('TODO');
		},
	};

	// Generate App Bundles
	const originalDir = process.cwd();
	for (const targetPlatform of targetPlatforms) {
		// Final Sanity Check
		const platformDir = `${platformPrefix}${targetPlatform}`;
		const absolutePlatformDir = path.join(originalDir, `./dist/dist/${platformDir}`);
		if (!(platformDir in platformDirs)) {
			console.error(`Platform Not Found; Skipping: ${absolutePlatformDir}`);
			continue;
		}

		// Communicate Progress
		console.log(`Bundling Platform: ${targetPlatform}`);
		process.chdir(absolutePlatformDir);
		await platformBundler[targetPlatform]();
	}
})();
