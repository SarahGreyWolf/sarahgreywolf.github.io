import init, { test } from "/js/web_storage.js";

let startTime;
let workersComplete = 0;

window.addEventListener("load", async () => {
    // await init();
    // console.log(await test());
    const fileInput = document.getElementById("file");
    fileInput.onchange = fileUpload;
});

async function fileUpload(evt) {
    startTime = Date.now();
    const uploadedFile = evt.target.files[0];
    const root = await navigator.storage.getDirectory();
    const file = await root.getFileHandle(uploadedFile.name, { create: true });
    const writable = await file.createWritable();

    const stream = uploadedFile.stream();
    await stream.pipeTo(writable);
    console.log("Done");

    const new_file = await file.getFile();
    if (new_file.size <= 2000000000) {
        return;
    }
    const divisions = new_file.size / 2000000000;

    const workers = [];
    let start = 0;
    for (let i = 0; i < divisions; i++) {
        const worker = new Worker("/js/worker.js");
        worker.onmessage = function (e) {
            console.log(`Worker ${e.data.id} has completed it's job`);
            workers[i].done = true;
            complete(divisions);
        };
        worker.postMessage({
            fileName: uploadedFile.name,
            start: start,
            divisionIndex: i
        });
        workers.push({ worker: worker, done: false });

        start += 2000000000;
    }
}

function complete(workersCount) {
    workersComplete++;
    if (workersComplete === workersCount) {
        const duration = Date.now() - startTime;
        console.log(`Completed in ${new Date(duration).getMinutes()}`);
    }
}