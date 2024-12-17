const vscode = require('vscode');
const assert = require('assert');

const fs = require('fs');
const path = require('path');

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	// verificar que el comando clear-outputs-file se ejecute correctamente en visual studio code
	test('clear-outputs-file command', async () => {
		const command = 'clear-outputs-file';
		const executedCommands = [];

		// Mockear la función executeCommand
		const originalExecuteCommand = vscode.commands.executeCommand;
		vscode.commands.executeCommand = (cmd) => {
			executedCommands.push(cmd);
			return Promise.resolve();
		};

		// Ejecutar el comando
		await vscode.commands.executeCommand(command);

		// Restaurar la función executeCommand
		vscode.commands.executeCommand = originalExecuteCommand;

		// Verificar si se ejecutó el comando correcto
		assert.ok(executedCommands.includes('clear-outputs-file'));
	});

	// Verificar que el comando clear-outputs-project se ejecute correctamente en javascript
	test('clear-outputs-file removes console.log', async () => {
		// Ruta del archivo de prueba y su contenido
		const testFilePath = path.join(__dirname, 'testFile.js');
		const testContent = 'console.log("test");';

		// Create a test file with console.log
		fs.writeFileSync(testFilePath, testContent);

		// Open the test file in the editor
		const document = await vscode.workspace.openTextDocument(testFilePath);
		await vscode.window.showTextDocument(document);

		// Execute the clear-outputs-file command
		await vscode.commands.executeCommand('clear-outputs-file');

		// Get the updated content of the file
		const updatedDocument = await vscode.workspace.openTextDocument(testFilePath);
		const updatedContent = updatedDocument.getText();

		// Verify that console.log has been removed
		assert.strictEqual(updatedContent.includes('console.log("test");'), false);

		// Limpiar: cerrar el editor y eliminar el archivo de prueba
		await vscode.commands.executeCommand('workbench.action.closeActiveEditor');
		fs.unlinkSync(testFilePath);
	});

	// Verificar que el comando clear-outputs-project se ejecute correctamente en cpp
	test('clear-outputs-file removes cout', async () => {
		// Ruta del archivo de prueba y su contenido
		const testFilePath = path.join(__dirname, 'testFile.cpp');
		const testContent = 'std::cout << "test";\ncout << "test";';

		// Crear un archivo de prueba con cout
		fs.writeFileSync(testFilePath, testContent);

		// Abrir el archivo de prueba en el editor
		const document = await vscode.workspace.openTextDocument(testFilePath);
		await vscode.window.showTextDocument(document);

		// Ejecutar el comando clear-outputs-file
		await vscode.commands.executeCommand('clear-outputs-file');

		// Obtener el contenido actualizado del archivo
		const updatedDocument = await vscode.workspace.openTextDocument(testFilePath);
		const updatedContent = updatedDocument.getText();

		// Verificar que cout ha sido eliminado
		assert.strictEqual(updatedContent.includes('std::cout << "test";'), false);
		assert.strictEqual(updatedContent.includes('cout << "test";'), false);

		// Limpiar: cerrar el editor y eliminar el archivo de prueba
		await vscode.commands.executeCommand('workbench.action.closeActiveEditor');
		fs.unlinkSync(testFilePath);
	});
});
