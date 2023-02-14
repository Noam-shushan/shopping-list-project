const baseTitle = "My Website";

export const urlHash = {
    404: {
        title: "404 | " + baseTitle,
        template: "frontend/templates/404.html",
    },
    "/": {
        title: "Home | " + baseTitle,
        template: "/frontend/templates/home.html",
        script: "frontend/controllers/home.js",
        // style: "/styles/home.css"
    },
    basicToDoList: {
        title: "basic To Do List | " + baseTitle,
        template: "frontend/templates/basicToDoList.html",
        script: "frontend/controllers/basicToDoList.js",
        style: "frontend/css/basicToDoList.css"
    },

    inDevlopment: {
        title: "In Devlopment | " + baseTitle,
        template: "/pages/in-devlopment.html"
    },
    about: {
        title: "About | " + baseTitle,
        template: "/pages/about.html",
    },
    contact: {
        title: "Contact | " + baseTitle,
        template: "/pages/contact.html",
    },
    login: {
        title: "Login | " + baseTitle,
        template: "/pages/login.html",
        script: "/js/views/login-view.js",
        style: "/styles/login.css"
    },
};