export enum eTokenType {
	ttUnrecognizedToken,

	ttEnd,                 // End of file

	// White space and comments
	ttWhiteSpace,          // ' ', '\t', '\r', '\n', UTF8 byte-order-mark
	ttWhiteSpaceWithEmptyLine,          // whitespace that includes one empty line
	ttWhiteSpaceWithEmptyLines,          // whitespace that includes more than one empty line
	ttOnelineComment,      // // \n
	ttMultilineComment,    // /* */

	// Atoms
	ttIdentifier,                  // abc123
	ttIntConstant,                 // 1234
	ttFloat32Constant,               // 12.34e56f
	ttFloat64Constant,              // 12.34e56
	ttStringConstant,              // "123"
	ttMultilineStringConstant,     //
	ttHeredocStringConstant,       // """text"""
	ttNonTerminatedStringConstant, // "123
	ttBitsConstant,                // 0xFFFF

	// Math operators
	ttPlus,                // +
	ttMinus,               // -
	ttStar,                // *
	ttSlash,               // /
	ttPercent,             // %
	ttStarStar,            // **

	ttHandle,              // @

	ttAddAssign,           // +=
	ttSubAssign,           // -=
	ttMulAssign,           // *=
	ttDivAssign,           // /=
	ttModAssign,           // %=
	ttPowAssign,           // **=

	ttOrAssign,            // |=
	ttAndAssign,           // &=
	ttXorAssign,           // ^=
	ttShiftLeftAssign,     // <<=
	ttShiftRightLAssign,   // >>=
	ttShiftRightAAssign,   // >>>=

	ttInc,                 // ++
	ttDec,                 // --

	ttDot,                 // .
	ttScope,               // ::

	// Statement tokens
	ttAssignment,          // =
	ttEndStatement,        // ;
	ttListSeparator,       // ,
	ttStartStatementBlock, // {
	ttEndStatementBlock,   // }
	ttOpenParanthesis,     // (
	ttCloseParanthesis,    // )
	ttOpenBracket,         // [
	ttCloseBracket,        // ]
	ttAmp,                 // &

	// Bitwise operators
	ttBitOr,               // |
	ttBitNot,              // ~
	ttBitXor,              // ^
	ttBitShiftLeft,        // <<
	ttBitShiftRight,       // >>     // TODO: In Java this is the arithmetical shift
	ttBitShiftRightArith,  // >>>    // TODO: In Java this is the logical shift

	// Compare operators
	ttEqual,               // ==
	ttNotEqual,            // !=
	ttLessThan,            // <
	ttGreaterThan,         // >
	ttLessThanOrEqual,     // <=
	ttGreaterThanOrEqual,  // >=

	ttQuestion,            // ?
	ttColon,               // :

	// Reserved keywords
	ttIf,                  // if
	ttElse,                // else
	ttFor,                 // for
	ttWhile,               // while
	ttBool,                // bool
	ttFuncDef,             // funcdef
	ttImport,              // import
	ttInt,                 // int
	ttInt8,                // int8
	ttInt16,               // int16
	ttInt64,               // int64
	ttInterface,           // interface
	ttIs,                  // is
	ttNotIs,               // !is
	ttUInt,                // uint
	ttUInt8,               // uint8
	ttUInt16,              // uint16
	ttUInt64,              // uint64
	ttFloat,               // float
	ttFloat32,             // float32
	ttFloat64,             // float64
	ttVoid,                // void
	ttTrue,                // true
	ttFalse,               // false
	ttReturn,              // return
	ttNot,                 // not
	ttAnd,                 // and, &&
	ttOr,                  // or, ||
	ttXor,                 // xor, ^^
	ttBreak,               // break
	ttContinue,            // continue
	ttConst,               // const
	ttDo,                  // do
	ttDouble,              // double
	ttSwitch,              // switch
	ttCase,                // case
	ttDefault,             // default
	ttIn,                  // in
	ttOut,                 // out
	ttInOut,               // inout
	ttNull,                // null
	ttClass,               // class
	ttTypedef,             // typedef
	ttEnum,                // enum
	ttCast,                // cast
	ttPrivate,             // private
	ttProtected,           // protected
	ttNamespace,           // namespace
	ttMixin,               // mixin
	ttAuto,                // auto
	ttStruct,              // struct
	ttLocal,               // local

	ttAccess,
	ttUnresolvedObject,

	ttUFunction,
	ttUProperty,
	ttUClass,
	ttUStruct,

	ttUnrealNameLiteral,
	ttUnrealNameLiteralMultiline,
	ttUnrealNameLiteralNonTerminated,
}

// eslint-disable-next-line functional/no-class
export class TokenWord {
	constructor(
		public readonly word: string,
		public readonly wordLength: number,
		public readonly tokenType: eTokenType
	) {}
}

const asTokenDef = (str: string, tok: eTokenType) => {
	return new TokenWord(str, str.length, tok);
};

// eslint-disable-next-line functional/prefer-readonly-type
export const tokenWords: TokenWord[] = [
	asTokenDef("+"         , eTokenType.ttPlus),
	asTokenDef("+="        , eTokenType.ttAddAssign),
	asTokenDef("++"        , eTokenType.ttInc),
	asTokenDef("-"         , eTokenType.ttMinus),
	asTokenDef("-="        , eTokenType.ttSubAssign),
	asTokenDef("--"        , eTokenType.ttDec),
	asTokenDef("*"         , eTokenType.ttStar),
	asTokenDef("*="        , eTokenType.ttMulAssign),
	asTokenDef("/"         , eTokenType.ttSlash),
	asTokenDef("/="        , eTokenType.ttDivAssign),
	asTokenDef("%"         , eTokenType.ttPercent),
	asTokenDef("%="        , eTokenType.ttModAssign),
	asTokenDef("**"        , eTokenType.ttStarStar),
	asTokenDef("**="       , eTokenType.ttPowAssign),
	asTokenDef("="         , eTokenType.ttAssignment),
	asTokenDef("=="        , eTokenType.ttEqual),
	asTokenDef("."         , eTokenType.ttDot),
	asTokenDef("|"         , eTokenType.ttBitOr),
	asTokenDef("|="        , eTokenType.ttOrAssign),
	asTokenDef("||"        , eTokenType.ttOr),
	asTokenDef("&"         , eTokenType.ttAmp),
	asTokenDef("&="        , eTokenType.ttAndAssign),
	asTokenDef("&&"        , eTokenType.ttAnd),
	asTokenDef("^"         , eTokenType.ttBitXor),
	asTokenDef("^="        , eTokenType.ttXorAssign),
	asTokenDef("^^"        , eTokenType.ttXor),
	asTokenDef("<"         , eTokenType.ttLessThan),
	asTokenDef("<="        , eTokenType.ttLessThanOrEqual),
	asTokenDef("<<"        , eTokenType.ttBitShiftLeft),
	asTokenDef("<<="       , eTokenType.ttShiftLeftAssign),
	asTokenDef(">"         , eTokenType.ttGreaterThan),
	asTokenDef(">="        , eTokenType.ttGreaterThanOrEqual),
	asTokenDef(">>"        , eTokenType.ttBitShiftRight),
	asTokenDef(">>="       , eTokenType.ttShiftRightLAssign),
	asTokenDef(">>>"       , eTokenType.ttBitShiftRightArith),
	asTokenDef(">>>="      , eTokenType.ttShiftRightAAssign),
	asTokenDef("~"         , eTokenType.ttBitNot),
	asTokenDef(";"         , eTokenType.ttEndStatement),
	asTokenDef(","         , eTokenType.ttListSeparator),
	asTokenDef("{"         , eTokenType.ttStartStatementBlock),
	asTokenDef("}"         , eTokenType.ttEndStatementBlock),
	asTokenDef("("         , eTokenType.ttOpenParanthesis),
	asTokenDef(")"         , eTokenType.ttCloseParanthesis),
	asTokenDef("["         , eTokenType.ttOpenBracket),
	asTokenDef("]"         , eTokenType.ttCloseBracket),
	asTokenDef("?"         , eTokenType.ttQuestion),
	asTokenDef(":"         , eTokenType.ttColon),
	asTokenDef("::"        , eTokenType.ttScope),
	asTokenDef("!"         , eTokenType.ttNot),
	asTokenDef("!="        , eTokenType.ttNotEqual),
	//asTokenDef("!is"       , eTokenType.ttNotIs),
	//asTokenDef("@"         , eTokenType.ttHandle),
	//asTokenDef("and"       , eTokenType.ttAnd),
	asTokenDef("access"    , eTokenType.ttAccess),
	asTokenDef("auto"      , eTokenType.ttAuto),
	asTokenDef("bool"      , eTokenType.ttBool),
	asTokenDef("break"     , eTokenType.ttBreak),
	asTokenDef("case"      , eTokenType.ttCase),
	asTokenDef("Cast"      , eTokenType.ttCast),
	asTokenDef("class"     , eTokenType.ttClass),
	asTokenDef("const"     , eTokenType.ttConst),
	asTokenDef("continue"  , eTokenType.ttContinue),
	asTokenDef("default"   , eTokenType.ttDefault),
	asTokenDef("do"        , eTokenType.ttDo),
	asTokenDef("double"    , eTokenType.ttDouble),
	asTokenDef("else"      , eTokenType.ttElse),
	asTokenDef("enum"      , eTokenType.ttEnum),
	asTokenDef("false"     , eTokenType.ttFalse),
	asTokenDef("float"     , eTokenType.ttFloat),
	asTokenDef("float32"   , eTokenType.ttFloat32),
	asTokenDef("float64"   , eTokenType.ttFloat64),
	asTokenDef("for"       , eTokenType.ttFor),
	//asTokenDef("funcdef"   , eTokenType.ttFuncDef),
	asTokenDef("if"        , eTokenType.ttIf),
	asTokenDef("import"    , eTokenType.ttImport),
	asTokenDef("in"        , eTokenType.ttIn),
	asTokenDef("inout"     , eTokenType.ttInOut),
	asTokenDef("int"       , eTokenType.ttInt),
	asTokenDef("int8"      , eTokenType.ttInt8),
	asTokenDef("int16"     , eTokenType.ttInt16),
	asTokenDef("int32"     , eTokenType.ttInt),
	asTokenDef("int64"     , eTokenType.ttInt64),
	//asTokenDef("interface" , eTokenType.ttInterface),
	//asTokenDef("is"        , eTokenType.ttIs),
	asTokenDef("local"     , eTokenType.ttLocal),
	asTokenDef("mixin"     , eTokenType.ttMixin),
	asTokenDef("namespace" , eTokenType.ttNamespace),
	//asTokenDef("not"       , eTokenType.ttNot),
	asTokenDef("nullptr"   , eTokenType.ttNull),
	//asTokenDef("or"        , eTokenType.ttOr),
	asTokenDef("out"       , eTokenType.ttOut),
	asTokenDef("private"   , eTokenType.ttPrivate),
	asTokenDef("protected" , eTokenType.ttProtected),
	asTokenDef("return"    , eTokenType.ttReturn),
	asTokenDef("struct"    , eTokenType.ttStruct),
	asTokenDef("switch"    , eTokenType.ttSwitch),
	asTokenDef("true"      , eTokenType.ttTrue),
	//asTokenDef("typedef"   , eTokenType.ttTypedef),
	asTokenDef("uint"      , eTokenType.ttUInt),
	asTokenDef("uint8"     , eTokenType.ttUInt8),
	asTokenDef("uint16"    , eTokenType.ttUInt16),
	asTokenDef("uint32"    , eTokenType.ttUInt),
	asTokenDef("uint64"    , eTokenType.ttUInt64),
	asTokenDef("unresolved_object" , eTokenType.ttUnresolvedObject),
	asTokenDef("void"      , eTokenType.ttVoid),
	asTokenDef("while"     , eTokenType.ttWhile),
	//asTokenDef("xor"       , eTokenType.ttXor),


	asTokenDef("UFUNCTION" , eTokenType.ttUFunction),
	asTokenDef("UPROPERTY" , eTokenType.ttUProperty),
	asTokenDef("UCLASS"    , eTokenType.ttUClass),
	asTokenDef("USTRUCT"   , eTokenType.ttUStruct),
];

export const whiteSpace = ' \t\r\n';

// Some keywords that are not considered tokens by the parser
// These only have meaning in specific situations. Outside these
// situations they are treated as normal identifiers.
export const THIS_TOKEN      = "this";
export const FROM_TOKEN      = "from";
export const SUPER_TOKEN     = "super";
export const SHARED_TOKEN    = "shared";
export const FINAL_TOKEN     = "final";
export const TIDY_TOKEN      = "tidy";
export const OVERRIDE_TOKEN  = "override";
export const GET_TOKEN       = "get";
export const SET_TOKEN       = "set";
export const ABSTRACT_TOKEN  = "abstract";
export const FUNCTION_TOKEN  = "function";
export const IF_HANDLE_TOKEN = "if_handle_then_const";
export const HANDLE_ONLY_TOKEN = "handle_only";
export const EXTERNAL_TOKEN  = "external";
export const PROPERTY_TOKEN  = "property";
export const MIXIN_TOKEN  = "mixin";
export const READONLY_TOKEN  = "readonly";
export const EDITDEFAULTS_TOKEN  = "editdefaults";
export const INHERITED_TOKEN  = "inherited";
