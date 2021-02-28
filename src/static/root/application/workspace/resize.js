//Calling resize functions to fire when the page is refreshed
ResizeChat()
CheckForMobile()
ResizeBlockly()


//Calling resize functions to fire when the page size is changed
window.addEventListener("resize", function(){
    ResizeChat()
    CheckForMobile()
    ResizeBlockly()
})




function ResizeBlockly() {
    var blockly = document.getElementById("blockly-container")
    blockly.style.height = (window.innerHeight - 102) + "px";
}

function ResizeChat() {
    var chat = document.getElementById("chat-display-container")
    document.getElementById("blockly-wrapper").style.right = chat.offsetWidth + "px"
    chat.style.height = (window.innerHeight - 195) + "px";
    chat.style.right = chat.offsetWidth;
}

function CheckForMobile() {
    if (window.innerWidth < 550) {
        document.getElementById("top_nav").style.display = "none";
        document.getElementById("project_nav").style.display = "none";
        document.getElementById("blockly-container").style.display = "none";
        document.getElementById("mobile-top-nav").style.display = "";
    }
    else
    {
        document.getElementById("top_nav").style.display = "";
        document.getElementById("project_nav").style.display = "";
        document.getElementById("blockly-container").style.display = "";
        document.getElementById("mobile-top-nav").style.display = "none";
    }
}

document.getElementById("blockly-wrapper").style.right = "0px";

var chatOpen = false;
document.getElementById("chat-container").style.display = "none";
let chatContainer = document.getElementById("chat-container")
document.getElementById("toggle-chat").addEventListener("click", function(){
if (chatOpen) {
    document.getElementById("blockly-wrapper").style.right = "0px";
    document.getElementById("chat-container").style.display = "none";
    chatOpen = false;
}
else {
    chatContainer.style.display = "";
    document.getElementById("blockly-wrapper").style.right = chatContainer.offsetWidth + "px";
    chatOpen = true;
}
onresize();
});


var showMonitor = false;
document.getElementById("monitor-container").style.display = "none";
document.getElementById("toggle-monitor").addEventListener("click", function(){
if(showMonitor) {
    document.getElementById("blockly-container").style.display = "";
    document.getElementById("blocklyDiv").style.display = "";
    document.getElementById("monitor-container").style.display = "none";
    showMonitor = false;
}
else {
    document.getElementById("blockly-container").style.display = "none";
    document.getElementById("blocklyDiv").style.display = "none";
    document.getElementById("monitor-container").style.display = "";
    showMonitor = true;
}
onresize();
})
