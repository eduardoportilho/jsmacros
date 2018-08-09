// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const Range = vscode.Range;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('>>', context.extensionPath);
    console.log('>>', context.storagePath);

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.jsmacro', function () {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }

        executeReplacements(editor);
        // let selection = editor.selection;
        // let text = editor.document.getText(selection);

        // Display a message box to the user
        vscode.window.showInformationMessage('Replacement done!');
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;


function executeReplacements(editor) {
    editor.edit(function (edit) {
        const doc = editor.document;
        const docContent = doc.getText();
        const newDocContent = docContent
            .replace(/^.*SDO CTA\/APL AUTOMATICAS.*\n/gm, '')
            .replace(/\./g, '')
            .replace(/,/g, '.')
            .replace(/(\d\d\/\d\d)/g, '$1/2018,')
            .replace(/(\d+\.\d\d)/g, ',,,,$1')
            .replace(/(\d+\.\d\d)\s-/g, '-$1')
            .replace(/2018,\s+D\s+/g, '2018,')
            .replace(/\s+$/gm, '')
            .replace(/\s{2,}/g, '')

        const start = doc.positionAt(0)
        const end = doc.positionAt(docContent.length)
        const range = new Range(start, end)

        edit.replace(range, newDocContent);
	});
}
