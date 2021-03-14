//Application Workspace Routing
//Checking if the user is using a secure web-socket protocol
var wsStart = "ws://"
if (window.location.protocol == 'https:') {
  wsStart = "wss://"
}


var workspace;

//Creating a websocket
var endpoint = wsStart + window.location.host +  window.location.pathname
var socket = new WebSocket(endpoint)

//Defining Required Variables
var editButton = document.getElementById('request-edit')
var blocklyWrapper = document.getElementById('blockly-wrapper')
var allowEditButton = document.getElementById('allow-edit')
var blockEditButton = document.getElementById('block-edit')
var allowEditMessage = document.getElementById('allow-edit-message')
var workspaceLoadingMessage = document.getElementById('workspace-loading-message')
var someoneIsEditingMessage = document.getElementById('someone-is-editing-message')
var positiveEditMessage = document.getElementById('positive-edit-message')
var askingForEditMessage = document.getElementById('asking-for-edit-message')
var negativeEditMessage = document.getElementById('negative-edit-message')
var requestEditButton = document.getElementById('request-edit')
var currentEditorMessage = document.getElementById('current-editor-message')
var allowTimer = document.getElementById('allow-timer')

function BlockAllWrapperMessages() {
    allowEditMessage.style.display = "none"
    workspaceLoadingMessage.style.display = "none"
    someoneIsEditingMessage.style.display = "none"
    positiveEditMessage.style.display = "none"
    askingForEditMessage.style.display = "none"
    negativeEditMessage.style.display = "none"
    currentEditorMessage.style.display = "none"
}

var isCurrentEditor = false;
var wrapperTimeout = false;
var askedForEdit = false;

//
function SetWrapperTimer(removeWrapper=false) {

    if (wrapperTimeout) {
        clearTimeout(wrapperTimeout)
    }

    wrapperTimeout = setTimeout(function(){
        blocklyWrapper.classList.add("transparent")
        if(removeWrapper){
            blocklyWrapper.classList.remove("show")
        }
    },5000)
}

//Waiting until the web-socket is open, and then listening to any activity on the web-socket
socket.onopen = function() {

    socket.send(JSON.stringify({
        "type" : "auth",
        "auth" : wsKey
    }))

    blocklyWrapper.classList.add("show")

    //Sending a Blockly Edit Check after 1 second to see if there is anyone currently using the workspace
    setTimeout(function() {
        socket.send(JSON.stringify({
            "auth" : wsKey,
            "type" : "blockly_edit_check",
        }))
    },250)

    //Listening for the press of the edit button
    editButton.addEventListener("click",function() {

        //Sending a Blockly_Edit_Request to check if the user can edit the workspace
        socket.send(JSON.stringify({
            "auth" : wsKey,
            "type" : "blockly_edit_request",
        }))
    })

    //Listening for the press of the allow-edit-request button
    allowEditButton.addEventListener("click",function() {

        //Allow the user to edit the requested workspace
        socket.send(JSON.stringify({  // gives away workspace
            "type" : "blockly_edit_request_reply",
            "allow" : "true"
        }))
        
        deleteBlockly(workspace)

        isCurrentEditor = false

        workspace = createBlockly({readOnly: true, sounds: false})
        blocklyWrapper.classList.add("show")
        blocklyWrapper.classList.remove("transparent")
        BlockAllWrapperMessages()
        someoneIsEditingMessage.style.display = "block"
        SetWrapperTimer()
    })
   
    //Listening for the press of the block-edit-request button
    blockEditButton.addEventListener("click",function() {

        //Block the requesting user from editing the workspace and keep control
        socket.send(JSON.stringify({
            "type" : "blockly_edit_request_reply",
            "allow" : "false"
        }))

        isCurrentEditor = true

        blocklyWrapper.classList.remove("show")
        BlockAllWrapperMessages()
        SetWrapperTimer()
    })

    //Listening to the socket for activity
    socket.onmessage = function(event) {
        let data = JSON.parse(event.data) //Takes the JSON string and parses it into a JSON object

        //A Blockly edit check reply has been received
        if (data.type == "blockly_edit_check") {

            //If the user is allowed to edit the workspace
            if (data.edit == "true") {
                workspace = createBlockly({toolbox: document.getElementById('toolbox'), sounds: false})
                blocklyWrapper.classList.remove("show")
                blocklyWrapper.classList.add("transparent")
                BlockAllWrapperMessages()
                isCurrentEditor = true;
            }

            //If the user is not allowed to edit the workspace
            if (data.edit != "true") {

                workspace = createBlockly("create",{readOnly: true, sounds: false})

                BlockAllWrapperMessages()
                someoneIsEditingMessage.style.display = "block";
                SetWrapperTimer()
                isCurrentEditor = false;
            }

            //Allow the user to request permission to edit the workspace
            requestEditButton.addEventListener("click",function() {
                blocklyWrapper.classList.add("show")
                blocklyWrapper.classList.remove("transparent")
                BlockAllWrapperMessages()

                //If the user is the current editor of the workspace
                if (isCurrentEditor) {
                    currentEditorMessage.style.display = "block";
                    SetWrapperTimer(true)

                }

                //If the current user is not the current user of the worksapce
                else {
                    askingForEditMessage.style.display = "block";
                    SetWrapperTimer()
                }
            })
        }

        else if (data.type == "blockly_edit_request") {  //adds the wrapper and the wrapper leaves after a certain time.
            blocklyWrapper.classList.add("show")
            blocklyWrapper.classList.remove("transparent")
            BlockAllWrapperMessages()
            allowEditMessage.style.display = "block";
            SetWrapperTimer()
        }

        else if (data.type == "blockly_edit_request_reply") {

            if (data.edit == "true") {   //give toolbar

                deleteBlockly(workspace)

                workspace = createBlockly({toolbox: document.getElementById('toolbox'), sounds: false})
                isCurrentEditor = true
                blocklyWrapper.classList.add("show")
                blocklyWrapper.classList.remove("transparent")
                BlockAllWrapperMessages()
                positiveEditMessage.style.display = "block";
                SetWrapperTimer(true)
            }
            
            else {

                isCurrentEditor = false   
                blocklyWrapper.classList.add("show")
                blocklyWrapper.classList.remove("transparent")
                BlockAllWrapperMessages()
                negativeEditMessage.style.display = "block";
                SetWrapperTimer()
            }
        }

        //
        else if (data.type == "blockly_edit_has_been_made") {
            var blocklyEvent = Blockly.Events.fromJson(data.blockly_content, workspace)
            blocklyEvent.run(true)
        }

        //A chat message has been received
        else if (data.type == "chat_message") {
            //Calls the ChatMessageReceive function which deals with the event of a new chat message
            ChatMessageReceive(data)
        }
    }
}

function SocketSend(data) {

    if (isCurrentEditor) {
        socket.send(JSON.stringify(data))
    }

}