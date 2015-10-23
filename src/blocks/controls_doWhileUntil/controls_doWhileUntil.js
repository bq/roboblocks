'use strict';
/* global Blockly, JST, RoboBlocks */
/* jshint sub:true */
/**
 * controls_doWhileUntil code generation
 * @return {String} Code generated with block parameters
 */

Blockly.Arduino.controls_doWhileUntil = function() {
    // Do loop while/until.
    var argument0 = Blockly.Arduino.valueToCode(this, 'BOOL', Blockly.Arduino.ORDER_NONE) || '';
    argument0 = argument0.replace(/&quot;/g, '"');
    var branch = Blockly.Arduino.statementToCode(this, 'DO');
    branch = branch.replace(/&quot;/g, '"');

    var code = '';
    var a=RoboBlocks.findPinMode(argument0);
    code+=a['code'];
    argument0=a['pin'];

    if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
        branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + this.id + '\'') + branch;
        // branch = branch.substring(0, branch.length - 2);
    }
    // branch=branch.replace(/&amp;/g, '');

    if (this.getFieldValue('MODE') === 'UNTIL') {
        if (!argument0.match(/^\w+$/)) {
            argument0 = '(' + argument0 + ')';
        }
        argument0 = '!' + argument0;
    }
    code += JST['controls_doWhileUntil']({
        'argument0': argument0,
        'branch': branch
    });
    return code;
};
Blockly.Blocks.controls_doWhileUntil = {
    // Do loop while/until.
    category: RoboBlocks.locales.getKey('LANG_CATEGORY_CONTROLS'),
    helpUrl: RoboBlocks.URL_DOWHILE,
    init: function() {
        this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
        this.appendStatementInput('DO').appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_DOWHILEUNTIL_INPUT_DO'));
        this.appendValueInput('BOOL').setCheck(Boolean).appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_DOWHILEUNTIL_TITLE_REPEAT')).appendField(new Blockly.FieldDropdown([
            [RoboBlocks.locales.getKey('LANG_CONTROLS_DOWHILEUNTIL_OPERATOR_WHILE'), 'WHILE'],
            [RoboBlocks.locales.getKey('LANG_CONTROLS_DOWHILEUNTIL_OPERATOR_UNTIL'), 'UNTIL']
        ]), 'MODE');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function() {
            var op = thisBlock.getFieldValue('MODE');
            return Blockly.Blocks.controls_doWhileUntil.TOOLTIPS[op];
        });
    }
};
Blockly.Blocks.controls_doWhileUntil.TOOLTIPS = {
    WHILE: RoboBlocks.locales.getKey('LANG_CONTROLS_DOWHILEUNTIL_TOOLTIP_WHILE'),
    UNTIL: RoboBlocks.locales.getKey('LANG_CONTROLS_DOWHILEUNTIL_TOOLTIP_UNTIL')
};
