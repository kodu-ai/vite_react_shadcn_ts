# Tool Calling Process Explained

This document details the mechanism I use to propose and execute tool calls.

## 1. Identifying the Need for a Tool

Based on your request and the current state of the task, I determine which tool (or tools) is appropriate for the next step. My goal is to break down the task into a sequence of logical tool operations.

## 2. Formatting the Tool Call

I construct the tool call using a specific XML-style format.

**General Structure:**

```xml
<tool_name>
  <parameter1_name>parameter1 value</parameter1_name>
  <parameter2_name>parameter2 value</parameter2_name>
  ...
</tool_name>
```

**Multiple Calls (Special Case):**

For tools like `write_file` that support multiple calls in one turn, the structure is:

```xml
<tool_calls>
  <write_file tool_call_id="unique_id_1">
    <file_path>path/to/file1.txt</file_path>
    <content>Content for file 1</content>

```
