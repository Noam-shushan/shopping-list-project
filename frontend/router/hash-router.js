/**
 * The router of the application using the hash
 * Handle the location change and load the new page with his script and style
 * The goal is to create a SPA (Single Page Application) with no framework
 */

import { urlHash } from "./URLs.js";


/**
 * Handle the location change by the hash
 */
const handleLocation = async () => {
    let path = window.location.hash.replace("#", "");
    if (!path) {
        path = "login"; // go login page by default
    }
    // Get the route, or 404 if not found
    const route = urlHash[path] || urlHash[404];

    // Load the template
    const html = await fetch(route.template).then((data) => data.text());
    document.getElementById("main-content").innerHTML = html;

    document.title = route.title;
    document.dispatchEvent(new CustomEvent("navigate", { detail: path }));
};


document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("hashchange", handleLocation);
    handleLocation();
});

