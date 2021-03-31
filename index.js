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
    /*
     * @param {function}
     * @param {integer}
     * @param {string}
     * @public
     * @return {boolean}
     */
    this.add = function(func, level, name){
        return _levels.add( func, level, name );
    }
    /*
     * @param {integer}
     * @param {string}
     * @public
     * @return {boolean}
     */
    this.del = function(level, name){
        return _levels.add( level, name );
    }
    /*
     * @private
     * @var {setuprc}
     */
    const _setup = new $setuprc(
        'minRows':{
            'type'    : 'int',
            'default' : 20
        },
        'minColumns':{
            'type'    : 'int',
            'default' : 190
        },
        'delay':{
            'type'    : 'int',
            'default' : 500
        },
        'check':{
            'type'    : 'int',
            'default' : 2000
        },
    );
    /*
     * @private {integer}
     */
    let _columns = 0
    /*
     * @private {integer}
     */
    let _rows = 0
    /*
     * @private {boolean}
     */
    let _changing = false;
    /*
     * @private {boolean}
     */
    let _delayed = false;
    /*
     * @private
     * @return {boolean}
     */
    const _check = function(){
        const columns = process.stdout.columns;
        const rows = process.stdout.rows;
        setTimeout(
            _check,
            _setup.get('check')
        );
        if (
            ( _columns === columns ) &&
            ( _rows === rows )
        )
            return false;
        _columns = columns;
        _rows = rows;
        if( _toSmall() )
            return false;
        change();
        return true;
    }
    /*
     * @private
     * @return {boolean}
     */
    const _toSmall = function(){
        if(
            (_columns > _setup.get('minCoolumns')) ||
            (_rows > _setup.get('minRows')) 
        )
           return false;
        $stdio.clear();
        $stdio.printTo('<+>', 1,1 );
        return true;
    }
    /*
     * @private
     * @return {boolean}
     */
    const _change = function(){
        if ( _changing ) {
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
        },
        function(){
            _changing = false;
        }
    );
    // constructor
    _check();
};


exports.Base = sizeBase;
exports.base = sizeBase; // compatibility

