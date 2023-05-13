# babel 

## 转化过程

### 准备阶段

* 解析配置

- 三种读取配置的模式

+ root (读取option)

+ upward-optional

读取 `babel.config.js`, `babel.config.cjs`, `babel.config.mjs`, `babel.config.json`，优先级依次变低

+ upward

`.babelrc`, `.babelrc.js`, `.babelrc.cjs`, `.babelrc.mjs`, `.babelrc.json` 只能配置其中的一个

- 配置项

+ preset

+ plugins

+ browserslistConfigFile: string | Object

为 string 时为，解析其相对于 cwd 的路径

> BABEL_SHOW_CONFIG_FOR 展示解析后的配置

> passPerPreset 是否执行了前置 preset


通过 `loadPreset` 和 `loadPlugin` 解析 `babel` 的 `preset` 、 `plugin` 配置。

`preset` 包名称必须遵循以 `babel-preset-` 或 `@babel/preset-` 开头的原则

`plugin` 包名称必须遵循以 `babel-plugin-` 或 `@babel/plugin-` 开头的原则


babel 在 @babel/preset-env 的 option 中解析以下属性，来生成 plugin数组


```js

 const {bugfixes,configPath,debug,exclude: optionsExclude,forceAllTransforms,ignoreBrowserslistConfig,include: optionsInclude,loose,modules,shippedProposals,spec,targets: optionsTargets,useBuiltIns,corejs: { version: corejs, proposals },browserslistEnv,} = normalizeOptions(opts);

```

### 转化

- 将源代码转化成 ast

ast 属性

```js
{
  ArrayExpression: ["elements"],
  AssignmentExpression: ["left", "right"],
  BinaryExpression: ["left", "right"],
  InterpreterDirective: [],
  Directive: ["value"],
  DirectiveLiteral: [],
  BlockStatement: ["directives", "body"],
  BreakStatement: ["label"],
  CallExpression: ["callee", "arguments", "typeParameters", "typeArguments"],
  CatchClause: ["param", "body"],
  ConditionalExpression: ["test", "consequent", "alternate"],
  ContinueStatement: ["label"],
  DebuggerStatement: [],
  DoWhileStatement: ["test", "body"],
  EmptyStatement: [],
  ExpressionStatement: ["expression"],
  File: ["program"],
  ForInStatement: ["left", "right", "body"],
  ForStatement: ["init", "test", "update", "body"],
  FunctionDeclaration: ["id", "params", "body", "returnType", "typeParameters"],
  FunctionExpression: ["id", "params", "body", "returnType", "typeParameters"],
  Identifier: ["typeAnnotation", "decorators"],
  IfStatement: ["test", "consequent", "alternate"],
  LabeledStatement: ["label", "body"],
  StringLiteral: [],
  NumericLiteral: [],
  NullLiteral: [],
  BooleanLiteral: [],
  RegExpLiteral: [],
  LogicalExpression: ["left", "right"],
  MemberExpression: ["object", "property"],
  NewExpression: ["callee", "arguments", "typeParameters", "typeArguments"],
  Program: ["directives", "body"],
  ObjectExpression: ["properties"],
  ObjectMethod: ["key", "params", "body", "decorators", "returnType", "typeParameters"],
  ObjectProperty: ["key", "value", "decorators"],
  RestElement: ["argument", "typeAnnotation"],
  ReturnStatement: ["argument"],
  SequenceExpression: ["expressions"],
  ParenthesizedExpression: ["expression"],
  SwitchCase: ["test", "consequent"],
  SwitchStatement: ["discriminant", "cases"],
  ThisExpression: [],
  ThrowStatement: ["argument"],
  TryStatement: ["block", "handler", "finalizer"],
  UnaryExpression: ["argument"],
  UpdateExpression: ["argument"],
  VariableDeclaration: ["declarations"],
  VariableDeclarator: ["id", "init"],
  WhileStatement: ["test", "body"],
  WithStatement: ["object", "body"],
  AssignmentPattern: ["left", "right", "decorators"],
  ArrayPattern: ["elements", "typeAnnotation"],
  ArrowFunctionExpression: ["params", "body", "returnType", "typeParameters"],
  ClassBody: ["body"],
  ClassExpression: ["id", "body", "superClass", "mixins", "typeParameters", "superTypeParameters", "implements", "decorators"],
  ClassDeclaration: ["id", "body", "superClass", "mixins", "typeParameters", "superTypeParameters", "implements", "decorators"],
  ExportAllDeclaration: ["source"],
  ExportDefaultDeclaration: ["declaration"],
  ExportNamedDeclaration: ["declaration", "specifiers", "source"],
  ExportSpecifier: ["local", "exported"],
  ForOfStatement: ["left", "right", "body"],
  ImportDeclaration: ["specifiers", "source"],
  ImportDefaultSpecifier: ["local"],
  ImportNamespaceSpecifier: ["local"],
  ImportSpecifier: ["local", "imported"],
  MetaProperty: ["meta", "property"],
  ClassMethod: ["key", "params", "body", "decorators", "returnType", "typeParameters"],
  ObjectPattern: ["properties", "typeAnnotation", "decorators"],
  SpreadElement: ["argument"],
  Super: [],
  TaggedTemplateExpression: ["tag", "quasi", "typeParameters"],
  TemplateElement: [],
  TemplateLiteral: ["quasis", "expressions"],
  YieldExpression: ["argument"],
  AwaitExpression: ["argument"],
  Import: [],
  BigIntLiteral: [],
  ExportNamespaceSpecifier: ["exported"],
  OptionalMemberExpression: ["object", "property"],
  OptionalCallExpression: ["callee", "arguments", "typeParameters", "typeArguments"],
  ClassProperty: ["key", "value", "typeAnnotation", "decorators"],
  ClassAccessorProperty: ["key", "value", "typeAnnotation", "decorators"],
  ClassPrivateProperty: ["key", "value", "decorators", "typeAnnotation"],
  ClassPrivateMethod: ["key", "params", "body", "decorators", "returnType", "typeParameters"],
  PrivateName: ["id"],
  StaticBlock: ["body"],
  AnyTypeAnnotation: [],
  ArrayTypeAnnotation: ["elementType"],
  BooleanTypeAnnotation: [],
  BooleanLiteralTypeAnnotation: [],
  NullLiteralTypeAnnotation: [],
  ClassImplements: ["id", "typeParameters"],
  DeclareClass: ["id", "typeParameters", "extends", "mixins", "implements", "body"],
  DeclareFunction: ["id"],
  DeclareInterface: ["id", "typeParameters", "extends", "mixins", "implements", "body"],
  DeclareModule: ["id", "body"],
  DeclareModuleExports: ["typeAnnotation"],
  DeclareTypeAlias: ["id", "typeParameters", "right"],
  DeclareOpaqueType: ["id", "typeParameters", "supertype"],
  DeclareVariable: ["id"],
  DeclareExportDeclaration: ["declaration", "specifiers", "source"],
  DeclareExportAllDeclaration: ["source"],
  DeclaredPredicate: ["value"],
  ExistsTypeAnnotation: [],
  FunctionTypeAnnotation: ["typeParameters", "params", "rest", "returnType"],
  FunctionTypeParam: ["name", "typeAnnotation"],
  GenericTypeAnnotation: ["id", "typeParameters"],
  InferredPredicate: [],
  InterfaceExtends: ["id", "typeParameters"],
  InterfaceDeclaration: ["id", "typeParameters", "extends", "mixins", "implements", "body"],
  InterfaceTypeAnnotation: ["extends", "body"],
  IntersectionTypeAnnotation: ["types"],
  MixedTypeAnnotation: [],
  EmptyTypeAnnotation: [],
  NullableTypeAnnotation: ["typeAnnotation"],
  NumberLiteralTypeAnnotation: [],
  NumberTypeAnnotation: [],
  ObjectTypeAnnotation: ["properties", "indexers", "callProperties", "internalSlots"],
  ObjectTypeInternalSlot: ["id", "value", "optional", "static", "method"],
  ObjectTypeCallProperty: ["value"],
  ObjectTypeIndexer: ["id", "key", "value", "variance"],
  ObjectTypeProperty: ["key", "value", "variance"],
  ObjectTypeSpreadProperty: ["argument"],
  OpaqueType: ["id", "typeParameters", "supertype", "impltype"],
  QualifiedTypeIdentifier: ["id", "qualification"],
  StringLiteralTypeAnnotation: [],
  StringTypeAnnotation: [],
  SymbolTypeAnnotation: [],
  ThisTypeAnnotation: [],
  TupleTypeAnnotation: ["types"],
  TypeofTypeAnnotation: ["argument"],
  TypeAlias: ["id", "typeParameters", "right"],
  TypeAnnotation: ["typeAnnotation"],
  TypeCastExpression: ["expression", "typeAnnotation"],
  TypeParameter: ["bound", "default", "variance"],
  TypeParameterDeclaration: ["params"],
  TypeParameterInstantiation: ["params"],
  UnionTypeAnnotation: ["types"],
  Variance: [],
  VoidTypeAnnotation: [],
  EnumDeclaration: ["id", "body"],
  EnumBooleanBody: ["members"],
  EnumNumberBody: ["members"],
  EnumStringBody: ["members"],
  EnumSymbolBody: ["members"],
  EnumBooleanMember: ["id"],
  EnumNumberMember: ["id", "init"],
  EnumStringMember: ["id", "init"],
  EnumDefaultedMember: ["id"],
  IndexedAccessType: ["objectType", "indexType"],
  OptionalIndexedAccessType: ["objectType", "indexType"],
  JSXAttribute: ["name", "value"],
  JSXClosingElement: ["name"],
  JSXElement: ["openingElement", "children", "closingElement"],
  JSXEmptyExpression: [],
  JSXExpressionContainer: ["expression"],
  JSXSpreadChild: ["expression"],
  JSXIdentifier: [],
  JSXMemberExpression: ["object", "property"],
  JSXNamespacedName: ["namespace", "name"],
  JSXOpeningElement: ["name", "attributes"],
  JSXSpreadAttribute: ["argument"],
  JSXText: [],
  JSXFragment: ["openingFragment", "children", "closingFragment"],
  JSXOpeningFragment: [],
  JSXClosingFragment: [],
  Noop: [],
  Placeholder: [],
  V8IntrinsicIdentifier: [],
  ArgumentPlaceholder: [],
  BindExpression: ["object", "callee"],
  ImportAttribute: ["key", "value"],
  Decorator: ["expression"],
  DoExpression: ["body"],
  ExportDefaultSpecifier: ["exported"],
  RecordExpression: ["properties"],
  TupleExpression: ["elements"],
  DecimalLiteral: [],
  ModuleExpression: ["body"],
  TopicReference: [],
  PipelineTopicExpression: ["expression"],
  PipelineBareFunction: ["callee"],
  PipelinePrimaryTopicReference: [],
  TSParameterProperty: ["parameter"],
  TSDeclareFunction: ["id", "typeParameters", "params", "returnType"],
  TSDeclareMethod: ["decorators", "key", "typeParameters", "params", "returnType"],
  TSQualifiedName: ["left", "right"],
  TSCallSignatureDeclaration: ["typeParameters", "parameters", "typeAnnotation"],
  TSConstructSignatureDeclaration: ["typeParameters", "parameters", "typeAnnotation"],
  TSPropertySignature: ["key", "typeAnnotation", "initializer"],
  TSMethodSignature: ["key", "typeParameters", "parameters", "typeAnnotation"],
  TSIndexSignature: ["parameters", "typeAnnotation"],
  TSAnyKeyword: [],
  TSBooleanKeyword: [],
  TSBigIntKeyword: [],
  TSIntrinsicKeyword: [],
  TSNeverKeyword: [],
  TSNullKeyword: [],
  TSNumberKeyword: [],
  TSObjectKeyword: [],
  TSStringKeyword: [],
  TSSymbolKeyword: [],
  TSUndefinedKeyword: [],
  TSUnknownKeyword: [],
  TSVoidKeyword: [],
  TSThisType: [],
  TSFunctionType: ["typeParameters", "parameters", "typeAnnotation"],
  TSConstructorType: ["typeParameters", "parameters", "typeAnnotation"],
  TSTypeReference: ["typeName", "typeParameters"],
  TSTypePredicate: ["parameterName", "typeAnnotation"],
  TSTypeQuery: ["exprName", "typeParameters"],
  TSTypeLiteral: ["members"],
  TSArrayType: ["elementType"],
  TSTupleType: ["elementTypes"],
  TSOptionalType: ["typeAnnotation"],
  TSRestType: ["typeAnnotation"],
  TSNamedTupleMember: ["label", "elementType"],
  TSUnionType: ["types"],
  TSIntersectionType: ["types"],
  TSConditionalType: ["checkType", "extendsType", "trueType", "falseType"],
  TSInferType: ["typeParameter"],
  TSParenthesizedType: ["typeAnnotation"],
  TSTypeOperator: ["typeAnnotation"],
  TSIndexedAccessType: ["objectType", "indexType"],
  TSMappedType: ["typeParameter", "typeAnnotation", "nameType"],
  TSLiteralType: ["literal"],
  TSExpressionWithTypeArguments: ["expression", "typeParameters"],
  TSInterfaceDeclaration: ["id", "typeParameters", "extends", "body"],
  TSInterfaceBody: ["body"],
  TSTypeAliasDeclaration: ["id", "typeParameters", "typeAnnotation"],
  TSInstantiationExpression: ["expression", "typeParameters"],
  TSAsExpression: ["expression", "typeAnnotation"],
  TSSatisfiesExpression: ["expression", "typeAnnotation"],
  TSTypeAssertion: ["typeAnnotation", "expression"],
  TSEnumDeclaration: ["id", "members"],
  TSEnumMember: ["id", "initializer"],
  TSModuleDeclaration: ["id", "body"],
  TSModuleBlock: ["body"],
  TSImportType: ["argument", "qualifier", "typeParameters"],
  TSImportEqualsDeclaration: ["id", "moduleReference"],
  TSExternalModuleReference: ["expression"],
  TSNonNullExpression: ["expression"],
  TSExportAssignment: ["expression"],
  TSNamespaceExportDeclaration: ["id"],
  TSTypeAnnotation: ["typeAnnotation"],
  TSTypeParameterInstantiation: ["params"],
  TSTypeParameterDeclaration: ["params"],
  TSTypeParameter: ["constraint", "default"]
}
```

- 将高版本 ast 转化成目标版本的 ast

* 生成

- 目标版本 ast 生成 source-ma和 目标代码


node 节点

path 路径

key 组成

context 实时变化 ， TraversalContext

