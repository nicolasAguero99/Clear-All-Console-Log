# Clear All Console Log

![clear-all-console-log](https://github.com/user-attachments/assets/6baaaf9c-c1fc-42de-8014-5897a6a66d5a)

*Clear All Console Log* is a Visual Studio Code extension designed to clean up your code by removing all logging statements or output functions from supported languages in your project or current file. The extension offers flexible options, allowing you to preserve error-related logs like `console.error` while clearing others.

## Features

- **Multi-language support:** Handles common logging functions across multiple programming languages, including JavaScript, Python, Java, C, C++, and C#.
- **Selective clearing:**
  - Remove all output statements (`console.log`, `print`, `System.out.println`, etc.).
  - Preserve error-related logs (`console.error`, or similar in other languages).
- **Scoping options:**
  - Apply changes to the entire project.
  - Apply changes to the currently open file.

### Supported Languages and Functions

| Language    | Logging Functions                 | Extensions          |
|-------------|-----------------------------------|---------------------|
| JavaScript  | `console.log`, `console.warn`     | `.js`, `.ts`, `.jsx`, `.tsx` |
| Python      | `print()`                         | `.py`               |
| Java        | `System.out.println()`            | `.java`             |
| C           | `printf()`                        | `.c`, `.h`          |
| C++         | `std::cout << ...`                | `.cpp`, `.hpp`      |
| C#          | `Console.WriteLine()`             | `.cs`               |

## Available Commands

### General Commands
- **Clear all outputs in the entire project:** Removes all logging/output statements across the project.
- **Clear all outputs in the current file:** Removes all logging/output statements from the currently open file.

### Conditional Commands
- **Clear outputs except errors (project):** Removes all outputs across the project except error-related logs (`console.error`, etc.).
- **Clear outputs except errors (file):** Removes all outputs from the current file except error-related logs.

## Installation

1. Open VS Code.
2. Go to the Extensions view (`Ctrl+Shift+X`).
3. Search for *Clear All Console Log*.
4. Click **Install**.

## Usage

1. Open the Command Palette (`Ctrl+Shift+P`).
2. Type and select one of the following commands:
   - `Clear all outputs in the current file`
   - `Clear all outputs in the entire project`
   - `Clear outputs except errors (file)`
   - `Clear outputs except errors (project)`
3. For multi-language projects, a selection menu will appear, allowing you to choose the language you want to process.

### Example Scenarios

- **JavaScript Project:** Clean up all `console.log` and `console.warn` statements before deployment, preserving `console.error` for debugging.
- **Python Script:** Remove all `print()` calls, ensuring clean output in production.
- **Multi-language Project:** Choose specific languages to process and apply the extension's functionality selectively.

## Configuration

The extension uses pre-configured regex patterns for each language to identify and handle logging/output statements. You can customize these patterns by editing the `LANG` configuration in the source code if needed.

## Contributions

Contributions are welcome! If you'd like to report a bug, suggest a feature, or submit a pull request, visit the [GitHub repository](https://github.com/nicolasAguero99/clear-all-console-log.git).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.