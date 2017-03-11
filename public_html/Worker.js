addEventListener("message", start, false);

function start(e) {
    var workerName = e.data;
    for (var c = 1; c <= 100; c++) {
        postMessage("{\"workerName\" : \""+workerName+"\", \"progress\" : "+c+"}");
        sleep(100);
    }
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}