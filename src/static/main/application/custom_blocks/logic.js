

Blockly.Blocks["set"] = {
  init: function() {
    this.jsonInit(customBlocks.set);
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

Blockly.JavaScript['set'] = function(block) {
  var value_component = Blockly.JavaScript.valueToCode(block, 'COMPONENT', Blockly.JavaScript.ORDER_ATOMIC);
  var value_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = "this will be the code to execute";
  return code;
};
  
  

  // Blockly.JavaScript['component'] = function(block) {
  //   var dropdown_component_type_select = block.getFieldValue('COMPONENT_TYPE_SELECT');
  //   var number_component_instance_select = block.getFieldValue('COMPONENT_INSTANCE_SELECT');
  //   // TODO: Assemble JavaScript into code variable.
  //   var code = '...';
  //   // TODO: Change ORDER_NONE to the correct strength.
  //   return [code, Blockly.JavaScript.ORDER_NONE];
  // };
  
  
  
  
  
  
  
  

  Blockly.JavaScript['input_component'] = function(block) {
    var dropdown_component_type_select = block.getFieldValue('COMPONENT_TYPE_SELECT');
    var number_component_instance_select = block.getFieldValue('COMPONENT_INSTANCE_SELECT');
    // TODO: Assemble JavaScript into code variable.
    var code = '...';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  };
  

  Blockly.JavaScript['Speed'] = function(block) {
    var speed_dropdown_name = block.getFieldValue('');
    var speed_component_number = block.getFieldValue('');
    var value_name = Blockly.JavaScript.valueToCode(block, '', Blockly.JavaScript.ORDER_ATOMIC);
    var code = '...';
    return [code, Blockly.JavaScript.ORDER_NONE];
  };