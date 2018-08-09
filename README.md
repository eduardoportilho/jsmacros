# JS Macros

Run Javascript macros to transform the content of documents in VS Code.

## Creating a macro

Macros can be created by adding javascript files to the folder `macros` inside of the extension folder. Depending on your platform it is located:

* Windows `%USERPROFILE%\.vscode\extensions\jsmacro`
* Mac `$HOME/.vscode/extensions/jsmacro`
* Linux `$HOME/.vscode/extensions/jsmacro`

Your JS macro should contain the body of a function that recieves the current document content through the `documentContent` parameter and should return the modifyed content, like in the following example:

```js
return documentContent.replace(/\s/g, '')
```

## License
MIT