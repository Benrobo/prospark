
const PROJECTNAME = "prospark-project"

// questions asked by cli
const scaffoldQuestions = [
    {
        type: 'input',
        name: 'projectName',
        message: 'Project name:',
        default: PROJECTNAME
    },
    {
        type: 'list',
        name: 'projectType',
        message: 'Project Type:',
        choices: [
            'Blank',
            'Starter',
            'SAAS',
        ],
    },
    {
        type: 'list',
        name: 'architecture',
        message: 'Select an architecture:',
        choices: ['Poly-repo','Mono-repo']
    },
    {
        type: 'list',
        name: 'stack',
        message: 'Select stack:',
        choices: ['frontend','backend','fullstack']
    },
    {
        type: 'list',
        name: 'variant',
        message: 'Select Variant:',
        choices: ['Typescript','Javascript']
    },
    {
        type: 'list',
        name: 'frontendFramework',
        message: 'Select frontend framework:',
        choices: [
            'Vanilla',
            'React',
            'Vue',
            'Svelte',
        ],
        when: (answers: any) => answers.stack === 'frontend',
    },
    {
        type: 'list',
        name: 'frontendStyling',
        message: 'Select frontend styling:',
        choices: [
            'css module (vanilla, nextjs, react, vue)',
            'tailwindcss (vanilla, nextjs, react, vue)',
            'styled-component (nextjs, react)',
        ],
        when: (answers: any) => answers.stack === 'frontend',
    },
    {
        type: 'list',
        name: 'backendRestWithTypescript',
        message: 'Select backend (REST):',
        choices: [
            'Nodejs',
            'Nodejs && Express',
            'Nestjs',
        ],
        when: (answers: any) => (answers.stack === 'backend' || answers.stack === "fullstack") && answers.variant === "Typescript",
    },
    {
        type: 'list',
        name: 'backendRestWithJavascript',
        message: 'Select backend (REST):',
        choices: [
            'Nodejs',
            'Nodejs && Express'
        ],
        when: (answers: any) => (answers.stack === 'backend' || answers.stack === "fullstack") && answers.variant === "Javascript",
    },
    {
        type: 'confirm',
        name: 'backendDatabase',
        message: 'Use database (y/n):',
        when: (answers: any) => (answers.stack === 'backend' || answers.stack === "fullstack"),
    },
    {
        type: 'list',
        name: 'backendDatabaseType',
        message: 'Select database type:',
        choices: [
            'Mysql',
            'Mongodb',
            'Postgresql',
        ],
        when: (answers: any) => answers.backendDatabase,
    }
]


export default scaffoldQuestions