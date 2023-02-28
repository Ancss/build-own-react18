import {
	getBaseRollupPlugins,
	getPackageJson,
	resolvePackagePath,
} from './utils'
import rollupPluginGeneratePackageJSON from 'rollup-plugin-generate-package-json'
const { name, module } = getPackageJson('react')
const pkgPath = resolvePackagePath(name)
const pkgDistPath = resolvePackagePath(name, true)
export default [
	{
		input: `${pkgPath}/${module}`,
		output: {
			file: `${pkgDistPath}/index.js`,
			name: 'index.js',
			format: 'umd',
		},
		plugins: [
			...getBaseRollupPlugins(),
			rollupPluginGeneratePackageJSON({
				inputFolder: pkgPath,
				outputFolder: pkgDistPath,
				baseContents: ({ name, description, version }) => ({
					name,
					description,
					version,
					main: 'index.js',
				}),
			}),
		],
	},
	{
		input: `${pkgPath}/src/jsx.ts`,
		output: [
			{
				file: `${pkgDistPath}/jsx-runtime.js`,
				name: 'jsx-runtime.js',
				format: 'umd',
			},
			{
				file: `${pkgDistPath}/jsx-dev-runtime.js`,
				name: 'jsx-dev-runtime.js',
				format: 'umd',
			},
		],
		plugins: getBaseRollupPlugins(),
	},
]
