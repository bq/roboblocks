'use strict';
/* global Blockly, JST, RoboBlocks */

/**
  * logic_negate code generation
  * @return {String} Code generated with block parameters
  */
Blockly.Arduino.logic_negate = function() {
    // Negation.
    var order = Blockly.Arduino.ORDER_NONE;
    var argument0 = Blockly.Arduino.valueToCode(this, 'BOOL', order) || '';
    var code ='';
    var a=RoboBlocks.findPinMode(argument0);
    code+=a['code'];
    argument0=a['pin'];

    code += JST ['logic_negate']({
        'argument0':argument0
    });

    //'!' + argument0;
    return [code, order];
};


Blockly.Blocks.logic_negate = {
    // Negation.
    category: RoboBlocks.locales.getKey('LANG_CATEGORY_LOGIC'),
    helpUrl: RoboBlocks.URL_LOGIC,
    init: function() {
        this.setColour(RoboBlocks.LANG_COLOUR_LOGIC);
        this.setOutput(true, Boolean);
        this.appendValueInput('BOOL')
            .setCheck(Boolean)
            .appendField(RoboBlocks.locales.getKey('LANG_LOGIC_NEGATE_INPUT_NOT'));
        this.setTooltip(RoboBlocks.locales.getKey('LANG_LOGIC_NEGATE_TOOLTIP'));
    }
};
