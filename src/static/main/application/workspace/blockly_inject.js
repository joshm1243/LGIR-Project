function createBlockly(options){
 
  var blocklyArea = document.getElementById('blockly-container');
  var blocklyDiv = document.getElementById('blockly-div');
  var ws = new Blockly.WorkspaceSvg(new Blockly.Options({}))
  //var options;
  
  // if (isCurrentEditor){
  //   options ={toolbox: document.getElementById('toolbox')}
  // }
  // else {
  //   options = {readOnly: true}
    
  // }
  var workspace = Blockly.inject(blocklyDiv,
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
  window.addEventListener('resize', onresize, false);
  onresize();
  Blockly.svgResize(workspace);


  document.getElementById("toggle-chat").addEventListener("click", function() {
    onresize();
  });

  document.getElementById("toggle-monitor").addEventListener("click", function() {
    onresize();
  });

  workspace.addChangeListener(function(event){
    if(socket.OPEN){

      //Preventing user interface 
      if (event instanceof Blockly.Events.UiBase) {
        return;
      }

      var json = event.toJson();
      socket.send(JSON.stringify({
        "type" : "blockly_edit_has_been_made",
        "blockly_content" : json
      }))
    }  
  });

  socket.onmessage = function(event) {
    let data = JSON.parse(event.data)
    if (data.type == "blockly_edit_has_been_made") {
      console.log(data)
    }
  }
}
function deleteBlockly(workspace){
  workspace.dispose()
}

// //socket.onopen = function(workspace){
//   if(socket.OPEN){
//     //workspace.addChangeListener(function(){
//       console.log("what am i even doing?")
//     };
//   //} 

   

