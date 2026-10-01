export function isSimpleTernaryBranch(node, shouldAllowCall = true) {
  if (node.type === 'JSXElement') {
    return true;
  }

  if (node.type === 'Identifier' || (node.type === 'Literal' && !node.regex)) {
    return true;
  }

  if (node.type === 'TemplateLiteral') {
    return node.expressions.length === 0;
  }

  if (
    ['ChainExpression', 'TSAsExpression', 'TSNonNullExpression', 'TSSatisfiesExpression'].includes(
      node.type,
    )
  ) {
    return isSimpleTernaryBranch(node.expression, shouldAllowCall);
  }

  if (node.type === 'MemberExpression') {
    return (
      isSimpleTernaryBranch(node.object, false) &&
      (!node.computed || isSimpleTernaryBranch(node.property, false))
    );
  }

  if (node.type === 'UnaryExpression') {
    return (
      ['!', '+', '-', 'typeof'].includes(node.operator) &&
      isSimpleTernaryBranch(node.argument, false)
    );
  }

  if (node.type === 'CallExpression' && shouldAllowCall) {
    return (
      isSimpleTernaryBranch(node.callee, false) &&
      node.arguments.every((argument) => isSimpleTernaryBranch(argument, false))
    );
  }

  return false;
}
