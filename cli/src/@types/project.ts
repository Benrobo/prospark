
interface ProjectOptions {
    projectName: string;
    projectType: string;
    architecture: string;
    stack: string;
    variant: string;
    backendPreset?: string;
    backendDatabase?: boolean;
    backendDatabaseType?: string;
    frontendFramework?: string;
    frontendStyling?: string;
}

export default ProjectOptions