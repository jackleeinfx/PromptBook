# AI Prompt Manager

A fast and efficient tool for managing, building, and exporting AI image generation prompts.
Powered by React, Tailwind CSS, and Supabase.

**This is a single-file application. No installation required.**

## Features
- **Category Management**: Organize prompts by style, camera, lighting, etc.
- **Bulk Import**: Paste multiple prompts at once to populate your library.
- **Prompt Builder**: Click-to-select interface to assemble complex prompts.
- **Cloud Storage**: Prompts are saved to your Supabase database.

## How to Use

1.  **Open the App**
    - Simply double-click `index.html` to open it in your browser.
    - Or host it on any static web server (GitHub Pages, etc.).

2.  **Configure Connection**
    - On the first load, you will be asked for your Supabase **Project URL** and **Anon Key**.
    - These keys are stored safely in your browser's Local Storage.

## Database Setup

Run the SQL commands in `schema.sql` in your Supabase SQL Editor to set up the necessary tables.

## Deployment

Since this is a single HTML file, you can deploy it anywhere:
- **GitHub Pages:** Enable Pages for this repository.
- **Netlify/Vercel:** Drag and drop the folder.
- **Local:** Just open the file!
