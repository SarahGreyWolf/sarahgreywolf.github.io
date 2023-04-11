import init, { test } from "/js/web_storage.js";

window.addEventListener("load", async () => {
    // await init();
    // console.log(await test());
    const fileInput = document.getElementById("file");
    fileInput.onchange = fileUpload;
});

async function fileUpload(evt) {
    const uploadedFile = evt.target.files[0];
    const root = await navigator.storage.getDirectory();
    const file = await root.getFileHandle(uploadedFile.name, { create: true });
    const writable = await file.createWritable();

    const stream = uploadedFile.stream();
    await stream.pipeTo(writable);
    console.log("Done?");

    const new_file = await file.getFile();
    const divisions = new_file.size / 2000000000;

    const workers = [];
    let start = 0;
    for (let i = 0; i < divisions; i++) {
        const worker = new Worker("/js/worker.js");
        worker.postMessage({
            fileName: uploadedFile.name,
            start: start,
            divisionIndex: i
        });
        worker.onmessage = function (e) {
            console.log(`${e.data.id} has completed it's job`);
        }
        workers.push(worker);

        start += 2000000000;
    }
}