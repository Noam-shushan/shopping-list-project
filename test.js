function delay(ms) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
        now = Date.now();
    }
}

function downloading(during = 3000) {
    console.log("start downloading ...");
    delay(during);
    console.log("end downloading");
}

console.log("start");
new Promise((resolve, reject) => {
    downloading();
    resolve("after downloading");
}).then((msg) => {
    console.log(msg);
});
console.log("end");