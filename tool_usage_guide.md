# Tool Usage Guide

This document explains the intended purpose, typical usage context, and key considerations for each available tool.

---

### `attempt_completion`

- **Purpose:** To formally signal that the assigned task, as understood and potentially clarified, is believed to be fully completed and verified according to the agreed-upon plan or requirements.
- **Usage Context:** This is the final step in a task execution flow. It should only be called _after_ all necessary actions (e.g., code changes, file creation/modification, testing, command execution) have been performed and their success confirmed (e.g., tests passing, commands succeeding, files existing with correct content).
- **Key Considerations:** The `result_summary` parameter is crucial. It must be a concise, factual statement summarizing what was done and how it was verified (e.g., "Implemented feature X by creating file Y.py and modifying Z.ts. All unit tests pass, and manual verification confirmed the UI element works as expected."). It should _not_ end with a question. The user may still provide feedback requiring further adjustments.

---

### `ask_followup_question`

- **Purpose:** To proactively interact with the user to resolve ambiguities, confirm understanding, propose plans, or report critical issues encountered during implementation.
- **Usage Context:** Essential for maintaining alignment and avoiding incorrect assumptions. Use it when:
  - Requirements are unclear or underspecified (e.g., "What specific error handling logic should be implemented?").
  - A multi-step plan is needed for a complex task, requiring user approval before proceeding.
  - An unexpected problem arises that requires a decision or change in approach (e.g., "The required library is incompatible; should I find an alternative or update the dependency?").
  - Explicit user confirmation is mandated by the workflow.
- **Key Considerations:** Frame questions clearly and state what information or decision is needed. Use the optional quick reply options (`option_one` to `option_four`) to simplify user responses when appropriate. Avoid excessive use; try to leverage other tools for information gathering first.

---

### `read_file`

- **Purpose:** To retrieve the complete, current content of a specified file within the workspace.
- **Usage Context:** Fundamental for gathering context before making changes or understanding existing code. Use it:
  - Before using `edit_file` to ensure the `old_string` context is accurate.
  - To understand the logic or structure of an existing script or configuration file.
  - To extract specific information needed for subsequent steps.
  - To verify the content of a file after a `write_file` or `edit_file` operation (though tool results often provide confirmation).
- **Key Considerations:** Supports text-based files and attempts text extraction from PDF, DOCX, and IPYNB. May produce garbled output for unsupported binary types. If unsure about a file's existence, consider `list_files` first. Path is relative to the CWD (`/Users/nahmanimatan/code/vite_react_shadcn_ts`).

---

### `write_file`

- **Purpose:** To write the provided `content` to a specified file path, completely overwriting the file if it exists or creating a new file if it doesn't.
- **Usage Context:** Suitable for:
  - Creating entirely new source code files, configuration files, documentation, test files, etc.
  - Replacing the entire content of an existing file after significant refactoring or generation performed internally.
  - Applying large changes where targeted edits with `edit_file` would be overly complex or prone to context matching errors.
- **Key Considerations:** The `content` parameter must contain the _complete and final_ desired content. This is a destructive operation for existing files. Use `edit_file` for smaller, targeted changes if possible. Supports writing multiple files in one turn using the `<tool_calls>` syntax. Automatically creates missing directories in the path. An optional `commit_message` can be provided.

---

### `list_files`

- **Purpose:** To explore the file and directory structure within a specified path.
- **Usage Context:** Useful for:
  - Understanding the project layout and organization.
  - Locating specific files or directories before reading or editing them.
  - Checking the contents of a directory, optionally recursively into subdirectories (`recursive: "true"`).
- **Key Considerations:** Avoid using solely to confirm file creation (tool results for write/edit usually suffice). Be mindful that recursive listing in very large directories might result in truncated output. Path is relative to the CWD.

---

### `search_files`

- **Purpose:** To perform a recursive search for a specific text pattern (using Rust-compatible Regular Expression syntax) within files in a given directory.
- **Usage Context:** Powerful for finding:
  - All usages of a specific function, variable, or class name.
  - Occurrences of a particular configuration value or setting.
  - TODO comments or other specific markers.
  - Potential security vulnerabilities (e.g., hardcoded keys matching a pattern).
- **Key Considerations:** Requires a `path` to search within (use `.` for the CWD) and a `regex` pattern. Optionally filters by file name/extension using `file_pattern` (e.g., `*.ts`, `config.*`). Results include matching lines with context.

---

### `shell_exec`

- **Purpose:** To execute a shell command within a specific, persistent shell session identified by a unique `id`. Captures stdout/stderr.
- **Usage Context:** Ideal for:
  - Running build processes (`npm run build`, `mvn package`).
  - Executing test suites (`pnpm test`, `pytest`).
  - Running linters or formatters (`eslint .`, `black .`).
  - Starting development servers (`npm run dev`).
  - Any sequence of commands where session state (like environment variables set by a previous command or the current directory _within the session_) needs to be maintained.
- **Key Considerations:** Requires an _absolute path_ for `exec_dir`. A new session is created if the `id` doesn't exist. The tool attempts to detect web servers and may offer a preview link.

---

### `shell_wait`

- **Purpose:** To pause execution, waiting for activity or completion within a specific shell session.
- **Usage Context:** Typically used after `shell_exec` to:
  - Wait for a long-running foreground process (like `npm install` or a build) to complete before proceeding. If `seconds` is omitted, it waits for process completion (or a timeout).
  - Introduce a fixed delay (by providing `seconds`) after starting a background process or to allow a server time to initialize.
- **Key Considerations:** Requires the `id` of the shell session to wait on.

---

### `shell_kill_process`

- **Purpose:** To terminate the currently running foreground process within a specific shell session.
- **Usage Context:** Used to stop:
  - Long-running commands like development servers (`npm run dev`).
  - Processes that appear stuck or unresponsive.
  - Any foreground command initiated with `shell_exec` that needs to be halted.
- **Key Considerations:** Primarily sends SIGINT (Ctrl+C) for graceful shutdown. May resort to terminating the entire session if SIGINT fails. Requires the `id` of the target session.

---

### `shell_view`

- **Purpose:** To retrieve and display the recent standard output (stdout) and standard error (stderr) from a specific shell session.
- **Usage Context:** Useful for:
  - Checking the results or status of commands executed previously with `shell_exec`.
  - Debugging issues by examining error messages printed to the console within the session.
- **Key Considerations:** Captures output generated since the last `shell_view` or `shell_exec` in that session. Requires the `id` of the session.

---

### `shell_write_to_process`

- **Purpose:** To send text input to the standard input (stdin) of the currently running foreground process within a specific shell session.
- **Usage Context:** Essential for interacting with interactive command-line prompts, such as:
  - Answering confirmation prompts (e.g., "yes/no").
  - Providing passwords or other sensitive input.
  - Selecting options from a menu presented by a script.
- **Key Considerations:** Requires the `id` of the session with the active prompt. The `input` parameter contains the text to send. Set `press_enter: true` to simulate pressing Enter after the input.

---

### `run_browser`

- **Purpose:** To initiate and monitor a server-side browser automation task for complex web interactions potentially involving multiple steps.
- **Usage Context:** Use when tasks require more than just loading a page, such as:
  - Logging into websites.
  - Filling out and submitting forms.
  - Navigating through multiple pages.
  - Clicking buttons or interacting with dynamic elements.
  - Scraping data that requires interaction to be revealed.
- **Key Considerations:** The `task` description needs to be detailed and step-by-step. This tool can be time-consuming and potentially costly. Streams progress updates (status, screenshots) back to the UI. Contrast with `url_screenshot` for simple page loads.

---

### `url_screenshot`

- **Purpose:** To capture a screenshot and browser console logs of a web page _immediately after its initial load_.
- **Usage Context:** Best suited for:
  - Quick visual verification of UI rendering and layout.
  - Checking for console errors (JavaScript errors, failed resource loads) that occur during the initial page load.
  - Capturing the state of static pages or pages where interaction is not needed.
- **Key Considerations:** Navigates to the URL, waits for load, captures, and collects console messages. **Does not interact** (no clicks, scrolls, input). Requires the full URL (http://, https://, or file://).

---

### `deploy_preview`

- **Purpose:** To create a new preview deployment for the current state of the codebase, providing a shareable URL.
- **Usage Context:** Typically used after a set of changes (e.g., a feature or bug fix) has been implemented, tested, and approved. Allows stakeholders to review the changes in a live-like environment before merging.
- **Key Considerations:** Requires a short, user-facing `deploy_summary` describing the changes included in the preview. The tool handles the build, packaging, and upload process. Deployment failures will provide error details for debugging.
