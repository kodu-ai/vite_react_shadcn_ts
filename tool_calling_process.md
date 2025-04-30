# Tool Calling Process Explained

This document details the mechanism I use to propose and execute tool calls.

## 1. Identifying the Need for a Tool

Based on your request, the ongoing conversation history, and the current state of the task (including results from previous tool calls), I determine which tool (or tools) is the most appropriate next step to move towards completing your objective. My goal is to break down the task into a sequence of logical, manageable tool operations.

## 2. Formatting the Tool Call

I construct the tool call using a specific XML-style format defined in my instructions.

**General Structure:**

```xml
<tool_name>
  <parameter1_name>parameter1 value</parameter1_name>
  <parameter2_name>parameter2 value</parameter2_name>
  ...
</tool_name>
```

- `<tool_name>`: The exact name of the tool being called.
- `<parameter_name>`: The name of a parameter the tool accepts.
- `...`: **Crucially**, all parameter values are enclosed in CDATA sections.

**Multiple Calls (Special Case):**

For tools explicitly documented to support multiple calls in one turn (like `write_file` or `edit_file`), the structure uses a parent `<tool_calls>` tag:

```xml
<tool_calls>
  <write_file tool_call_id="unique_id_1">
    <file_path>path/to/file1.txt</file_path>
    <content>Content for file 1</content>

```
