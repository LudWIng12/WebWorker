window.addEventListener("load",init,false);

function init(){
    counter = 1;
}

function startWorker(){
    
    
    var worker = new Worker("Worker.js");
    worker.addEventListener("message", updates, false);
    worker.postMessage(counter);
    counter++;
    
}

function createProgress(){
    var workerDesk = document.getElementById("workerDesk");
    var workerName = "progress-"+counter;
    var labelID = "title-" +counter;
    
    var worker = document.createElement("div");
    worker.setAttribute("class", "worker");
    
    var title = document.createElement("p");
    title.setAttribute("id",labelID);
    title.innerHTML = workerName + " (0%)";
    worker.appendChild(title);
    
    
    var progress = document.createElement("progress");
    progress.setAttribute("id",workerName);
    progress.setAttribute("value","0");
    progress.setAttribute("max","100");
    worker.appendChild(progress);
    
    workerDesk.appendChild(worker);
}

function updates(e){
    var response = JSON.parse(e.data); 
    var progress = document.getElementById("progress-" + response.workerName);
    progress.value = response.progress ;
    
    var title = document.getElementById("title-" + response.workerName);
    title.innerHTML = "Worker-" + response.workerName + " ("+response.progress+"%)";
    
}