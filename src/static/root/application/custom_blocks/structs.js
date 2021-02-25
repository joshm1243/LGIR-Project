var customBlocks = {
  "input_component" : {
      "type": "input_component",
      "message0": "%1 %2",
      "args0": [
          {
          "type": "field_dropdown",
          "name": "COMPONENT_TYPE_SELECT",
          "options": [
            [
              "pin",
              "COMPONENT_PIN"
            ],
            [
              "sensor",
              "COMPONENT_LED"
            ],
            [
              "potentiometer",
              "COMPONENT_LCD"
            ],
            [
              "switch",
              "COMPONENT_BUZZER"
            ],
          ]
        },
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
  


  "output_component" : {
      "type": "output_component",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "COMPONENT_TYPE_SELECT",
          "options": [
            [
              "pin",
              "COMPONENT_PIN"
            ],
            [
              "led",
              "COMPONENT_LED"
            ],
            [
              "lcd",
              "COMPONENT_LCD"
            ],
            [
              "buzzer",
              "COMPONENT_BUZZER"
            ],
            [
              "laser",
              "COMPONENT_LASER"
            ],
            [
              "relay",
              "COMPONENT_RELAY"
            ]
          ]
        },
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



  "set" : {
      "type": "set_component",
      "message0": "set %1 to %2",
      "args0": [
        {
          "type": "input_value",
          "name": "COMPONENT",
          "check": "component"
        },
        {
          "type": "input_value",
          "name": "VALUE",
          "check": "component_value"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": 230,
      "tooltip": "",
      "helpUrl": ""
  },


  
  "get" : {
    "type": "get",
    "message0": "value from %1",
    "args0": [
      {
        "type": "input_value",
        "name": "NAME"
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
  }



}