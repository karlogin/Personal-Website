---
layout: post
title: "AI Agents, Skills, MCPs, and Context Docs"
subtitle: "Four distinct concepts that are constantly conflated — and why the distinction matters"
date: 2026-03-22 12:00:00 -0500
tags: [AI, Engineering, Tooling]
image: /img/blog/ai-concepts-hero.svg
---

If you've spent any time with modern AI development tools, you've heard all four terms. Sometimes in the same sentence. Often used interchangeably when they absolutely shouldn't be.

**Agents**, **skills**, **MCPs**, and **context docs** each describe a different layer of how AI systems are built and extended. Conflating them leads to poorly designed systems — you end up solving integration problems at the wrong layer, or wondering why your "agent" isn't actually making decisions.

Here's a clear mental model for each.

![Overview of the four concepts: AI Agent, Skills, MCP, and Context Docs](/img/blog/ai-concepts-overview.svg)

---

## Context Docs — The Knowledge Layer

Context docs are the foundation. They're the static information you give an AI before any conversation or task begins.

This includes:
- **System prompts** — instructions baked into how a model is deployed
- **CLAUDE.md files** — project-specific rules and conventions (like this site has one)
- **README files** — architecture overviews, setup instructions
- **Domain knowledge** — terminology glossaries, style guides, policy documents

The defining characteristic: context docs are **passive and read-only**. The AI doesn't generate them or update them — it just carries them. They answer the question: *what does this AI know before it starts?*

A well-written context doc eliminates entire categories of mistakes. If your `CLAUDE.md` says "we use `apple.min.css` — after editing `apple.css`, regenerate the minified file using this command," you never have to repeat that instruction. The AI just knows.

**When context docs fail**: they're static, so they go stale. If your architecture changes but the docs don't, the AI will confidently work from outdated assumptions. Keeping context docs current is as important as writing them in the first place.

---

## Skills — The Procedure Layer

Skills are predefined, named action sequences that an agent can invoke.

Think of a skill as a macro. It has a name, it takes some input, it executes a specific sequence of steps, and it produces output. The key properties:

- **Named and discoverable** — the agent can see what skills are available
- **Reusable** — the same skill can be called across different tasks and contexts
- **Parameterized** — a `/commit` skill takes a message; a `/deploy` skill takes an environment
- **Encapsulated** — the caller doesn't need to know the implementation details

In practice, skills often wrap complex multi-step workflows behind a clean interface. Instead of an agent reasoning through the full sequence of "how do I make a commit" every time, it calls `/commit` and the skill handles staging, formatting the message, and running the git command.

The distinction from agents: skills are **not autonomous**. A skill executes a fixed procedure. It doesn't reason about whether the procedure is right for the situation — that's the agent's job. The agent decides *which* skill to use and *when*.

---

## MCPs — The Integration Layer

![MCP architecture diagram showing AI model connected to tools via the MCP protocol](/img/blog/mcp-layers.svg)

MCP stands for **Model Context Protocol** — an open standard (developed by Anthropic) that defines how AI models connect to external tools, data sources, and services.

Before MCP, every AI-tool integration was bespoke. You wrote custom code to let an AI read files, query a database, or call an API. Each integration had its own conventions, its own auth pattern, its own error handling. Multiply that by dozens of tools and you have an unmaintainable mess.

MCP solves this with a single standardized protocol:

- **Tool discovery**: the AI asks "what tools do you have?" and gets back a schema
- **Structured calls**: every tool invocation uses the same JSON-RPC format
- **Typed I/O**: inputs and outputs are schema-defined, so the AI knows what to pass and what to expect
- **Permission model**: tools declare what capabilities they need up front

The practical result: if something exposes an MCP server, any MCP-compatible AI can use it immediately — no custom glue code required. Filesystem access, browser control, database queries, GitHub operations — all become first-class capabilities through the same interface.

**MCP vs skills**: skills are about *what to do*. MCPs are about *how to reach things*. A skill might call an MCP tool internally. They operate at different layers.

---

## AI Agents — The Reasoning Layer

![The agent reasoning loop: Plan, Act, Observe, Reflect](/img/blog/agent-loop.svg)

An agent is a system that pursues a goal autonomously through a reasoning loop.

The loop looks roughly like this:

1. **Plan** — break the goal into concrete steps given what the agent knows
2. **Act** — execute the next step using available skills and MCP tools
3. **Observe** — read the output and assess what happened
4. **Reflect** — update the plan if results were unexpected or conditions changed
5. **Repeat** — until the goal is achieved, or the agent determines it can't proceed

What makes an agent different from a chatbot or a skill:

- It **plans** rather than just responding
- It **takes actions** that have real-world effects (writes files, makes API calls, runs code)
- It **adapts** when things don't go as expected
- It **uses tools** — skills and MCPs are the mechanism; the agent is the decision-maker

The agent is the thing that sits at the top of the stack and orchestrates everything else. It reads context docs to understand its environment. It decides which skills to invoke. It calls external services through MCP. It loops until done.

**The failure mode to avoid**: building an "agent" that's really just a very long skill. If your agent follows a fixed script end-to-end and never adapts based on intermediate results, you haven't built an agent — you've built a complicated macro. Real agent value comes from the ability to handle unexpected states.

---

## How They Stack

![Four-layer stack diagram: Context Docs at the base, Skills and MCPs in the middle, AI Agent at the top](/img/blog/ai-stack.svg)

Each layer has a distinct responsibility. Context docs are always present — they ground everything the agent does. Skills and MCPs sit in the middle as the agent's tools: procedures for well-known tasks, protocol-based integrations for the outside world. The agent sits on top, using all of it to reason toward a goal.

---

## Practical Takeaways

**Use context docs for**: project conventions, architectural decisions, anything that should be true across all conversations in a given environment. Write them like documentation for a new team member who never forgets anything.

**Use skills for**: repetitive, well-defined workflows. If you find yourself describing the same multi-step procedure to an AI repeatedly, it belongs in a skill. Good skills have crisp interfaces and no hidden side effects.

**Use MCPs for**: connecting AI to the external world. If an AI needs to read, write, or call something outside the conversation — filesystem, APIs, databases, browser — an MCP server is the right abstraction. Build them once, reuse everywhere.

**Use agents for**: tasks that require judgment. If the path from start to finish isn't fully known in advance — because it depends on intermediate results, external state, or decisions that can only be made mid-task — you need an agent, not a script.

The reason these four concepts get conflated is that a well-built AI system uses all of them together, and the seams aren't always visible. But when you're designing or debugging, the layer distinction is everything. Context problems, skill problems, integration problems, and reasoning problems each have entirely different solutions.

Build each layer well and the whole system gets dramatically more capable.
