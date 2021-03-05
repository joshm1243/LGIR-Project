var customBlocks = {

  "pin_component" : {
    "type": "pin_component",
    "message0": "pin %1",
    "args0": [
      {
        "type": "field_number",
        "name": "COMPONENT_INSTANCE_SELECT",
        "value": 1,
        "min": 1,
        "max": 512
      }
    ],
    "inputsInline": true,
    "output": "component",
    "colour": 195,
    "tooltip": "",
    "helpUrl": ""
  },

  



  "input_component" : {
      "type": "input_component",
      "message0": "bucket %1",
      "args0": [
        {
          "type": "field_input",
          "name": "NAME",
        },
      ],
      "inputsInline": true,
      "output": "component",
      "colour": 195,
      "tooltip": "",
      "helpUrl": ""
  },




  "output_component" : {
      "type": "output_component",
      "message0": "%1",
      "args0": [
        {
          "type": "field_input",
          "name": "COMPONENT_INSTANCE_SELECT",
        }
      ],
      "inputsInline": true,
      "output": "component",
      "colour": 195,
      "tooltip": "",
      "helpUrl": ""
  },



  "set" : {
    "type": "set_component",
    "message0": "set %1 to %2",
    "args0": [
      {
        "type": "input_value",
        "name": "component_value",
        "check": "component"
      },
      {
        "type": "input_value",
        "name": "value",
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230
  },



  "value_of" : {
    "type": "value_of",
    "message0": "value of %1",
    "args0": [
      {
        "type" : "field_input",
        "name" : "VALUE",
      }
    ],
    "inputsInline": true,
    "output": null,
    "colour": 100,
    "tooltip": "",
    "helpUrl": ""
  },


  "bucket" : {
    "type": "bucket",
    "message0": "value of %1",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE",
      }
    ],
    "inputsInline": true,
    "output": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },



  "add" : {
    "type": "add",
    "message0": "add %1 to %2",
    "args0": [
      {
        "type": "input_value",
        "name": "COMPONENT",
        "check": "component"
      },
      {
        "type": "input_value",
        "name": "COMPONENT",
        "check": "component"
      },
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },

  "Speed" : {
    "type": "field_dropdown",
    "message0": "%1",
    "args0": [
        {
        "type": "speed_dropdown",
        "name": "SPEED_SELECT",
        "options": [
          [
            "Fast"
          ],
          [
            "Medium"
          ],
          [
            "Slow"
          ]
        ]
      }
    ],
    "inputsInline": true,
    "output": "speed",
    "colour": 180,
    "tooltip": "",
    "helpUrl": ""
  },

  "wait" : {
    "type": "wait",
    "message0": " wait %1",
    "args0": [
        {
        "type": "field_dropdown",
        "name": "WAIT_TIME",
        "options": [
          [
            "Half a second",
            "500"
          ],
          [
            "A second",
            "1000"
          ],
          [
            "Two seconds",
            "2000"
          ],
          [
            "Five seconds",
            "5000"
          ]
        ]
      }
    ],
    "inputsInline": true,
    "output": "waiting",
    "colour": 180,
    "tooltip": "",
    "helpUrl": ""
},

}