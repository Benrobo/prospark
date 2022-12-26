

// vanilla html file content
export const VANILLA_HTML_CONTENT = `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{{projectName}}</title>
        {{styling_logic}}
    </head>
    <body>
        {{vanilla_markup_content}}
        <p>
        {{script_logic}}
        </p>
        <div id="app"></div>
        <script type="module" src="/main.js"></script>
    </body>
</html>
`;

export const VANILLA_CSS_CONTENT = `

.heading{
    font-weight: 400px;
    color: blue;    
}

`