//Application Workspace Routing

/*{ <div id="workspace-loading-message">
        <h1>Loading the workspace</h1>
      </div>

      <div id="allow-edit-message">
        <h1>Someone would like to edit the workspace.</h1>
        <h2>Transfer edit rights?<h2>
        <a id='allow-edit'>Yes</a>
        <a id='block-edit'>No</a>
      </div>

      <div id="someone-is-editing-message">
        <h1>Someone is editing the workspace right now.</h1>
        <h2>Press the edit button to ask for edit permissions.</h2>
      </div>

      <div id="positive-edit-message">
        <h1>You now have permission to edit the workspace.</h1>
      </div> */

//Checking if the user is using a secure web-socket protocol
var wsStart = "ws://"
if (window.location.protocol == 'https:') {
  wsStart = "wss://"
}

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

    blocklyWrapper.classList.add("show")

    //Sending a Blockly Edit Check after 1 second to see if there is anyone currently using the workspace
    setTimeout(function() {
        socket.send(JSON.stringify({
            "type" : "blockly_edit_check",
        }))
    },1000)

    //Listening for the press of the edit button
    editButton.addEventListener("click",function() {

        //Sending a Blockly_Edit_Request to check if the user can edit the workspace
        socket.send(JSON.stringify({
            "type" : "blockly_edit_request",
        }))
    })

    //Listening for the press of the allow-edit-request button
    allowEditButton.addEventListener("click",function() {

        //Allow the user to edit the requested workspace
        socket.send(JSON.stringify({
            "type" : "blockly_edit_request_reply",
            "allow" : "true"
        }))

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
                blocklyWrapper.classList.remove("show")
                blocklyWrapper.classList.add("transparent")
                BlockAllWrapperMessages()
                isCurrentEditor = true;
            }

            //If the user is not allowed to edit the workspace
            if (data.edit != "true") {

                BlockAllWrapperMessages()
                someoneIsEditingMessage.style.display = "block";
                SetWrapperTimer()
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

        else if (data.type == "blockly_edit_request") {
            blocklyWrapper.classList.add("show")
            blocklyWrapper.classList.remove("transparent")
            BlockAllWrapperMessages()
            allowEditMessage.style.display = "block";
            SetWrapperTimer()
        }

        else if (data.type == "blockly_edit_request_reply") {

            if (data.edit == "true") {
                blocklyWrapper.classList.add("show")
                blocklyWrapper.classList.remove("transparent")
                BlockAllWrapperMessages()
                positiveEditMessage.classList.display = "block";
                SetWrapperTimer()
            }
            else {
                blocklyWrapper.classList.add("show")
                blocklyWrapper.classList.remove("transparent")
                BlockAllWrapperMessages()
                negativeEditMessage.classList.display = "block";
                SetWrapperTimer()
            }
        }

        //A chat message has been received
        else if (data.type == "chat_message") {
            //Calls the ChatMessageReceive function which deals with the event of a new chat message
            ChatMessageReceive(data)
        }
    }
}