
//Appending the Set block to the workspace
Blockly.Blocks["set"] = {
  init: function() {

    //Initiating the Set block and its tooltip

    this.jsonInit(customBlocks.set);
    var thisBlock = this;
    this.setTooltip(function() {
      return 'Add a number to variable "%1".'.replace('%1',
          thisBlock.getFieldValue('VAR'));
    });
  }
};

//Appending the Set block to the workspace
Blockly.Blocks["value_of"] = {
  init: function() {

    //Initiating the Set block and its tooltip
    this.jsonInit(customBlocks.value_of);
    var thisBlock = this;
    this.setTooltip(function() {
      return 'Add a number to variable "%1".'.replace('%1',
          thisBlock.getFieldValue('VAR'));
    });
  }
};

var blocklyGetComponentBlock = 
Blockly.Blocks['get'] = {
  init: function() {
    this.jsonInit(customBlocks.get);
    var thisBlock = this;
    this.setTooltip(function() {
      return 'Add a number to variable "%1".'.replace('%1',
          thisBlock.getFieldValue('VAR'));
    });
  }
};

Blockly.Blocks['input_component'] = {
  init: function() {
    this.jsonInit(customBlocks.input_component);
    var thisBlock = this;
    this.setTooltip(function() {
      return 'Add a number to variable "%1".'.replace('%1',
          thisBlock.getFieldValue('VAR'));
    });
  }
};

Blockly.Blocks['pin_component'] = {
  init: function() {
    this.jsonInit(customBlocks.pin_component);
    var thisBlock = this;
    this.setTooltip(function() {
      return 'Add a number to variable "%1".'.replace('%1',
          thisBlock.getFieldValue('VAR'));
    });
  }
};
  
  
Blockly.Blocks['output_component'] = {
  init: function() {
    this.jsonInit(customBlocks.output_component);
    var thisBlock = this;
    this.setTooltip(function() {
      return 'Add a number to variable "%1".'.replace('%1',
          thisBlock.getFieldValue('VAR'));
    });
  }
};

Blockly.Blocks['add'] = {
  init: function() {
    this.jsonInit(customBlocks.add);
    var thisBlock = this;
    this.setTooltip(function() {
      return 'Add a number to variable "%1".'.replace('%1',
          thisBlock.getFieldValue('VAR'));
    });
  }
};

// JavaScript Gen Stub
Blockly.JavaScript['set'] = function(block) {
  var value_component = Blockly.JavaScript.valueToCode(block, 'COMPONENT', Blockly.JavaScript.ORDER_ATOMIC);
  var value_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
  var code = "..."
  return code;
};

// Python Gen Stub
Blockly.Python['set'] = function(block) {
  var value_component = Blockly.JavaScript.valueToCode(block, 'COMPONENT', Blockly.JavaScript.ORDER_ATOMIC);
  var value_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
  var code = "..."
  return code;
};
  
  
// JavaScript Gen Stub
  Blockly.JavaScript['component'] = function(block) {
    var dropdown_component_type_select = block.getFieldValue('COMPONENT_TYPE_SELECT');
    var number_component_instance_select = block.getFieldValue('COMPONENT_INSTANCE_SELECT');
    // TODO: Assemble JavaScript into code variable.
    var code = '...';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  };

  // Python Gen Stub
  Blockly.Python['component'] = function(block) {
    var dropdown_component_type_select = block.getFieldValue('COMPONENT_TYPE_SELECT');
    var number_component_instance_select = block.getFieldValue('COMPONENT_INSTANCE_SELECT');
    // TODO: Assemble JavaScript into code variable.
    var code = '...';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  };

  // JavaScript Gen Stub
  Blockly.JavaScript['input_component'] = function(block) {
    var dropdown_component_type_select = block.getFieldValue('COMPONENT_TYPE_SELECT');
    var number_component_instance_select = block.getFieldValue('COMPONENT_INSTANCE_SELECT');
    // TODO: Assemble JavaScript into code variable.
    var code = '...';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  };
  
  // Python Gen Stub
  Blockly.Python['input_component'] = function(block) {
    var dropdown_component_type_select = block.getFieldValue('COMPONENT_TYPE_SELECT');
    var number_component_instance_select = block.getFieldValue('COMPONENT_INSTANCE_SELECT');
    // TODO: Assemble JavaScript into code variable.
    var code = '...';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  };

  // Definition
  Blockly.Blocks['Speed'] =  {
    innit: function(){
      var speed_dropdown = block.getFieldValue('SPEED_SELECT');
      this.setPreviousStatement(true, "null");
      this.setNextStatement(true, "null");
      this.setColour(60);
    }
  };
// JavaScript Gen Stub
  Blockly.JavaScript['Speed'] = function(block) {
    var speed_dropdown = block.getFieldValue('SPEED_SELECT');
    var value = Blockly.JavaScript.valueToCode(speed_dropdown);
    this.setPreviousStatement(true, "null");
    this.setNextStatement(true, "null");
    return value;
  };

  // Python Gen Stub
  Blockly.Python['Speed'] = function(block) {
    var speed_dropdown = block.getFieldValue('SPEED_SELECT');
    var value = Blockly.JavaScript.valueToCode(speed_dropdown);
    this.setPreviousStatement(true, "null");
    this.setNextStatement(true, "null");
    return value;
  };

// Definition
  Blockly.Blocks['Wait'] =  {
    innit: function(){
      var wait_time = block.getFieldValue('WAIT_TIME');
      this.setPreviousStatement(true, "null");
      this.setNextStatement(true, "null");
      this.setColour(60);
    }
  };
// JavaScript Gen stub
  Blockly.JavaScript['Wait'] = function(block) {
    var delay_dropdown = block.getFieldValue('WAIT_TIME')
    var wait_code = 'Wait(' + delay_dropdown + ');\n';
    return wait_code;
  };
  
// Python Gen Stub
  Blockly.Python['Wait'] = function(block) {
    var delay_dropdown = block.getFieldValue('WAIT_TIME')
    var wait_code = 'Wait(' + delay_dropdown + ');\n';
    return wait_code;
  };


// Definition
Blockly.Blocks['ON or OFF'] =  {
  innit: function(){
    var state_dropdown = block.getFieldValue('STATE_SELECT');
    this.setPreviousStatement(true, "null");
    this.setNextStatement(true, "null");
    this.setColour(60);
  }
};
// JavaScript Gen Stub
Blockly.JavaScript['On or OFF'] = function(block) {
  var state_dropdown = block.getFieldValue('SPEED_SELECT');
  var value = Blockly.JavaScript.valueToCode(state_dropdown);
  var x;
  if(value = "ON"){
    x = 100;
  }
  else if(value = "OFF"){
    x = 0;
  }
  else{
    x = 50;
  }

  return x;
};

// Python Gen Stub
Blockly.Python['On or OFF'] = function(block) {
  var state_dropdown = block.getFieldValue('SPEED_SELECT');
  var value = Blockly.JavaScript.valueToCode(state_dropdown);
  var x;
  if(value = "ON"){
    x = 100;
  }
  else if(value = "OFF"){
    x = 0;
  }
  else{
    x = 50;
  }

  return x;
};

// Definition
Blockly.Blocks['Brightness'] =  {
  init: function(){
    var light_dropdown = block.getFieldValue('LIGHT_SELECT');
    this.setPreviousStatement(true, "null");
    this.setNextStatement(true, "null");
    this.setColour(60);
  }
};
// JavaScript Gen Stub
Blockly.JavaScript['Brightness'] = function(block) {
  var light_dropdown = block.getFieldValue('LIGHT_SELECT');
  var value = Blockly.JavaScript.valueToCode(light_dropdown);
  var x;
  if(value = "BRIGHT"){
    x = 80;
  }
  else if (value = "DIM"){
    x = 20;
  }
  return x;
};
// Python Gen Stub
Blockly.Python['Brightness'] = function(block) {
  var light_dropdown = block.getFieldValue('LIGHT_SELECT');
  var value = Blockly.JavaScript.valueToCode(light_dropdown);
  var x;
  if(value = "BRIGHT"){
    x = 80;
  }
  else if (value = "DIM"){
    x = 20;
  }
  return x;
};



Blockly.Blocks['0 to 100'] = {
  init: function() {
    var validator = function(newValue) {
      return newValue;
    };

    this.appendDummyInput()
    .appendField('Range: ')
    .appendField(new Blockly.FieldNumber('//range number to be inserted//', validator)),
    this.setConstraints(0, 100);
  }
};


