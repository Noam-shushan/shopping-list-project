/**
 * The router of the application using the hash
 * Handle the location change and load the new page with his script and style
 * The gool is to create a SPA (Single Page Application) with no freamwork
 */

import { urlHash } from "./URLs.js";


/**
 * Handle the location change by the hash
 */
const handleLocation = async () => {
    let path = window.location.hash.replace("#", "");
    if (!path) {
        path = "/"; // go home page by default
    }
    // Get the route, or 404 if not found
    const route = urlHash[path] || urlHash[404];

    // Load the template
    const html = await fetch(route.template).then((data) => data.text());
    document.getElementById("main-content").innerHTML = html;

    document.title = route.title;

    // set the page script
    loadScript(route);

    // set the page style sheet
    loadCss(route);
};

/**
 * Load the script of the page,
 * remove the previous script if exists
 * @param {*} route the route object
 */
function loadScript(route) {
    // Remove the previous script
    const script = document.querySelector("#currentScript");
    if (script) {
        document.head.removeChild(script)
    }

    // Load the new script
    if (route.script) {
        const script = document.createElement("script");
        script.src = route.script;
        script.type = "module";
        script.defer = true;
        script.id = "currentScript";
        document.head.appendChild(script);
    }
}

/**
 * Load the style sheet of the page,
 * remove the previous style sheet if exists
 * @param {*} route the route object
 */
function loadCss(route) {
    // Remove the previous style sheet
    const previousStyle = document.querySelector('#currentStyle');
    if (previousStyle) {
        document.head.removeChild(previousStyle);
    }

    // Load the new style sheet
    if (route.style) {
        const styleLink = document.createElement('link');
        styleLink.rel = 'stylesheet';
        styleLink.href = route.style;
        styleLink.id = 'currentStyle';
        document.head.appendChild(styleLink);
    }
}

window.addEventListener("hashchange", handleLocation);

handleLocation();