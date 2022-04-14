import { eTokenType } from './tokendef';

export enum eScriptNode {
	snUndefined,
	snScript,
	snFunction,
	snConstant,
	snDataType,
	snIdentifier,
	snParameterList,
	snStatementBlock,
	snDeclaration,
	snExpressionStatement,
	snIf,
	snFor,
	snWhile,
	snReturn,
	snExpression,
	snExprTerm,
	snFunctionCall,
	snConstructCall,
	snArgList,
	snExprPreOp,
	snExprPostOp,
	snExprOperator,
	snExprValue,
	snBreak,
	snContinue,
	snDoWhile,
	snAssignment,
	snCondition,
	snSwitch,
	snCase,
	snImport,
	snClass,
	snInitList,
	snInterface,
	snEnum,
	snTypedef,
	snCast,
	snVariableAccess,
	snFuncDef,
	snVirtualProperty,
	snNamespace,
	snMixin,
	snListPattern,
	snNamedArgument,
	snScope,
	// snTryCatch,
	snUnrealDeclarator,
	snUnrealDeclaratorObject,
	snUnrealDefaultValue,
	snUnrealAccess,
	snUnrealAccessValue,
	snUnrealAccessValueModifier,
	snUnrealAccessReference,
}

export class sToken {
	constructor(
		public type: eTokenType,
		public pos: number,
		public length: number
	) {}
}

export class asCScriptNode {
	public tokenType: eTokenType = eTokenType.ttUnrecognizedToken;
	public tokenPos: number = 0;
	public tokenLength: number = 0;

	public parent: asCScriptNode | null = null;
	public next: asCScriptNode | null = null;
	public prev: asCScriptNode | null = null;
	public firstChild: asCScriptNode | null = null;
	public lastChild: asCScriptNode | null = null;

	public constructor(public nodeType: eScriptNode) {}

	public CreateCopy(): asCScriptNode {
		let node = new asCScriptNode(this.nodeType);

		node.tokenLength = this.tokenLength;
		node.tokenPos = this.tokenPos;
		node.tokenType = this.tokenType;

		let child = this.firstChild;

		while (child) {
			node.AddChildLast(child.CreateCopy());
			child = child.next;
		}

		return node;
	}

	public SetToken(token: sToken) {
		this.tokenType = token.type;
	}

	public UpdateSourcePos(pos: number, length: number) {
		if (pos == 0 && length == 0) return;

		if (this.tokenPos == 0 && this.tokenLength == 0) {
			this.tokenPos = pos;
			this.tokenLength = length;
		} else if (this.tokenPos > pos) {
			this.tokenLength = this.tokenPos + this.tokenLength - pos;
			this.tokenPos = pos;
		} else if (pos + length > this.tokenPos + this.tokenLength) {
			this.tokenLength = pos + length - this.tokenPos;
		}
	}

	public AddChildLast(node: asCScriptNode) {
		if (this.lastChild) {
			this.lastChild.next = node;
			node.next = null;
			node.prev = this.lastChild;
			node.parent = this;
			this.lastChild = node;
		} else {
			this.firstChild = node;
			this.lastChild = node;
			node.next = null;
			node.prev = null;
			node.parent = this;
		}

		this.UpdateSourcePos(node.tokenPos, node.tokenLength);
	}

	public DisconnectParent() {
		if (this.parent) {
			if (this.parent.firstChild == this)
				this.parent.firstChild = this.next;
			if (this.parent.lastChild == this)
				this.parent.lastChild = this.prev;
		}

		if (this.next) this.next.prev = this.prev;

		if (this.prev) this.prev.next = this.next;

		this.parent = null;
		this.next = null;
		this.prev = null;
	}
}
