---
slug: "introduction"
title: "How to Write a Blog Post for This Website"
description: "A quick guide showing exactly how to structure and format a new post."
imageUrl: "https://res.cloudinary.com/your-cloud-name/image/upload/sample-cover.jpg"
imageAlt: "A person writing notes at a desk"
pubDate: "2026-08-02"
author: "MabeCare Foundation"
avatarUrl: "https://res.cloudinary.com/your-cloud-name/image/upload/avatar.jpg"
category: "General"
tags: ["guide", "getting-started"]
featured: false
draft: false
---

## Introduction

Welcome! This post is a working example, showing exactly how to structure and format a new post on this website.

Every paragraph in markdown needs a blank line before and after it. Without that blank line, two lines of text run together into one paragraph even if they're on separate lines in the file. That's the rule this rewrite fixes.

## Before you start: the frontmatter

At the very top of every post file, between the two `---` lines, is the frontmatter. This is where you fill in the details about the post, not the story itself.

- **slug** — the web address for the post. Keep it lowercase, words separated by dashes, no spaces. This becomes `yoursite.com/blog/your-slug-here`
- **title** — the post's headline
- **description** — a short one or two sentence summary. Shows up under the title and in previews
- **imageUrl** — the cover image link. Upload the image to Cloudinary first, then paste the link here
- **imageAlt** — a plain description of what's in the image, for accessibility and screen readers
- **pubDate** — the publish date, written as `YYYY-MM-DD`
- **category** — pick one: this decides which filter the post falls under
- **tags** — a list of relevant keywords, can be more than one
- **featured** — leave as `false` unless told otherwise
- **draft** — set to `true` while writing, change to `false` only when ready to publish

## Writing the post itself

Everything below the second `---` line is the actual post, written in plain text with some simple symbols for formatting.

### Headings

Use `##` for a main section heading and `###` for a smaller sub-heading, like the ones above.

### Basic text styling

You can make text **bold** by wrapping it in two asterisks, like `**this**`.

You can make text *italic* with one asterisk, like `*this*`.

### Lists

A simple list looks like this:

- First point
- Second point
- Third point

A numbered list looks like this:

1. First step
2. Second step
3. Third step

### Links

To link to something, write it like this: `[MabeCare Foundation](https://mabecare-foundation.vercel.app)`, which shows up as [MabeCare Foundation](https://mabecare-foundation.vercel.app).

### Adding an image inside the post

Besides the cover image at the top, you can drop extra images inside the writing itself, using the same link-style syntax but with an exclamation mark in front:

### Quotes

To highlight a quote from someone, use a `>` at the start of the line:

> "Every donation, no matter the size, helps a family in need."

## Wrapping up

That covers everything needed to write a full post. When ready to publish for real:

1. Copy this file
2. Rename it to match the new post's topic (e.g. `back-to-school-drive-2026.md`)
3. Fill in your own frontmatter
4. Write the post
5. Set `draft` to `false`
6. Commit the file on GitHub

The tags at the bottom of this page (Guide, Getting Started) come straight from the `tags` list above.