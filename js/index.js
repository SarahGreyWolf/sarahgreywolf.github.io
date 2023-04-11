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
}