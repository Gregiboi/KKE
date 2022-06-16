// Currently uploaded files
let uploadedFiles = [];

//selecting all required elements
const dropArea = document.querySelector(".drag-area"),
dragText = dropArea.querySelector("header"),
button = dropArea.querySelector("button"),
input = dropArea.querySelector("input");


const appendFilesToList = () => {
    const filesContainer = document.getElementById('files-container');
    // Clear files from DOM
    filesContainer.innerHTML = '';

    // Loop through files and append to files-container
    Array.from(uploadedFiles).forEach(file => {
        const li = document.createElement("li");
        const fileInfoTextNode = document.createTextNode(`${file?.name} ${file?.path}`);
        li.appendChild(fileInfoTextNode);
        filesContainer.appendChild(li);
    });

    //DROPPED
    dropArea.addEventListener("drop", (event)=>{
        event.preventDefault(); //preventing from default behaviour
        //getting user select file and [0] this means if user select multiple files then we'll select only the first one
        
    
});
    
}

//DRAG OVER
dropArea.addEventListener("dragover", (event)=>{
    event.preventDefault(); //preventing from default behaviour
    dropArea.classList.add("active");
    dragText.textContent = "Release to Upload File";
});
//DRAG AWAY
dropArea.addEventListener("dragleave", ()=>{
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
});


const clearFiles = () => {
    uploadedFiles = [];
    const filesContainer = document.getElementById('files-container');
    filesContainer.innerHTML = '';
}

const saveInfo = () => {
    let filesInfo = '';
    Array.from(uploadedFiles).forEach((file, index) => filesInfo += `${file.path}${(index !== uploadedFiles.length - 1) ? '\n' : ''}`);
    fs.writeFile('uploaded-files-info.txt', filesInfo, (err) => {
        if (err) throw err;
        console.log('info salvestati!');
    });
}


const onFileUpload = (event) => {
    uploadedFiles = event?.target?.files;
    console.log(event?.target?.files);
    appendFilesToList()
}

const fileInput = document.getElementById('fileid');
document.getElementById('buttonid').addEventListener('click', openDialog);
function openDialog() {
    fileInput.click();
}

fileInput.addEventListener('change', onFileUpload);

const clearButton = document.getElementById('clearfiles');
clearButton.addEventListener('click', clearFiles);

const saveInfoButton = document.getElementById('saveinfo');
saveInfoButton.addEventListener('click', saveInfo);

