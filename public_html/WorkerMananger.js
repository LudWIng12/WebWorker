function init(){
    counter = 1;
}

function startWorker(){
    var workerDesk = document.getElementById("workerDesk");
    var workerName = "progress-"+counter;
    var titleName = "title-" +counter;
    
    var worker = document.createElement("div");
    worker.setAttribute("class", "worker");
    
    var title = document.createElement("p");
    title.setAttribute("id",titleName);
    title.innerHTML = workerName + " (0%)";
    worker.appendChild(title);
    
    
    var progress = document.createElement("progress");
    progress.setAttribute("id",workerName);
    progress.setAttribute("value","0");
    progress.setAttribute("max","100");
    worker.appendChild(progress);
    
    
    workerDesk.appendChild(worker);
    
    var worker = new Worker("Worker.js");
    worker.addEventListener("message", updates, false);
    worker.postMessage(counter);
    counter++;
    
}

function updates(e){
    var response = JSON.parse(e.data); 
    var progress = document.getElementById("progress-" + response.workerName);
    progress.value = response.progress ;
    
    var title = document.getElementById("title-" + response.workerName);
    title.innerHTML = "Worker-" + response.workerName + " ("+response.progress+"%)";
    
}


window.addEventListener("load",init,false);