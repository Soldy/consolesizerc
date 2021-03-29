/*
 *  @Soldy\consolesizerc\2021.01.21\GPL3
 */
'use strict';
const $levelRunner = (require('levelrunnerrc')).Base;
const $setuprc = (require('setuprc')).base;
const $stdio = new (require('consolestdiorc')).base();

/*
 * @prototype
 */
const sizeBase=function(){
    const _setup = new $setuprc(
        'miniRows':{
            'type'    : 'int',
            'default' : 20
        },
        'minColumns':{
            'type'    : 'int',
            'default' : 190
        },
        'delay':{
            'type'    : 'intl',
            'default' : 500
        },
        'check':{
            'type'    : 'int',
            'default' : 2000
        },
    );
    let _columns = parseInt(
        process.stdout.columns
    );
    let _rows = parseInt(
        process.stdout.rowss
    );
    let _changing = false;
    let _delayed = false;
    const _check = function(){
        setTimeout(
            _check,
            _setup.get('check')
        );
        if (
            ( _columns === process.stdout.columns ) &&
            ( _rows === process.stdout.rows )
        )
            return false;
        if(
        
        )
    }
    const _toSmall = function(){
        
    }
    const _change = function(){
        if (
            (_changing) &&
            (_delayed === false)
        ){
            _delayed = true;
            setTimeout(
                _change,
                _setup.get('delay')
            );
            return false;
        }
        _levels.run();
        return true;
    }
    /*
     * @private
     */
    const _levels = new $levelRunner(
        function(){
            _changing = true;
            _delayed = false;
            _columns = parseInt(
                process.stdout.columns
            );
            _rows = parseInt(
                 process.stdout.rowss
            );
        },
        function(){
            _changing = false;
        }
    );
};


exports.Base = initBase;
exports.base = initBase; // compatibility
exports.init = initBase; // coompatibility

