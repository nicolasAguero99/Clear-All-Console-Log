const vscode = require('vscode');
const { LANG } = require('./constants/constants.js');
const fs = require('fs/promises');

function initializeRegisterCommands(context) {
  for (const lang in LANG) {
    const REGEX = LANG[lang].regex.allOutputs;
    const EXTENSIONS = LANG[lang].extensions;

    const clearInFile = vscode.commands.registerCommand(`clear-outputs-file-${lang}`, async function () {
      const editor = vscode.window.activeTextEditor;

      if (!editor) {
        vscode.window.showErrorMessage('No active editor.');
        return;
      }

      const document = editor.document;
      const currentExtension = document.fileName.split('.').pop();
      if (!EXTENSIONS.includes(currentExtension)) {
        vscode.window.showErrorMessage(`The current extension is not ${EXTENSIONS.join(', ')}.`);
        return;
      }
      const text = document.getText();
      const lines = text.split('\n');

      const updatedLines = lines.map(line => {
        if (REGEX.test(line)) {
          if (line.trim().match(REGEX)?.[0] === line.trim()) {
            return null;
          }
          return line.replace(REGEX, '').trim();
        }
        return line;
      }).filter(line => line !== null);

      const updatedText = updatedLines.join('\n');

      const fullRange = new vscode.Range(
        document.positionAt(0),
        document.positionAt(text.length)
      );

      editor.edit(editBuilder => {
        editBuilder.replace(fullRange, updatedText);
      }).then(success => {
        if (success) {
          vscode.window.showInformationMessage('All "output" were removed in the current file.');
        } else {
          vscode.window.showErrorMessage('Changes could not be applied.');
        }
      });
    })

    const clearInProject = vscode.commands.registerCommand(`clear-outputs-project-${lang}`, async function () {
      try {
        const files = await vscode.workspace.findFiles(`**/*.{${EXTENSIONS.join(',')}}`, '**/node_modules/**');

        if (files.length === 0) {
          vscode.window.showInformationMessage(`No files ${EXTENSIONS.join(', ')} found.`);
          return;
        }

        for (const file of files) {
          try {
            const document = await vscode.workspace.openTextDocument(file);
            const lines = document.getText().split('\n');
            const updatedLines = lines.map(line => {
              if (REGEX.test(line)) {
                if (line.trim().match(REGEX)?.[0] === line.trim()) {
                  return null;
                }
                return line.replace(REGEX, '').trim();
              }

              return line;
            }).filter(line => line !== null);

            const updatedContent = updatedLines.join('\n');

            if (updatedContent !== document.getText()) {
              await fs.writeFile(file.fsPath, updatedContent, 'utf-8');
            }
          } catch (error) {
            vscode.window.showErrorMessage('Error to find files: ' + error.message);
          }
        }

        vscode.window.showInformationMessage(`${files.length} files processed.`);
      } catch (error) {
        vscode.window.showErrorMessage('Error to find files: ' + error.message);
      }
    });
    context.subscriptions.push(clearInFile);
    context.subscriptions.push(clearInProject);
  }


  const clearInProjectExceptError = vscode.commands.registerCommand('clear-console-project-except-error', async function () {
    try {
      const files = await vscode.workspace.findFiles('**/*.{js,ts,jsx,tsx}', '**/node_modules/**');

      if (files.length === 0) {
        vscode.window.showInformationMessage('No files (.js, .ts, .jsx, .tsx) found.');
        return;
      }

      for (const file of files) {
        try {
          const document = await vscode.workspace.openTextDocument(file);
          const lines = document.getText().split('\n');
          const updatedLines = lines.map(line => {
            const regex = LANG['javascript'].regex.exceotError

            if (regex.test(line)) {
              if (line.trim().match(regex)?.[0] === line.trim()) {
                return null;
              }
              return line.replace(regex, '').trim();
            }

            return line;
          }).filter(line => line !== null);

          const updatedContent = updatedLines.join('\n');

          if (updatedContent !== document.getText()) {
            await fs.writeFile(file.fsPath, updatedContent, 'utf-8');
          }
        } catch (error) {
          vscode.window.showErrorMessage('Error to find files: ' + error.message);
        }
      }

      vscode.window.showInformationMessage(`${files.length} files processed.`);
    } catch (error) {
      vscode.window.showErrorMessage('Error to find files: ' + error.message);
    }
  });

  const clearInFileExceptError = vscode.commands.registerCommand('clear-console-file-except-error', async function () {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
      vscode.window.showErrorMessage('No active editor.');
      return;
    }

    const document = editor.document;
    const currentExtension = document.fileName.split('.').pop();
    if (!LANG['javascript'].extensions.includes(currentExtension)) {
      vscode.window.showErrorMessage(`The current extension is not ${LANG['javascript'].extensions.join(', ')}.`);
      return
    }
    const regex = LANG['javascript'].regex.exceotError
    const text = document.getText();
    const lines = text.split('\n');

    const updatedLines = lines.map(line => {
      if (regex.test(line)) {
        if (line.trim().match(regex)?.[0] === line.trim()) {
          return null;
        }
        return line.replace(regex, '').trim();
      }
      return line;
    }).filter(line => line !== null);

    const updatedText = updatedLines.join('\n');

    const fullRange = new vscode.Range(
      document.positionAt(0),
      document.positionAt(text.length)
    );

    editor.edit(editBuilder => {
      editBuilder.replace(fullRange, updatedText);
    }).then(success => {
      if (success) {
        vscode.window.showInformationMessage('All "console" were removed (except "console.error").');
      } else {
        vscode.window.showErrorMessage('Changes could not be applied.');
      }
    });
  });

  context.subscriptions.push(clearInProjectExceptError);
  context.subscriptions.push(clearInFileExceptError);
}

module.exports = {
  initializeRegisterCommands
}