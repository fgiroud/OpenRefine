// !/usr/bin/env bash
// set -e

// GROUP1=cypress/integration/open-project/*.spec.js
// GROUP2=cypress/integration/language/*.spec.js
// BROWSERS=
// echo

const glob = require('glob');

// Those specs paths are glob patterns
const groups = [
	{
		specs: [
			'cypress/integration/create-project/**/*.spec.js',
			'cypress/integration/extensions/**/*.spec.js',
			'cypress/integration/import-project/**/*.spec.js',
			'cypress/integration/language/**/*.spec.js',
			'cypress/integration/open-project/**/*.spec.js',
			'cypress/integration/preferences/**/*.spec.js',
			'cypress/integration/project-management/**/*.spec.js',
		],
	},
	{
		specs: [
			'cypress/integration/project/grid/all-column/**/*.spec.js',
			'cypress/integration/project/grid/column/*.spec.js',
			'cypress/integration/project/grid/column/edit-cells/**/*.spec.js',
		],
	},
	{
		specs: [
			'cypress/integration/project/grid/column/edit-column/**/*.spec.js',
			'cypress/integration/project/grid/column/facet/**/*.spec.js',
			'cypress/integration/project/grid/column/facet/reconcile/**/*.spec.js',
		],
	},
	{
		specs: [
			'cypress/integration/project/grid/column/transpose/**/*.spec.js',
			'cypress/integration/project/grid/column/view/**/*.spec.js',
		],
	},
	{
		specs: [
			'cypress/integration/project/grid/misc/**/*.spec.js',
			'cypress/integration/project/grid/row/**/*.spec.js',
			'cypress/integration/project/project-header/**/*.spec.js',
			'cypress/integration/project/undo_redo/**/*.spec.js',
		],
	},
];

const mergedGroups = groups.map((group) => group.specs.join(','));

// step1 ,find files matched by existing groups
const matchedFiles = [];
groups.forEach((group) => {
	group.specs.forEach((pattern) => {
		const files = glob.sync(`main/tests/cypress/${pattern}`);
		matchedFiles.push(...files);
	});
});
// console.log('matched', matchedFiles);

// step2 , add a last group that contains missed files
const allSpecFiles = glob.sync(
	`main/tests/cypress/cypress/integration/**/*.spec.js`
);
const missedFiles = [];
// console.log(allSpecFiles);
for (file of allSpecFiles) {
	if (!matchedFiles.includes(file)) {
		missedFiles.push(file);
	}
}

// if (missedFiles.length) {
// 	mergedGroups.push(missedFiles.join(','));
// }

// const browsers = process.env.browsers.split(',');
const browsers = ['chrome'];
console.log(
	`::set-output name=matrix::{"browser":${JSON.stringify(
		browsers
	)}, "specs":${JSON.stringify(mergedGroups)}}`
);
