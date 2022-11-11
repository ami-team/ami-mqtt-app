module.exports = {
	root: true,
	parserOptions: {
		ecmaVersion: 13
	},
	extends: [
		'eslint:recommended',
		'plugin:vue/vue3-essential'
	],
	rules: {
		indent: ['error', 4],
		quotes: [
			2,
			'single'
		]
	},
	globals: {
		'amiWebApp': false,
		'amiAuth': false,
	}
};
