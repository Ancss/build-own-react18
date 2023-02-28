import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)
const pkgPath = path.resolve(__dirname, '../../packages')
const distPath = path.resolve(__dirname, '../../dist/node_modules')

import ts from 'rollup-plugin-typescript2'
import cjs from '@rollup/plugin-commonjs'

export function resolvePackagePath(pkgName, isDist) {
	if (isDist) {
		return `${distPath}/${pkgName}`
	}
	return `${pkgPath}/${pkgName}`
}

export function getPackageJson(pkgName) {
	const path = `${resolvePackagePath(pkgName)}/package.json`
	const str = fs.readFileSync(path, { encoding: 'utf-8' })
	return JSON.parse(str)
}

export function getBaseRollupPlugins({ typescript = {} } = {}) {
	return [cjs(), ts(typescript)]
}
