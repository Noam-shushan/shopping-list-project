
export function getCurrentUser() {
    let user = sessionStorage.getItem("currentUser");
    if (user && user !== '{}') {
        return JSON.parse(user);
    }
    return null;
}

export function setCurrentUser(user) {
    sessionStorage.setItem("currentUser", JSON.stringify(user));
}

export function clearCurrentUser() {
    sessionStorage.removeItem("currentUser");
    window.location.hash = "login";
}