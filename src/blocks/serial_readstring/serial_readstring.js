'use strict';
/* global Blockly, profiles, JST, RoboBlocks */
/* jshint sub:true */

/**
 * serial_readstring code generation
 * @return {String} Code generated with block parameters
 */

Blockly.Arduino.serial_readstring = function() {

	Blockly.Arduino.setups_['setup_serial'] = JST['serial_readstring_setups']({
		'bitrate': profiles.default.serial
	});
	var code = JST['serial_readstring']({});

	return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * serial_readstring block definition
 * @type {Object}
 */
Blockly.Blocks.serial_readstring = {
	category: RoboBlocks.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
	helpUrl: RoboBlocks.URL_SERIE,
	tags: ['serial'],

	 /**
	  * serial_readstring initialization
	  */
	init: function() {
		this.setColour(RoboBlocks.LANG_COLOUR_COMMUNICATION);
		this.appendDummyInput('')
			.appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_READSTRING'));
		this.setOutput(true, String);
		this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_READSTRING_TOOLTIP'));
	}
};
