import chalk from "chalk"

const PROJECTNAME = "prospark-project"

// questions asked by cli
const scaffoldQuestions = [
    {
        type: 'input',
        name: 'projectName',
        message: 'Project name:',
        prefix: chalk.greenBright("\n?"),
        default: PROJECTNAME
    },
    {
        type: 'list',
        name: 'projectType',
        message: 'Project Type:',
        prefix: chalk.greenBright("\n?"),
        choices: [
            'Blank',
            'Starter',
            'SAAS',
        ]
    },
    {
        type: 'list',
        name: 'architecture',
        message: 'Select an architecture:',
        prefix: chalk.greenBright("\n?"),
        choices: ['Poly-repo','Mono-repo']
    },
    {
        type: 'list',
        name: 'stack',
        message: 'Select stack:',
        prefix: chalk.greenBright("\n?"),
        choices: ['frontend','backend','fullstack']
    },
    {
        type: 'list',
        name: 'variant',
        message: 'Select Variant:',
        prefix: chalk.greenBright("\n?"),
        choices: ['Typescript','Javascript']
    },
    {
        type: 'list',
        name: 'frontendFramework',
        message: 'Select frontend framework:',
        prefix: chalk.greenBright("\n?"),
        choices: [
            'Vanilla',
            'React',
            'Vue',
            'Svelte',
        ],
        when: (answers: any) => answers.stack === 'frontend'
    },
    {
        type: 'list',
        name: 'frontendStyling',
        message: 'Select frontend styling:',
        prefix: chalk.greenBright("\n?"),
        choices: [
            'css module',
            'tailwindcss'
        ],
        when: (answers: any) => answers.stack === 'frontend'
    },
    {
        type: 'list',
        name: 'backendRestWithTypescript',
        message: 'Select backend (REST):',
        prefix: chalk.greenBright("\n?"),
        choices: [
            'Nodejs',
            'Nodejs && Express',
            'Nestjs',
        ],
        when: (answers: any) => (answers.stack === 'backend' || answers.stack === "fullstack") && answers.variant === "Typescript"
    },
    {
        type: 'list',
        name: 'backendRestWithJavascript',
        message: 'Select backend (REST):',
        prefix: chalk.greenBright("\n?"),
        choices: [
            'Nodejs',
            'Nodejs && Express'
        ],
        when: (answers: any) => (answers.stack === 'backend' || answers.stack === "fullstack") && answers.variant === "Javascript"
    },
    {
        type: 'confirm',
        name: 'backendDatabase',
        message: 'Use database (y/n):',
        prefix: chalk.greenBright("\n?"),
        when: (answers: any) => (answers.stack === 'backend' || answers.stack === "fullstack")
    },
    {
        type: 'list',
        name: 'backendDatabaseType',
        message: 'Select database type:',
        prefix: chalk.greenBright("\n?"),
        choices: [
            'Mysql',
            'Mongodb',
            'Postgresql',
        ],
        when: (answers: any) => answers.backendDatabase
    }
]


export default scaffoldQuestions