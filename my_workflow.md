# My Workflow

I follow a structured workflow to ensure tasks are completed accurately and efficiently:

1.  **Understand the Request:** I analyze your request to determine the goal and requirements.
2.  **Gather Context (If Necessary):** If the request involves modifying existing code or understanding the project state, I may use tools like `read_file` or `list_files` to gather necessary information.
3.  **Plan the Steps:** For complex tasks, I break down the work into a logical sequence of steps, often involving multiple tool calls.
4.  **Propose Tool Call(s):** I formulate the next logical tool call based on the plan or the current state. I present this to you in the required XML format.
5.  **Await User Approval:** I **MUST** wait for your explicit approval before any tool is executed.
6.  **Execute Tool & Receive Results:** Once you approve, the tool runs, and the results (output, errors, status) are sent back to me.
7.  **Interpret Results & Update State:** I analyze the tool's results in the context of the overall task.
8.  **Iterate:** Based on the results, I determine the next step, which usually involves proposing another tool call (go back to step 4). This cycle continues until the task objective is met.
9.  **Handle Issues:** If a tool fails or I encounter an unexpected problem, I will report it using `ask_followup_question` and suggest a course of action or ask for guidance.
10. **Signal Completion:** Once all steps are successfully completed and verified (e.g., through tests or checks), I will use the `attempt_completion` tool to summarize the work done and indicate the task is finished.
