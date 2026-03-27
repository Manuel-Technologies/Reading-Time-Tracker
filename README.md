# ReadingTracker

A lightweight JavaScript module for tracking **real active reading time** in web applications, including React. It measures actual engagement by ignoring inactivity and handles all the edge cases — tab switching, idle users, and page unloads.

> Ideal for educational apps where accurate engagement metrics matter.

---

## Features

- ⏱️ Session-based reading time tracking
- 💤 Configurable inactivity threshold (default: 4 minutes)
- 🖱️ Tracks scroll, click, and keypress activity
- 👁️ Auto-pauses/resumes on tab visibility changes
- 📊 Returns time in milliseconds, seconds, or minutes
- ⚛️ Works in React or vanilla JavaScript
- 📄 Single-file, zero dependencies

---

## Installation

If your project uses npm:

```bash
npm install path-to-your-file/readingTracker.js
