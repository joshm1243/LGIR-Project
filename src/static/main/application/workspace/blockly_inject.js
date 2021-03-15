//BLOCKLY_INJECT.JS
//Contains the code used to create a Blockly instance

function createBlockly(options) {

  var blocklyArea = document.getElementById('blockly-container');   //variable blocklyarea that holds the container
  var blocklyDiv = document.getElementById('blocklyDiv');   //blockly div
  var ws = new Blockly.WorkspaceSvg(new Blockly.Options({}))   //variable to hold workspace svg with blockly options
  //var options;
  
  // if (isCurrentEditor){
  //   options ={toolbox: document.getElementById('toolbox')}
  // }
  // else {
  //   options = {readOnly: true}
    
  // }
  var workspace = Blockly.inject(blocklyDiv, options);

   
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

  workspace.addChangeListener(function(event) {
    if (event instanceof Blockly.Events.UiBase) {
      return
    }

    var json = event.toJson();

    var XMLSerial = new XMLSerializer()



    SocketSend({
      "type" : "blockly_edit_has_been_made",
      "blockly_content" : json,
      "blockly_workspace" : XMLSerial.serializeToString(Blockly.Xml.workspaceToDom(workspace))
    })

  })

  return workspace

}

function deleteBlockly(workspace) {
  workspace.dispose()
}




