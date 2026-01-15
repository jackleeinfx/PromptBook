# AI Prompt Manager

A fast and efficient tool for managing, building, and exporting AI image generation prompts.
Powered by React, Tailwind CSS, and Supabase.

## Features
- **Category Management**: Organize prompts by style, camera, lighting, etc.
- **Bulk Import**: Paste multiple prompts at once to populate your library.
- **Prompt Builder**: Click-to-select interface to assemble complex prompts.
- **Cloud Storage**: Prompts are saved to your Supabase database.

## Setup & Running

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Configuration**
    - Rename `.env.example` to `.env`.
    - Add your Supabase URL and Anon Key.

3.  **Run Locally**
    ```bash
    npm run dev
    ```
    - Open the URL shown in the terminal (usually `http://localhost:5173`).

    **Note:** You cannot open `index.html` directly in your browser due to security restrictions. You must run the local server.

4.  **Build for Production**
    ```bash
    npm run build
    npm run preview
    ```

## Database Setup

Run the SQL commands in `schema.sql` in your Supabase SQL Editor to set up the necessary tables.
