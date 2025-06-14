


//______________________________________________________________________________________
// ===== Project =====

export const PROJECT_TITLE = "Side Quest";

export const PROJECT_DESCRIPTION = "Life is a never ending quest. Make time to take some side quests!";

export const PROJECT_SIDEBAR_OPTIONS = {
    sidebarTriggerButtonProps: {
        variant: "ghost",
    }
}

export const PROJECT_USER_ROLES = {
    UNAUTHORIZED: {
        display: "Unauthorized",
    },
    USER: {
        display: "User",
    },
    TESTER: {
        display: "Tester",
    },
}

export const PROJECT_USER_ROLE_LOWEST = Object.keys(PROJECT_USER_ROLES)[0] as keyof typeof PROJECT_USER_ROLES;

export const PROJECT_USER_ROLE_HIGHEST = Object.keys(PROJECT_USER_ROLES)[ Object.keys(PROJECT_USER_ROLES).length - 1 ] as keyof typeof PROJECT_USER_ROLES;

export const PROJECT_USER_ROLE_STANDARD_ALLOWED: Array<keyof typeof PROJECT_USER_ROLES>  = [ "USER", "TESTER" ];



//______________________________________________________________________________________
// =====  =====