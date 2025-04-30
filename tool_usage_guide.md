# Tool Usage Guide

This document explains the intended purpose and typical usage context for each available tool, similar to the guiding prompts used internally.

---

### `attempt_completion`

- **Purpose:** To signal that the assigned task is believed to be fully completed and verified.
- **Usage Context:** Called only _after_ all required actions (coding, testing, file changes) are done and confirmed to meet the request. Requires a factual summary of the work and verification.

---

### `ask_followup_question`

- **Purpose:** To interact with the user for clarification, confirmation, or reporting issues.
- **Usage Context:** Used when requirements are ambiguous, a proposed plan needs approval, an unexpected problem blocks progress, or specific user input is necessary. Avoids making assumptions.

---

### `read_file`

- **Purpose:** To retrieve the full content of a specific file.
- **Usage Context:** Used before editing a file to get its current state, to understand existing code, or to extract information needed for the task.

---

### `write_file`

- **Purpose:** To create a new file or completely overwrite an existing file with the provided content.
- **Usage Context:** Used for creating new source files, configuration files, documentation, or applying large-scale changes where overwriting is simpler than targeted edits. Requires the _entire_ desired file content.

---

### `list_files`

- **Purpose:** To explore the file and directory structure.
- **Usage Context:** Used to understand the project layout, find where files are located, or check the contents of a directory, potentially recursively.

---

### `search_files`

- **Purpose:** To find specific text patterns (using regex) within files in a directory.
- **Usage Context:** Used to locate code snippets, variable usages, configuration settings, comments, or any specific string across multiple files.

---

### `shell_exec`

- **Purpose:** To execute a command-line instruction within a persistent shell session.
- **Usage Context:** Used for running build processes (`npm run build`), tests (`pnpm test`), linters, or any sequence of commands where session state (like environment variables or current directory _within the session_) is important. Requires an absolute path for execution directory.

---

### `shell_wait`

- **Purpose:** To pause execution and wait for activity in a shell session.
- **Usage Context:** Used after starting a long-running command with `shell_exec` (like `npm install` or a server start) to ensure it completes before proceeding, or to wait for a fixed duration.

---

### `shell_kill_process`

- **Purpose:** To stop the currently running foreground process in a specific shell session.
- **Usage Context:** Used to terminate commands like development servers (`npm run dev`) or other long-running processes started with `shell_exec`.

---

### `shell_view`

- **Purpose:** To retrieve and display the recent output (stdout/stderr) from a shell session.
- **Usage Context:** Used to check the results or status of commands previously executed in a session with `shell_exec`.

---

### `shell_write_to_process`

- **Purpose:** To send text input to a running process in a shell session.
- **Usage Context:** Used for interacting with interactive prompts from commands (e.g., answering "yes/no", providing passwords, making selections).

---

### `run_browser`

- **Purpose:** To perform complex, multi-step interactions within a web browser.
- **Usage Context:** Used for tasks requiring logins, form submissions, navigation, and data extraction from dynamic web pages where simple loading (`url_screenshot`) is insufficient.

---

### `url_screenshot`

- **Purpose:** To capture the initial visual state and console logs of a web page upon loading.
- **Usage Context:** Used for quick visual verification of UI rendering, checking for layout issues, or capturing errors that occur immediately on page load. Does not interact with the page.

---

### `deploy_preview`

- **Purpose:** To build and deploy the current codebase to a preview environment.
- **Usage Context:** Called after all changes for a feature or fix are implemented and approved, providing a shareable URL for review. Requires a user-friendly summary of changes.
