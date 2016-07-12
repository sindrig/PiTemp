module.exports = {
  extends: [
    'eslint-config-airbnb'
  ].map(require.resolve),
  rules: {
    // BEST PRACTICES //
    // require default case in switch statements
    'default-case': 1,
    // encourages use of dot notation whenever possible
    'dot-notation': [1, { 'allowKeywords': true}],
    // make sure for-in loops have an if statement
    'guard-for-in': 1,
    // disallow use of labels for anything other then loops and switches
    'no-empty-label': 0,
    // disallow unnecessary function binding
    'no-extra-bind': 1,
    // disallow use of labeled statements
    'no-labels': 2,
    // disallow reassignment of function parameters
    'no-param-reassign': 1,
    // requires to declare all vars on top of their containing scope
    'vars-on-top': 0, // TODO set to 2 !!
    // require immediate function invocation to be wrapped in parentheses
    'wrap-iife': [2, 'any'],

    // ERRORS //
    // disallow trailing commas in object literals
    'comma-dangle': 0,
    // disallow use of debugger
    'no-debugger': 1,
    // disallow the use of empty character classes in regular expressions
    'no-empty-character-class': 2,
    // disallow unnecessary parentheses
    'no-extra-parens': [2, 'functions'],
    // Avoid code that looks like two expressions but is actually one
    'no-unexpected-multiline': 0,

    // ES6 //
    // require parens in arrow function arguments
    'arrow-parens': 1,
    // require space before/after arrow function's arrow
    'arrow-spacing': 1,
    // verify super() callings in constructors
    'constructor-super': 1,
    // disallow modifying variables of class declarations
    'no-class-assign': 1,
    // require let or const instead of var
    'no-var': 1,
    // require method and property shorthand syntax for object literals
    'object-shorthand': 1,
    // suggest using of const declaration for variables that are never modified after declared
    'prefer-const': 2,
    'arrow-body-style': 0,

    // STYLE
    // enforce spacing inside array brackets
    'array-bracket-spacing': 0,
    // require or disallow padding inside computed properties
    'computed-property-spacing': 0,
    // enforce newline at the end of file, with no multiple empty lines
    'eol-last': 1,
    // require function expressions to have a name
    'func-names': 0,
    // this option sets a specific tab width for your code
    'indent': [1, 4],
    // specify whether double or single quotes should be used in JSX attributes
    'jsx-quotes': 1,
    // enforces spacing between keys and values in object literal properties
    'key-spacing': [1, {'beforeColon': false, 'afterColon': true}],
    // require a capital letter for constructors
    'new-cap': [2, {'newIsCap': true}],
    // disallow use of the Array constructor
    'no-array-constructor': 0,
    // disallow multiple empty lines
    'no-multiple-empty-lines': [2, {'max': 2}],
    // disallow trailing whitespace at the end of lines
    'no-trailing-spaces': 1,
    // disallow the use of Boolean literals in conditional expressions
    'no-unneeded-ternary': 0,
    // require or disallow padding inside curly braces
    'object-curly-spacing': 0,
    // allow just one var statement per function
    'one-var': [1, 'never'],
    // enforce padding within blocks
    'padded-blocks': 0,
    // require quotes around object literal property names
    'quote-props': 0,
    // specify whether double or single quotes should be used
    'quotes': [1, 'single', 'avoid-escape'],
    // require identifiers to match the provided regular expression
    'id-match': 0,
    // require or disallow space before blocks
    'space-before-blocks': 1,
    'max-len': [2, 120, 4, {"ignoreComments": true}],

    // REACT //
    // Prevent missing displayName in a React component definition
    'react/display-name': 0,
    // Enforce boolean attributes notation in JSX
    'react/jsx-boolean-value': 2,
    // Enforce or disallow spaces inside of curly braces in JSX attributes
    'react/jsx-curly-spacing': [1, 'never'],
    // Prevent usage of dangerous JSX properties
    'react/no-danger': 2,
    // Prevent usage of setState in componentDidUpdate
    'react/no-did-update-set-state': 2,
    // Restrict file extensions that may be required
    'react/require-extension': 0,
    'react/jsx-indent': [2, 4],
    'react/jsx-indent-props': [2, 4],
  }
};