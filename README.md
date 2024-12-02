# Clear All Console Log

https://github.com/user-attachments/assets/3c69f5a5-893c-4144-8aa5-461e3958b316

*Clear All Console Log* is a Visual Studio Code extension that removes all console.log statements from your files or project. It also includes options to keep console.error statements, allowing you to clean up your code while preserving useful error messages.

## Features

- **Remove all console.log statements** from your entire project or the current file.
- **Keep console.error** if desired, with an option to remove other console types (such as console.warn, console.info, etc.).
- Ideal for cleaning up your code before production without losing valuable error messages.

## Available Commands

- **Clear console in the entire project**: Removes all console.log statements from the entire project.
- **Clear console in the current file**: Removes all console.log statements from the current file only.
- **Clear console in the entire project except error**: Removes all console.log statements from the project, but keeps console.error.
- **Clear console in the current file except error**: Removes all console.log statements from the current file, but keeps console.error.

## Installation

1. Open VS Code.
2. Go to the Extensions view (Ctrl+Shift+X).
3. Search for *Clear All Console Log*.
4. Click *Install*.

## Activation

The extension is activated via the following commands:

- onCommand:clear-console-project
- onCommand:clear-console-file
- onCommand:clear-console-project-except-error
- onCommand:clear-console-file-except-error

## Usage

To use the extension, you can run any of the commands from the Command Palette (Ctrl+Shift+P) or assign custom shortcuts. The available commands allow you to clear all console.log statements in your project or the current file, with options to preserve errors.

## Contributions

If you would like to contribute to this project, please open an issue or submit a pull request on the [GitHub repository](https://github.com/nicolasAguero99/clear-all-console-log.git).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
