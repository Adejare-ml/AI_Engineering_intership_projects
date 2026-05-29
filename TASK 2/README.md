# How Large Language Models Work
### Tokens · Attention · Transformer Layers · Output

> A beginner-friendly walkthrough of how an LLM turns your words into a response.
> Written for secondary school and first-year university students.

---

## Table of Contents

1. [Overview](#overview)
2. [What Are Tokens?](#1-what-are-tokens)
3. [What Does Attention Do?](#2-what-does-attention-do)
4. [What Are Transformer Layers?](#3-what-are-transformer-layers)
5. [How They Work Together](#4-how-they-work-together)
6. [The Pipeline — Step by Step](#5-the-pipeline--step-by-step)
7. [Quick-Reference Glossary](#6-quick-reference-glossary)
8. [Visual Diagram](#7-visual-diagram)
9. [References](#8-references)

---

## Overview

When you type a message to an AI like ChatGPT or Claude, a lot happens before you see a reply. The model does not read your sentence the way a human does. It breaks it apart, analyses relationships between words, processes it through dozens of mathematical layers, and then builds a response one word at a time.

This README explains the four key parts of that process in plain language.

---

## 1. What Are Tokens?

A **token** is a small piece of text — usually a word, part of a word, or a punctuation mark.

Before the model can do anything useful, it converts your sentence into tokens. Think of it like cutting a sentence into puzzle pieces.

**Example:**

```
Input sentence: "I am playing football"

Tokens: ["I", " am", " play", "ing", " foot", "ball"]
```

Each token is then converted into a list of numbers (called a **vector** or **embedding**). Numbers are what computers actually process — not letters.

**Why split into tokens and not whole words?**

- The word *"playing"* shares a root with *"play"*, *"player"*, and *"replay"*. Splitting at the sub-word level lets the model recognise those shared roots.
- It also handles new or unusual words. Even if the model has never seen *"Nigerianisation"*, it can process it as *["Nigerian", "isation"]*.

> **Key takeaway:** Tokenization turns your words into numbers the model can process.

---

## 2. What Does Attention Do?

**Attention** is the mechanism that lets the model understand how words in a sentence relate to each other.

When the model reads a sentence, it does not look at each word in isolation. For every token, it looks at every *other* token and asks: *"How relevant is this word to the word I am currently processing?"*

**Example:**

```
Sentence: "The dog chased the cat because it was hungry."
```

When the model processes the word **"it"**, attention helps it figure out that *"it"* refers to **"dog"** — not *"cat"* or *"cat"*. It does this by assigning a score (called an **attention weight**) to every other word.

```
Processing "it":

 "The" → low weight (0.02)
 "dog" → HIGH weight (0.81) ← model pays most attention here
 "chased"→ medium weight(0.08)
 "cat" → low weight (0.04)
 "was" → low weight (0.03)
 "hungry"→ low weight (0.02)
```

The model uses those weights to decide how much each word influences the meaning of the word it is currently processing.

**Self-attention** means every token can look at every other token simultaneously — in both directions. This is different from reading left to right like a human.

> **Key takeaway:** Attention tells the model which words to focus on when processing each token.

---

## 3. What Are Transformer Layers?

A **transformer block** (or transformer layer) is a unit inside the model that runs two operations in sequence:

```
Step A: Self-Attention → figure out which words matter
Step B: Feed-Forward Network → refine the meaning further
```

A large language model stacks many of these blocks on top of each other. Each block receives the output of the previous block and improves on it.

```
Token embeddings
 ↓
[Transformer Block 1] ← learns basic grammar & word types
 ↓
[Transformer Block 2] ← learns phrases & simple relationships
 ↓
[Transformer Block 3] ← learns context & sentence structure
 ↓
 ....
 ↓
[Transformer Block N] ← understands tone, intent, meaning
 ↓
Final representation
```

**How many layers do real models have?**

| Model | Approximate Layers |
|-------|--------------------|
| GPT-2 (small) | 12 |
| GPT-3 | 96 |
| GPT-4 | ~96 (estimated) |
| BERT (base) | 12 |

Each layer adds a richer understanding. By the time the data reaches the last layer, the model has a deep, contextual grasp of what was said.

> **Key takeaway:** Transformer blocks are the "thinking units" of an LLM. More layers = deeper understanding.

---

## 4. How They Work Together

Here is the full picture:

```
Your sentence
 ↓
 Tokenizer splits it into tokens and converts each token to numbers
 ↓
 Attention layer scores how every token relates to every other token
 ↓
 Transformer blocks process those scores layer by layer,
 building richer meaning at each step
 ↓
 The final layer predicts the most likely next token
 ↓
 That token is added to the output, and the process repeats
 until the response is complete
```

The output is generated **one token at a time**. The model picks the most probable next word, appends it, then runs the whole pipeline again to pick the word after that — until it decides the response is complete.

This is why AI responses appear word-by-word when you watch them generate in real time.

---

## 5. The Pipeline — Step by Step

| Step | Name | What Happens |
|------|------|--------------|
| 1 | **Input Text** | You type a sentence or question |
| 2 | **Tokenization** | The sentence is split into tokens and each is converted to a number vector |
| 3 | **Attention** | The model calculates how much each token should influence every other token |
| 4 | **Transformer Layers** | Many stacked blocks each run attention + feed-forward processing, deepening understanding |
| 5 | **Output** | The model predicts the next token; this repeats until the full response is generated |

---

## 6. Quick-Reference Glossary

| Term | Simple Definition |
|------|-------------------|
| **Token** | A small chunk of text (word, part-word, or character) that the model processes as a unit |
| **Embedding** | A list of numbers that represents a token's meaning in a way the model can use |
| **Attention** | A mechanism that scores how relevant each token is to every other token |
| **Attention weight** | A score (0 to 1) showing how much one token should "pay attention" to another |
| **Transformer block** | A single processing unit that runs attention + a feed-forward network |
| **Feed-forward network** | A small neural network inside each transformer block that refines the token's representation |
| **LLM** | Large Language Model — a deep learning model trained on massive amounts of text |
| **Vector** | A list of numbers used to represent data (e.g. a token's meaning) |
| **Context window** | The maximum number of tokens an LLM can process in a single input |

---



---

## 8. References

| # | Resource | Author / Source | Used For |
|---|----------|-----------------|----------|
| 1 | [Transformers & Attention (Video)](https://youtu.be/eMlx5fFNoYc) | 3Blue1Brown | Conceptual foundation for attention and transformer stacks |
| 2 | [How LLMs Work — Beginner Overview (Video)](https://youtu.be/5sLY9aB5ZCo) | YouTube | Plain-language framing of the end-to-end pipeline |
| 3 | [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/) | Jay Alammar | Technical detail on encoder/decoder structure and self-attention |
| 4 | [Embeddings & Tokenization Guide](https://platform.openai.com/docs/guides/embeddings) | OpenAI | Tokenization concept and number-vector conversion |
| 5 | [Transformers Documentation](https://huggingface.co/docs/transformers/index) | Hugging Face | Definition of transformer as the framework for state-of-the-art LLMs |

---

## File Structure

```
project/
├── README.md ← This file
└── llm_pipeline.drawio ← Editable diagram (open in diagrams.net)
```

---

*Written by Adelugba Adejare*
