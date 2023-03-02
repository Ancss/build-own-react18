export type WorkTag =
	| typeof FunctionComponent
	| typeof HostRoot
	| typeof HostComponent
	| typeof HostText

export const FunctionComponent = 0
export const HostRoot = 1
export const HostComponent = 1 << 1
export const HostText = 1 << 2
