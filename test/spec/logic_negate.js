/* global describe, it, expect */
(function() {
    'use strict';

    var root = this;

    root.define([], function() {

        describe('In Roboblocks.Blocks.logic_negate block', function() {

            it('generates expected default Arduino code', function() {
                expect(true).to.equal(true);
                var bool = Blockly.Block.obtain(Blockly.mainWorkspace, 'logic_negate');

                assert.equal(Blockly.Arduino.workspaceToCode(), '/***   Global variables   ***/\n\n/***   Function declaration   ***/\n\nvoid setup()\n{\n\n}\n\n\nvoid loop()\n{\n  !;\n\n}\n\n/***   Function definition   ***/\n');
            });
        });
    });

}).call(this);
