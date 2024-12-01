const { clearConsoleFile, clearConsoleProject, clearConsoleProjectExceptError, clearConsoleFileExceptError } = require('./commands-functions');

/**
 * @param {vscode.ExtensionContext} context
 */

async function activate(context) {
  context.subscriptions.push(clearConsoleProject);
  context.subscriptions.push(clearConsoleFile);
  context.subscriptions.push(clearConsoleProjectExceptError);
  context.subscriptions.push(clearConsoleFileExceptError);
}

function deactivate() { }

module.exports = {
  activate,
  deactivate
}
