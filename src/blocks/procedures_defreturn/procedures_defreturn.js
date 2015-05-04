'use strict';
/* global Blockly, JST, RoboBlocks */
/**
 * procedures_defreturn code generation
 * @return {String} Code generated with block parameters
 */
Blockly.Arduino.procedures_defreturn = function() {
    // Define a procedure with a return value.
    var funcName = this.getFieldValue('NAME');
    var branch = Blockly.Arduino.statementToCode(this, 'STACK');
    // branch = branch.replace(/&quot;/g, '"');

    if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
        branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + this.id + '\'') + branch;
    }
    var returnValue = Blockly.Arduino.valueToCode(this, 'RETURN', Blockly.Arduino.ORDER_NONE) || '';
    var code = '';

    // returnValue = returnValue.replace(/&quot;/g, '"');
    var returnType = this.getReturnType();
    if (returnValue) {
        var a=RoboBlocks.findPinMode(returnValue);
        returnValue=a['code'];
        returnValue += '  return ' + a['pin'] + ';\n';
    }
    var args = this.paramString;
    code += JST['procedures_defreturn']({
        'returnType': returnType,
        'funcName': funcName,
        'args': args,
        'branch': branch,
        'returnValue': returnValue
    });
    // code=code.replace(/&amp;/g, '');

    code = Blockly.Arduino.scrub_(this, code);
    Blockly.Arduino.definitions_[funcName] = code;
    return null;
};
Blockly.Blocks.procedures_defreturn = {
    // Define a procedure with a return value.
    category: RoboBlocks.locales.getKey('LANG_CATEGORY_PROCEDURES'), // Procedures are handled specially.
    helpUrl: RoboBlocks.URL_PROC,
    init: function() {
        this.setColour(RoboBlocks.LANG_COLOUR_PROCEDURES);
        var name = Blockly.Procedures.findLegalName(RoboBlocks.locales.getKey('LANG_PROCEDURES_DEFRETURN_PROCEDURE'), this);
        this.appendDummyInput().appendField(new Blockly.FieldTextInput(name, Blockly.Procedures.rename), 'NAME').appendField('', 'PARAMS');
        this.appendStatementInput('STACK').appendField(RoboBlocks.locales.getKey('LANG_PROCEDURES_DEFRETURN_DO'));
        this.appendValueInput('RETURN').setAlign(Blockly.ALIGN_RIGHT).appendField(RoboBlocks.locales.getKey('LANG_PROCEDURES_DEFRETURN_RETURN'));
        this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
        this.setTooltip(RoboBlocks.locales.getKey('LANG_PROCEDURES_DEFRETURN_TOOLTIP'));
        this.arguments_ = [];
    },
    isVariable: function(varValue) {
        for (var i in Blockly.Variables.allVariables()) {
            if (Blockly.Variables.allVariables()[i] === varValue) {
                return true;
            }
        }
        return false;
    },
    getReturnType: function() {
        var returnType;
        var returnValue = Blockly.Arduino.valueToCode(this, 'RETURN', Blockly.Arduino.ORDER_NONE) || '';
        var a=RoboBlocks.findPinMode(returnValue);
        // code+=a['code'];
        returnValue=a['pin'];

        var isFunction=false;

        for (var i in Blockly.Arduino.definitions_) {
            if (Blockly.Arduino.definitions_[i].search(returnValue+ ' \\(') >= 0) {
                isFunction = true;
                break;
            }
        }
        if (!returnValue) {
            returnType = 'void';
        }
        if (returnValue.search('"') >= 0) {
            returnType = 'String';
        } else if (isFunction){//returnValue.search('\\(') >= 0 && returnValue.search('\\)') >= 0) {
            for (i in Blockly.Arduino.definitions_) {
                if (Blockly.Arduino.definitions_[i].search(returnValue) >= 0) {
                    if (Blockly.Arduino.definitions_[i].substring(0, 3) === 'int'|| Blockly.Arduino.definitions_[i].substring(0, 3) === '//b') { //bqbat function
                        if (Blockly.Arduino.definitions_[i].substring(0, 5) === 'int *'|| Blockly.Arduino.definitions_[i].substring(0, 5) === 'int _') {
                            returnType = 'int *';
                        } else {
                            returnType = 'int';
                        }
                    } else if (Blockly.Arduino.definitions_[i].substring(0, 3) === 'Str') {
                        returnType = 'String';
                    } else {
                        returnType = '';
                    }
                }
            }
        } else if (this.isVariable(returnValue)) {
            returnType = RoboBlocks.variables[returnValue][0];
        } else if ((returnValue.search('analogRead') >= 0) || (returnValue.search('digitalRead') >= 0) || (returnValue.search('Distanc') >= 0) || (!isNaN(parseFloat(returnValue)) || (returnValue.search('random') >= 0)) || (returnValue.search('map') >= 0) || returnValue.search('\\[') >= 0 || (returnValue.search('abs') >= 0) || (returnValue.search('sqrt') >= 0) || (returnValue.search('log') >= 0) || (returnValue.search('log') >= 0) || (returnValue.search('exp') >= 0) || (returnValue.search('pow') >= 0)) {
            returnType = 'int';
        } else if (returnValue.search('readJoystick') >= 0 || returnValue[0] === '{') {
            returnType = 'int *';
        } else {
            returnType = 'void';
        }
        return returnType;
    },
    updateParams_: Blockly.Blocks.procedures_defnoreturn.updateParams_,
    decompose: Blockly.Blocks.procedures_defnoreturn.decompose,
    compose: Blockly.Blocks.procedures_defnoreturn.compose,
    dispose: Blockly.Blocks.procedures_defnoreturn.dispose,
    getProcedureDef: function() {
        // Return the name of the defined procedure,
        // a list of all its arguments,
        // and that it DOES have a return value.
        return [this.getFieldValue('NAME'), this.arguments_, true];
    },
    getVars: Blockly.Blocks.procedures_defnoreturn.getVars,
    renameVar: Blockly.Blocks.procedures_defnoreturn.renameVar,
    mutationToDom: Blockly.Blocks.procedures_defnoreturn.mutationToDom,
    domToMutation: Blockly.Blocks.procedures_defnoreturn.domToMutation,
    validName: Blockly.Blocks.procedures_defnoreturn.validName,
    onchange: Blockly.Blocks.procedures_defnoreturn.onchange
};