function createBlockly(options){   //function to create blockly
 
  var blocklyArea = document.getElementById('blockly-container');   //variable blocklyarea that holds the container
  var blocklyDiv = document.getElementById('blockly-div');   //blockly div
  var ws = new Blockly.WorkspaceSvg(new Blockly.Options({}))   //variable to hold workspace svg with blockly options
  //var options;
  
  // if (isCurrentEditor){
  //   options ={toolbox: document.getElementById('toolbox')}
  // }
  // else {
  //   options = {readOnly: true}
    
  // }
  var workspace = Blockly.inject(blocklyDiv,   // variable that holds a blockly inject
      options);
   
  var onresize = function(e) {  
    // Compute the absolute coordinates and dimensions of blocklyArea.
    var element = blocklyArea;
    var x = 0;
    var y = 0;
    do {
      x += element.offsetLeft;
      y += element.offsetTop;
      element = element.offsetParent;
    } while (element);
    // Position blocklyDiv over blocklyArea.
    blocklyDiv.style.left = x + 'px';
    blocklyDiv.style.top = y + 'px';
    blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
    blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
    Blockly.svgResize(workspace);
    if (isCurrentEditor = false){ 
    
    }
    
  };
  window.addEventListener('resize', onresize, false);  //window event listener 
  onresize();
  Blockly.svgResize(workspace);   //resizes the workspace


  document.getElementById("toggle-chat").addEventListener("click", function() { //gets chat to open on click 
    onresize();
  });

  document.getElementById("toggle-monitor").addEventListener("click", function() {  //montior to open on click
    onresize();
  });

  workspace.addChangeListener(function(event){  //add change listener to check if socket is open
    if(socket.OPEN){

      //Preventing user interface 
      if (event instanceof Blockly.Events.UiBase) {  
        return;
      }

      var json = event.toJson();  //json to show if blockly content has been made
      socket.send(JSON.stringify({
        "type" : "blockly_edit_has_been_made",
        "blockly_content" : json
      }))
    }  
  });

  socket.onmessage = function(event) {   //when a blockly has been put into workspace is will send this message
    let data = JSON.parse(event.data)
    if (data.type == "blockly_edit_has_been_made") {
      var blocklyContent = data.blockly_content
   
      var blocklyEvent = Blockly.Events.fromJson(blocklyContent, workspace);  //if blockly content is added says which one it is in console
      blocklyEvent.run(true);
      console.log(blocklyEvent)
    }
  }
 
}
function deleteBlockly(workspace){  //function to delete blockly block
  workspace.dispose()
}

// //socket.onopen = function(workspace){
//   if(socket.OPEN){
//     //workspace.addChangeListener(function(){
//       console.log("what am i even doing?")
//     };
//   //} 

   

