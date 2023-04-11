onmessage = async function (e) {
    const fileName = e.data.fileName;
    const start = e.data.start;
    const divisionIndex = e.data.divisionIndex;
    console.log(`Worker: Received job for file ${fileName} with index ${divisionIndex}`);

    const root = await navigator.storage.getDirectory();
    const fileHandle = await root.getFileHandle(fileName);
    const file = await fileHandle.getFile();

    const division = await root.getFileHandle(`${fileName}.div${divisionIndex}`, { create: true });
    const slice = file.slice(start, start + 2000000000);
    const stream = slice.stream();
    const divWriteable = await division.createWritable();
    await stream.pipeTo(divWriteable);
    this.postMessage({ id: divisionIndex, done: true });
}