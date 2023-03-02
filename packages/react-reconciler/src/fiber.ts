import { Flags, NoFlags } from './fiberFlags'
import { Container } from './hostConfig'
import { FunctionComponent, HostComponent, WorkTag } from './workTags'
import { Key, Props, ReactElementType, Ref } from '../../share/ReactTypes'

export class FiberNode {
	type: any
	stateNode: any
	ref: Ref

	return: FiberNode | null
	sibling: FiberNode | null
	child: FiberNode | null
	index: number
	memoizedProps: Props | null
	memoizedState: any

	alternate: FiberNode | null
	flags: Flags
	subTreeFlags:Flags
	updateQueue: unknown
	constructor(
		public tag: WorkTag,
		public pendingProps: Props,
		public key: Key
	) {
		this.tag = tag
		this.key = key
		this.stateNode = null
		this.type = null

		this.return = null
		this.sibling = null
		this.child = null
		this.index = 0

		this.ref = null

		this.pendingProps = pendingProps
		this.memoizedProps = null
		this.memoizedState = null
		this.updateQueue = null

		this.alternate = null

		this.flags = NoFlags
		this.subTreeFlags = NoFlags
	}
}

export class FiberRootNode {
	container: Container
	current: FiberNode
	finishedWork: FiberNode | null
	constructor(container, hostRootFiber: FiberNode) {
		this.container = container
		this.current = hostRootFiber
		hostRootFiber.stateNode = this
		this.finishedWork = null
	}
}

export const createWorkInProgress = (
	current: FiberNode,
	pendingProps: Props
): FiberNode => {
	let wip = current.alternate
	if (wip === null) {
		wip = new FiberNode(current.tag, pendingProps, current.key)
		wip.type = current.type
		wip.stateNode = current.stateNode
		wip.alternate = current
		current.alternate = wip
	} else {
		wip.pendingProps = pendingProps
		wip.flags = NoFlags
		wip.subTreeFlags = NoFlags
	}
	wip.type = current.type
	wip.updateQueue = current.updateQueue
	wip.child = current.child
	wip.memoizedProps = current.memoizedProps
	wip.memoizedState = current.memoizedState
	return wip
}

export function createFiberFromElement(element:ReactElementType){
	const {type,key,props} = element
	let fiberTag:WorkTag = FunctionComponent
	if(typeof type==='string'){
		fiberTag = HostComponent
	}else if(typeof type!=='function'&&__DEV__){
		console.warn('the type of "type" is unrealized')
	}
	const fiber = new FiberNode(fiberTag,props,key)
	fiber.type = type
	return fiber
}