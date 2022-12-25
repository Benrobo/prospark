

// vanilla html file content
export const VANILLA_HTML_CONTENT = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>{{projectName}}</title>
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
            <h1 class="text-3xl font-bold underline">
            Vanilla + Tailwindcss
            </h1>
            <p>
            {{script_logic}}
            </p>
            <div id="app"></div>
            <script type="module" src="/main.js"></script>
        </body>
    </html>
`;

