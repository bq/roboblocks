'use strict';
/* global Blockly, JST, RoboBlocks */
/**
 * procedures_defnoreturn code generation
 * @return {String} Code generated with block parameters
 */
// Defining a procedure without a return value uses the same generator as
// a procedure with a return value.
Blockly.Arduino.procedures_defnoreturn = function() {
    // Define a procedure with a return value.
    var funcName = this.getFieldValue('NAME');
    var branch = Blockly.Arduino.statementToCode(this, 'STACK');
    // branch = branch.replace(/&quot;/g, '"');
    if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
        branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + this.id + '\'') + branch;
    }

    var returnType = 'void';
    var args = this.paramString;
    if (args){
        args = args.split(', ');
        args.forEach(function(arg){
            arg = arg.split(' ');
            var varName = arg[1];
            var varType = arg[0];
            RoboBlocks.variables[varName] = [varType, 'local'];
        });
    }
    var code = JST['procedures_defnoreturn']({
        'returnType': returnType,
        'funcName': funcName,
        'args': args,
        'branch': branch
    });
    code = code.replace(/amp;/g, '');

    code = Blockly.Arduino.scrub_(this, code);
    Blockly.Arduino.definitions_[funcName] = code;
    return null;
};
Blockly.Blocks.procedures_defnoreturn = {
    // Define a procedure with no return value.
    category: RoboBlocks.locales.getKey('LANG_CATEGORY_PROCEDURES'),
    helpUrl: RoboBlocks.URL_PROC_NO_RET,
    init: function() {
        this.setColour(RoboBlocks.LANG_COLOUR_PROCEDURES);
        var name = Blockly.Procedures.findLegalName(RoboBlocks.locales.getKey('LANG_PROCEDURES_DEFNORETURN_PROCEDURE'), this);
        this.appendDummyInput().appendField(new Blockly.FieldTextInput(name, Blockly.Procedures.rename), 'NAME').appendField('', 'PARAMS');
        // this.appendDummyInput().appendField(new Blockly.FieldTextInput(name), 'NAME').appendField('', 'PARAMS');
        this.appendStatementInput('STACK').appendField(RoboBlocks.locales.getKey('LANG_PROCEDURES_DEFNORETURN_DO'));
        this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
        this.setTooltip(RoboBlocks.locales.getKey('LANG_PROCEDURES_DEFNORETURN_TOOLTIP'));
        this.arguments_ = [];
        this.type_arguments_ = [];
    },
    updateParams_: function() {
        // Check for duplicated arguments.
        var badArg = false;
        var hash = {};
        for (var x = 0; x < this.arguments_.length; x++) {
            if (hash['arg_' + this.arguments_[x].toLowerCase()]) {
                badArg = true;
                break;
            }
            hash['arg_' + this.arguments_[x].toLowerCase()] = true;
        }
        if (badArg) {
            try {
                this.setWarningText(RoboBlocks.locales.getKey('LANG_PROCEDURES_DEF_DUPLICATE_WARNING'));
            } catch (err) {
                console.log('Captured error: ', err);
            }
        } else {
            this.setWarningText(null);
        }
        // Merge the arguments into a human-readable list.
        var params = [];
        for (var i in this.arguments_) {
            params.push(this.type_arguments_[i] + ' ' + this.arguments_[i]);
        }
        this.paramString = params.join(', ');
        var args = this.paramString;
        if (args){
            args = args.split(', ');
            args.forEach(function(arg){
                arg = arg.split(' ');
                var varName = arg[1];
                var varType = arg[0];
                RoboBlocks.variables[varName] = [varType, 'local'];
            });
        }
        this.setFieldValue(this.paramString, 'PARAMS');
    },
    mutationToDom: function() {
        var container = document.createElement('mutation');
        for (var x = 0; x < this.arguments_.length; x++) {
            var parameter = document.createElement('arg_name');
            parameter.setAttribute('name', this.arguments_[x]);
            container.appendChild(parameter);
            parameter = document.createElement('arg_type');
            parameter.setAttribute('name', this.type_arguments_[x]);
            container.appendChild(parameter);
        }
        return container;
    },
    domToMutation: function(xmlElement) {
        this.arguments_ = [];
        this.type_arguments_ = [];
        var childNode;
        for (var x = 0; x < xmlElement.childNodes.length; x++) {
            childNode = xmlElement.childNodes[x];
            if (childNode.nodeName.toLowerCase() === 'arg_name') {
                this.arguments_.push(childNode.getAttribute('name'));
            }
            if (childNode.nodeName.toLowerCase() === 'arg_type') {
                this.type_arguments_.push(childNode.getAttribute('name'));
            }
        }
        this.updateParams_();
    },
    decompose: function(workspace) {
        var containerBlock = Blockly.Block.obtain(workspace, 'procedures_mutatorcontainer');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var x = 0; x < this.arguments_.length; x++) {
            var paramBlock = Blockly.Block.obtain(workspace, 'procedures_mutatorarg');
            paramBlock.initSvg();
            paramBlock.setFieldValue(this.type_arguments_[x], 'TYPE');
            paramBlock.setFieldValue(this.arguments_[x], 'NAME');
            // Store the old location.
            paramBlock.oldLocation = x;
            connection.connect(paramBlock.previousConnection);
            connection = paramBlock.nextConnection;
        }
        // Initialize procedure's callers with blank IDs.
        Blockly.Procedures.mutateCallers(this.getFieldValue('NAME'), this.workspace, this.arguments_, null);
        Blockly.Procedures.mutateCallers(this.getFieldValue('TYPE'), this.workspace, this.type_arguments_, null);
        return containerBlock;
    },
    compose: function(containerBlock) {
        this.arguments_ = [];
        this.paramIds_ = [];
        this.type_arguments_ = [];
        var paramBlock = containerBlock.getInputTargetBlock('STACK');
        var varName;
        while (paramBlock) {
            varName = paramBlock.getFieldValue('NAME');
            this.type_arguments_.push(paramBlock.getFieldValue('TYPE'));
            this.arguments_.push(varName);
            this.paramIds_.push(paramBlock.id);
            paramBlock = paramBlock.nextConnection && paramBlock.nextConnection.targetBlock();
        }
        this.updateParams_();
        Blockly.Procedures.mutateCallers(this.getFieldValue('NAME'), this.workspace, this.arguments_, this.paramIds_);
    },
    dispose: function() {
        var name = this.getFieldValue('NAME');
        var editable = this.editable;
        var workspace = this.workspace;
        // Call parent's destructor.
        Blockly.Block.prototype.dispose.apply(this, arguments);
        if (editable) {
            // Dispose of any callers.
            Blockly.Procedures.disposeCallers(name, workspace);
        }
    },
    getProcedureDef: function() {
        // Return the name of the defined procedure,
        // a list of all its arguments,
        // and that it DOES NOT have a return value.
        return [this.getFieldValue('NAME'), this.arguments_, false];
    },
    getVars: function() {
        return this.arguments_;
    },
    renameVar: function(oldName, newName) {
        var change = false;
        for (var x = 0; x < this.arguments_.length; x++) {
            if (Blockly.Names.equals(oldName, this.arguments_[x])) {
                newName = this.validName(newName);
                this.arguments_[x] = newName;
                change = true;
            }
        }
        if (change) {
            this.updateParams_();
            // Update the mutator's variables if the mutator is open.
            if (this.mutator.isVisible_()) {
                var blocks = this.mutator.workspace_.getAllBlocks();
                var block;
                for (x = 0; blocks.length; x++) {
                    block = blocks[x];
                    if (block.type === 'procedures_mutatorarg' && Blockly.Names.equals(oldName, block.getFieldValue('NAME'))) {
                        block.setFieldValue(newName, 'NAME');
                    }
                }
            }
        }
    },
    validName: function(name) {
        if (name && name.length > 0) {
            var i = 0;
            while (i < name.length) {
                if (!isNaN(parseFloat(name[i]))) {
                    name = name.substring(1, name.length);
                } else {
                    break;
                }
            }
            name = name.replace(/([ ])/g, '_');
            name = name.replace(/([áàâä])/g, 'a');
            name = name.replace(/([éèêë])/g, 'e');
            name = name.replace(/([íìîï])/g, 'i');
            name = name.replace(/([óòôö])/g, 'o');
            name = name.replace(/([úùûü])/g, 'u');
            name = name.replace(/([ñ])/g, 'n');
            name = name.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|<>\-\&\Ç\%\=\~\{\}\¿\¡\"\@\:\;\-\"\·\|\º\ª\¨\'\·\̣\─\ç\`\´\¨\^])/g, '');
            i = 0;
            while (i < name.length) {
                if (!isNaN(parseFloat(name[i]))) {
                    name = name.substring(1, name.length);
                } else {
                    break;
                }
            }
            for (var j in Blockly.Arduino.RESERVED_WORDS_) {
                this.reserved_words = Blockly.Arduino.RESERVED_WORDS_.split(',');
                if (name === this.reserved_words[j]) {
                    this.setWarningText(RoboBlocks.locales.getKey('LANG_RESERVED_WORDS'));
                    name = '';
                    break;
                } else {
                    this.setWarningText(null);
                }
            }
        }
        return name;
    },
    onchange: function() {
        if (this.last_procedure !== this.getFieldValue('NAME')) {
            var name = this.getFieldValue('NAME');
            name = this.validName(name);
            try {
                this.setFieldValue(name, 'NAME');
            } catch (e) {}
            this.last_procedure = name;
        }
    }
};
Blockly.Blocks.procedures_mutatorcontainer = {
    // Procedure container (for mutator dialog).
    init: function() {
        this.setColour(RoboBlocks.LANG_COLOUR_PROCEDURES);
        this.appendDummyInput().appendField(RoboBlocks.locales.getKey('LANG_PROCEDURES_MUTATORCONTAINER_Field'));
        this.appendStatementInput('STACK');
        this.setTooltip('');
        this.contextMenu = false;
    }
};
Blockly.Blocks.procedures_mutatorarg = {
    // Procedure argument (for mutator dialog).
    init: function() {
        this.setColour(RoboBlocks.LANG_COLOUR_PROCEDURES);
        this.appendDummyInput().appendField(RoboBlocks.locales.getKey('LANG_PROCEDURES_MUTATORARG_Field')).appendField(new Blockly.FieldDropdown([
            ['int', 'int'],
            ['String', 'String']
        ]), 'TYPE').appendField(new Blockly.FieldTextInput('x', Blockly.Blocks.procedures_mutatorarg.validator), 'NAME');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
        this.contextMenu = false;
    },
    onchange: function() {
        if (this.last_variable !== this.getFieldValue('NAME')) {
            var name = this.getFieldValue('NAME');
            name = this.validName(name);
            try {
                this.setFieldValue(name, 'NAME');
            } catch (e) {}
            this.last_variable = name;
        }
    },
    validName: Blockly.Blocks.procedures_defnoreturn.validName
};
Blockly.Blocks.procedures_mutatorarg.validator = function(newVar) {
    // Merge runs of whitespace.  Strip leading and trailing whitespace.
    // Beyond this, all names are legal.
    newVar = newVar.replace(/[\s\xa0]+/g, ' ').replace(/^ | $/g, '');
    return newVar || null;
};