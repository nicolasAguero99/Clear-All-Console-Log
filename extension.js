const { initializeRegisterCommands } = require('./commands.js');

const vscode = require('vscode');
const { LANG } = require('./constants/constants.js');

async function activate(context) {
  initializeRegisterCommands(context)

  const clearAllOutputsCommandFile = vscode.commands.registerCommand('clear-outputs-file', function () {
    vscode.window.showQuickPick(
      Object.keys(LANG).map(lang => {
        return {
          label: LANG[lang].label,
          command: `clear-outputs-file-${LANG[lang].subfix_command}`,
          description: `(${LANG[lang].extensions.join(', ')})`
        }
      }),
      { placeHolder: 'Select a language to clear outputs' }
    ).then(selection => {
      if (selection) {
        vscode.commands.executeCommand(selection.command);
      }
    });
  });

  const clearAllOutputsCommandProject = vscode.commands.registerCommand('clear-outputs-project', function () {
    vscode.window.showQuickPick(
      Object.keys(LANG).map(lang => {
        return {
          label: LANG[lang].label,
          command: `clear-outputs-project-${LANG[lang].subfix_command}`,
          description: `(${LANG[lang].extensions.join(', ')})`
        }
      }),
      { placeHolder: 'Select a language to clear outputs in the entire project' }
    ).then(selection => {
      if (selection) {
        vscode.commands.executeCommand(selection.command);
      }
    });
  });

  context.subscriptions.push(clearAllOutputsCommandFile);
  context.subscriptions.push(clearAllOutputsCommandProject);
}

function deactivate() { }

module.exports = {
  activate,
  deactivate
}
