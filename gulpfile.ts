import {Levels, Log} from '@toreda/log';
import {series, src} from 'gulp';

import {Build} from '@toreda/build-tools';
import {EventEmitter} from 'events';
import {execFile} from 'child_process';
import {promises as fs} from 'fs';
import path from 'path';

const log = new Log({
	consoleEnabled: true,
	globalLevel: Levels.ALL
});

const build: Build = new Build({
	log: log,
	events: new EventEmitter(),
	linter: {
		globInputPaths: true
	}
});

async function runLint(): Promise<NodeJS.ReadWriteStream> {
	return build.gulpSteps.lint({
		formatterId: 'stylish',
		srcPatterns: ['./src/**.ts', './src/**/**.ts']
	});
}

function createDist(): Promise<NodeJS.ReadWriteStream> {
	return build.gulpSteps.createDir('./dist', true);
}

function cleanDist(): Promise<NodeJS.ReadWriteStream> {
	return build.gulpSteps.cleanDir('./dist', true);
}

function buildCjs(): Promise<NodeJS.ReadWriteStream> {
	return build.run.typescript('./dist/cjs', 'tsconfig.json');
}

function buildEsm(): Promise<NodeJS.ReadWriteStream> {
	return build.run.typescript('./dist/esm', 'tsconfig.esm.json');
}

function runTsc(args: string[]): Promise<void> {
	const tscPath = path.join(path.dirname(require.resolve('typescript')), 'tsc.js');

	return new Promise((resolve, reject) => {
		execFile(process.execPath, [tscPath, ...args], (err, stdout, stderr) => {
			if (err) {
				log.error(`tsc failed:\n${stdout}${stderr}`);
				return reject(err);
			}

			resolve();
		});
	});
}

/**
 * The main compile strips comments from all output. Re-emit declarations
 * with comments intact so consumers keep JSDoc hover docs - .d.ts files
 * never reach a runtime bundle, so charset-sensitive bytes are fine there.
 */
async function buildTypes(): Promise<void> {
	await runTsc(['-p', 'tsconfig.types.json', '--outDir', './dist/esm']);
	await runTsc(['-p', 'tsconfig.types.json', '--outDir', './dist/cjs']);
}

/**
 * Rewrite a relative import specifier to include an explicit file extension.
 * Node's ESM resolver requires extensions, but tsc emits specifiers as written in source.
 */
async function resolveSpecifier(fileDir: string, specifier: string): Promise<string> {
	if (/\.(js|mjs|cjs|json)$/.test(specifier)) {
		return specifier;
	}

	try {
		await fs.access(path.resolve(fileDir, `${specifier}.js`));
		return `${specifier}.js`;
	} catch {
		return `${specifier}/index.js`;
	}
}

async function addJsExtensions(dir: string): Promise<void> {
	const entries = await fs.readdir(dir, {withFileTypes: true});

	for (const entry of entries) {
		const entryPath = path.join(dir, entry.name);

		if (entry.isDirectory()) {
			await addJsExtensions(entryPath);
			continue;
		}

		if (!/\.(js|d\.ts)$/.test(entry.name)) {
			continue;
		}

		const content = await fs.readFile(entryPath, 'utf8');
		const specifiers = new Map<string, string>();
		const pattern = /(?:from|import)\s*\(?\s*(['"])(\.\.?\/[^'"]*)\1/g;

		let match: RegExpExecArray | null;
		while ((match = pattern.exec(content)) !== null) {
			specifiers.set(match[2], await resolveSpecifier(dir, match[2]));
		}

		let output = content;
		for (const [specifier, replacement] of specifiers) {
			if (specifier === replacement) {
				continue;
			}

			output = output.split(`'${specifier}'`).join(`'${replacement}'`);
			output = output.split(`"${specifier}"`).join(`"${replacement}"`);
		}

		if (output !== content) {
			await fs.writeFile(entryPath, output, 'utf8');
		}
	}
}

/**
 * Make each output dir self-describing so Node picks the right module system
 * regardless of the root package's `type` field, and fix ESM import specifiers.
 */
async function finalizeDist(): Promise<void> {
	await addJsExtensions(path.resolve('./dist/esm'));
	await fs.writeFile(path.resolve('./dist/esm/package.json'), JSON.stringify({type: 'module'}, null, '\t'));
	await fs.writeFile(path.resolve('./dist/cjs/package.json'), JSON.stringify({type: 'commonjs'}, null, '\t'));
}

exports.default = series(createDist, cleanDist, runLint, buildCjs, buildEsm, buildTypes, finalizeDist);
