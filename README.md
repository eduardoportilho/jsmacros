# JS Macros

Run Javascript macros to transform the content of documents in VS Code.

## Installing (lazy dev version)

```sh
cd ~/.vscode/extensions
git clone git@github.com:eduardoportilho/jsmacros.git
```

## Creating a macro

Macros can be created by adding javascript files to the folder `macros` inside of the extension folder. Depending on your platform it is located:

* Windows `%USERPROFILE%\.vscode\extensions\jsmacro`
* Mac `$HOME/.vscode/extensions/jsmacro`
* Linux `$HOME/.vscode/extensions/jsmacro`

Your JS macro should contain the body of a function that recieves the current document content through the `documentContent` parameter and should return the modifyed content, like in the following example:

```js
// Macro short description
return documentContent.replace(/\s/g, '')
```

The file name will be used as the macro name and a comment on the first line will be used as the description.

## Running

* `Command+shift+P`
* Type "jsmacro", hit enter
* Chosse a macro, hit enter
* Boom, done

## License
MIT