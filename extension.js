const vscode = require('vscode');
const Range = vscode.Range;
const path = require('path');
const fs = require('fs');

function activate(context) {
    const macroPath = path.join(context.extensionPath, 'macros')
    let disposable = vscode.commands.registerCommand('extension.jsmacros', chooseMacroFunction(macroPath));
    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;

function loadMacros(macroPath) {
    const macroFiles = fs.readdirSync(macroPath)
    const macros = {}
    macroFiles.forEach(macroFile => {
        const fullMacroFilePath = path.join(macroPath, macroFile)
        const extension = path.extname(macroFile)
        const isFile = fs.statSync(fullMacroFilePath).isFile()
        if (isFile && extension === '.js') {
            const name = macroFile.replace(/\.js/, '')
            const code = fs.readFileSync(fullMacroFilePath, 'utf8');
            const description = getMacroDescriptionFromCode(code)
            macros[name] = {
                name,
                description,
                fn: new Function('documentContent', code)
            }
        }
    })
    return macros
}

function getMacroDescriptionFromCode(code) {
    const codeLines = code && code.split('\n') || []
    if (codeLines.length <= 0 )
        return undefined
    const firstLine = codeLines[0].trim()

    if (firstLine.indexOf('//') !== 0 && firstLine.indexOf('/*') !== 0)
        return undefined
    return firstLine.replace(/\/\/|\/\*|\*\//g, '').trim()
}

const chooseMacroFunction = (macroPath) => () => {
	if (!vscode.window.activeTextEditor) {
		vscode.window.showInformationMessage('Open a file first to run your macros');
		return;
    }
    
    const macros = loadMacros(macroPath)
    if (Object.keys(macros).length === 0) {
        vscode.window.showInformationMessage(`You need to add your macros to: ${macroPath}`);
        return;
    }
	
	var opts = { 
        matchOnDescription: true,
        placeHolder: "Choose a macro to run:"
    };
    var items = Object.values(macros).map(macro => ({
        label: macro.name,
        description: macro.description
    }));

	vscode.window.showQuickPick(items, opts).then((selection) => {
		if (!selection) {
			return;
        }
        const macro = macros[selection.label]
        let editor = vscode.window.activeTextEditor;
        executeMacro(editor, macro)
    });
}

function executeMacro(editor, macro) {
    if (!editor) {
        return; // No open text editor
    }
    editor.edit(function (edit) {
        const doc = editor.document;
        const documentContent = doc.getText();
        const newDocContent = macro.fn(documentContent)
        const start = doc.positionAt(0)
        const end = doc.positionAt(documentContent.length)
        const range = new Range(start, end)

        edit.replace(range, newDocContent);
        vscode.window.showInformationMessage('Replacement done!');
	});
}
