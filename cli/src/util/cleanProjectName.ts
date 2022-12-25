// clean project name
function cleanUpProjectName(projectName: string) {
    if (!projectName || projectName === "") {
      return '.';
    }
    const cleanProjectName = projectName.replace(/[^a-zA-Z0-9]/g, '');
    return cleanProjectName || '.';
}

export default cleanUpProjectName