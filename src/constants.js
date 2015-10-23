'use strict';
/* global RoboBlocks, Blockly*/
RoboBlocks.locales.initialize();
RoboBlocks.variables = {};
RoboBlocks.isVariable = function(varValue) {
    for (var i in Blockly.Variables.allVariables()) {
        if (Blockly.Variables.allVariables()[i] === varValue) {
            return true;
        }
    }
    if (RoboBlocks.variables[varValue]!==undefined){
        return true;
    }
    if (varValue.search('digitalRead\\(')>=0|| varValue.search('analogRead\\(')>=0){
        return true;
    }
    return false;
};

RoboBlocks.findPinMode=function(dropdown_pin){
    var code='';
    dropdown_pin = dropdown_pin.split(';\n');
    for (var j in dropdown_pin) {
        if (dropdown_pin[j].search('pinMode') >= 0) {
            code += dropdown_pin[j] + ';\n';
        } else {
            dropdown_pin = dropdown_pin[j];
        }
    }
    return {'code':code, 'pin':dropdown_pin};
};

// help URLs
RoboBlocks.GITHUB_SRC_URL = 'https://github.com/bq/roboblocks/tree/master/src/';
RoboBlocks.URL_LED='http://diwo.bq.com/programando-un-led-en-bitbloq-i/';
RoboBlocks.URL_LDR='http://diwo.bq.com/el-sensor-de-luz/';
RoboBlocks.URL_BUTTON='http://diwo.bq.com/programando-el-pulsador-en-bitbloq/';
RoboBlocks.URL_BUZZER='http://diwo.bq.com/programando-el-zumbador-en-bitbloq/';
RoboBlocks.URL_POTENTIOMETER='http://diwo.bq.com/programando-un-potenciometro-en-bitbloq/';
RoboBlocks.URL_IR='http://diwo.bq.com/programando-un-sensor-infrarrojo-en-bitbloq/';
RoboBlocks.URL_CONTINUOUS_ROTATION_SERVO='http://diwo.bq.com/programando-un-servo-en-bitbloq/';
RoboBlocks.URL_SERVO='http://diwo.bq.com/programando-un-miniservo-en-bitbloq/';
RoboBlocks.URL_LCD='http://diwo.bq.com/programando-una-pantalla-lcd-en-bitbloq/';
RoboBlocks.URL_US='http://diwo.bq.com/programando-el-sensor-ultrasonido-en-bitbloq/';
RoboBlocks.URL_BUTTONS='http://diwo.bq.com/programando-la-botonera-en-bitbloq/';
RoboBlocks.URL_JOYSTICK='http://diwo.bq.com/programando-un-joystick-con-bitbloq/';
RoboBlocks.URL_SERIE='http://diwo.bq.com/comunicacion-puerto-serie-en-windows-7/';
RoboBlocks.URL_IF='http://diwo.bq.com/programando-los-bloques-de-control-el-bloque-si-ejecutar/';
RoboBlocks.URL_SWITCH='http://diwo.bq.com/programando-los-bloques-de-control-el-bloque-si-switch-case/';
RoboBlocks.URL_WHILE='http://diwo.bq.com/programando-los-bloques-de-control-el-bloque-mientras/';
RoboBlocks.URL_DOWHILE='https://en.wikipedia.org/wiki/Do_while_loop';
RoboBlocks.URL_FOR='http://diwo.bq.com/programando-los-bloques-de-control-el-bloque-contar/';
RoboBlocks.URL_FLOW_STATEMENTS='http://diwo.bq.com/programando-los-bloques-de-control-interrumpir/';
RoboBlocks.URL_LOGIC='http://diwo.bq.com/programando-los-bloques-logicos/';
RoboBlocks.URL_MATH='http://diwo.bq.com/programando-los-bloques-matematicos/';
RoboBlocks.URL_TEXT='http://diwo.bq.com/programando-los-bloques-de-texto/';
RoboBlocks.URL_BT='http://diwo.bq.com/ejemplo-en-bitbloq-de-comunicacion-bluetooth/';
RoboBlocks.URL_VAR= 'http://diwo.bq.com/programando-con-variables-en-bitbloq/';
RoboBlocks.URL_PROC_NO_RET='http://diwo.bq.com/programando-con-funciones-en-bitbloq/';
RoboBlocks.URL_PROC='http://diwo.bq.com/programando-con-funciones-en-bitbloq-2/';
RoboBlocks.URL_PIN_FUNC='http://diwo.bq.com/programando-los-bloques-funciones-pin';

// RGB block colors
RoboBlocks.LANG_COLOUR_BQ = '#D04141';
RoboBlocks.LANG_COLOUR_ZUM = '#CC7B44';
RoboBlocks.LANG_COLOUR_SERVO = '#CECE42';
RoboBlocks.LANG_COLOUR_LCD = '#ACCE42';
RoboBlocks.LANG_COLOUR_CONTROL = '#44CC44';
RoboBlocks.LANG_COLOUR_LOGIC = '#42CE91';
RoboBlocks.LANG_COLOUR_MATH = '#42CBCE';
RoboBlocks.LANG_COLOUR_TEXT = '#42A3CE';
RoboBlocks.LANG_COLOUR_COMMUNICATION = '#4263CE';
RoboBlocks.LANG_COLOUR_ADVANCED = '#9142CE';
RoboBlocks.LANG_COLOUR_VARIABLES = '#B244CC';
RoboBlocks.LANG_COLOUR_PROCEDURES = '#CE42B3';
RoboBlocks.setColors = function(colorArray) {
    RoboBlocks.LANG_COLOUR_BQ = colorArray[0];
    RoboBlocks.LANG_COLOUR_ZUM = colorArray[1];
    RoboBlocks.LANG_COLOUR_SERVO = colorArray[2];
    RoboBlocks.LANG_COLOUR_LCD = colorArray[3];
    RoboBlocks.LANG_COLOUR_CONTROL = colorArray[4];
    RoboBlocks.LANG_COLOUR_LOGIC = colorArray[5];
    RoboBlocks.LANG_COLOUR_MATH = colorArray[6];
    RoboBlocks.LANG_COLOUR_TEXT = colorArray[7];
    RoboBlocks.LANG_COLOUR_COMMUNICATION = colorArray[8];
    RoboBlocks.LANG_COLOUR_ADVANCED = colorArray[9];
    RoboBlocks.LANG_COLOUR_VARIABLES = colorArray[10];
    RoboBlocks.LANG_COLOUR_PROCEDURES = colorArray[11];
};
