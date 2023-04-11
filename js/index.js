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

    const promises = [];
    let start = 0;
    for (let i = 0; i < divisions; i++) {
        const division = await root.getFileHandle(`${uploadedFile.name}.div${division}`, { create: true });
        const slice = new_file.slice(start, start + 2000000000);
        const stream = slice.stream();
        const divWriteable = await division.createWritable();
        promises.push(stream.pipeTo(divWriteable));
        start += 2000000000;
    }

    for (let i = 0; i < promises.length; i++) {
        await promises[i];
    }
}