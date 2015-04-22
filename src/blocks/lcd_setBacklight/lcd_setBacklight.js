'use strict';
/* global Blockly, JST, RoboBlocks */
/* jshint sub:true */

/**
 * lcd_setBacklight code generation
 * @return {String} Code generated with block parameters
 */

Blockly.Arduino.lcd_setBacklight = function() {
    var state=this.getFieldValue('STATE');
    var code = JST ['lcd_setBacklight']({
        'state': state
    });
    return code;
};

/**
 * lcd_setBacklight block definition
 * @type {Object}
 */
Blockly.Blocks.lcd_setBacklight = {
    category: RoboBlocks.locales.getKey('LANG_CATEGORY_LCD'),
    helpUrl: RoboBlocks.URL_LCD,
    tags: ['lcd'],
    /**
	  * lcd_slave initialization
	  */
    init: function() {
        this.setColour(RoboBlocks.LANG_COLOUR_LCD);
        this.appendDummyInput()
            .appendField(RoboBlocks.locales.getKey('LANG_LCD_SETBACKLIGHT'))
            .appendField(new Blockly.FieldDropdown([[RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE_HIGH') || 'HIGH', 'HIGH'],
            [RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE_LOW') || 'LOW', 'LOW']]),'STATE')

            
            .appendField(RoboBlocks.locales.getKey('LANG_LCD_SETBACKLIGHT_CLOSE'));
            // .appendField(new Blockly.FieldImage('img/blocks/bqmod03.png', 208 * options.zoom, 100 * options.zoom));


        this.setInputsInline(false);

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(RoboBlocks.locales.getKey('LANG_LCD_SETBACKLIGHT_TOOLTIP'));
    }
};
