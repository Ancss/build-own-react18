/* eslint-disable @typescript-eslint/no-explicit-any */
import { Type } from 'typescript'
import { REACT_ELEMENT_TYPE } from '../../share/ReactSymbols'
import {
	Key,
	Ref,
	Props,
	ElementType,
	ReactElementType,
} from '../../share/ReactTypes'

const ReactElement = (
	type: Type,
	key: Key,
	ref: Ref,
	props: Props
): ReactElementType => {
	const element = {
		$$typeof: REACT_ELEMENT_TYPE,
		type,
		key,
		ref,
		props,
	}
	return element
}

export const jsx = (type: ElementType, config: any, ...children) => {
	let key: Key = null
	const props: Props = {}
	let ref = null
	for (const prop in config) {
		const val = config[prop]
		if (prop === 'key') {
			if (val !== undefined) {
				key += ''
			}
			continue
		} else if (prop === 'ref') {
			if (val !== undefined) {
				ref = val
			}
			continue
		}
		if ({}.hasOwnProperty.call(config, prop)) {
			props[prop] = val
		}
	}
	props.children = [...(props.children || []), ...children]
	return ReactElement(type, key, ref, props)
}

export const jsxDEV = jsx
