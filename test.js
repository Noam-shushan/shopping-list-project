const crypt = require('crypto');

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
// new Promise((resolve, reject) => {
//     downloading();
//     resolve("after downloading");
// }).then((msg) => {
//     console.log(msg);
// });
function myonload(Content, callback) {
    setTimeout(() => {
        callback();
        console.log("Now we have th data " + Content);
    }, 3000);
}

function generateId() {
    const newID = crypt.randomUUID();
    return newID.replaceAll('/', '');
}

const users = []
for (let i = 0; i < 10; i++) {
    users.push({
        id: generateId(),
        name: "user" + i,
        email: "user" + i + "@gmail.com",
    });
}




