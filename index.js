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
        return _levels.add(func, level, name);
    };
    /*
     * @param {integer}
     * @param {string}
     * @public
     * @return {boolean}
     */
    this.del = function(level, name){
        return _levels.del(level, name);
    };
    this.setup = function(){
        return _setup;
    }
    /*
     * @public
     * @return {boolean}
     */
    this.status = function(){
        return {
            'turns' : _turns,
            'last' : _last

        };
    };
    /*
     * @private
     * @var {setuprc}
     */
    const _setup = new $setuprc({
        'minRows':{
            'type'    : 'int',
            'default' : 20
        },
        'minColumns':{
            'type'    : 'int',
            'default' : 100
        },
        'delay':{
            'type'    : 'int',
            'default' : 500
        },
        'loopTime':{
            'type'    : 'int',
            'default' : 1000
        },
    });
    /*
     * @private
     * @var {integer}
     */
    let _columns = 0;
    /*
     * @private
     * @var {integer}
     */
    let _rows = 0;
    /*
     * @private 
     * @var {boolean}
     */
    let _changing = false;
    /*
     * @private
     * @var {boolean}
     */
    let _delayed = false;
    /*
     * @private 
     * @var {integer}
     */
    let _turns = 0;
    /*
     * @private 
     * @var {integer}
     */
    let _last = 0;
    /*
     * @private 
     */
    const _loop = async function(){
        if (await _check())
            await _change();
        setTimeout(
            _loop,
            _setup.get('loopTime')
        );
    }
    /*
     * @private
     * @return {boolean}
     */
    const _check = async function(){
        const columns = process.stdout.columns;
        const rows = process.stdout.rows;
        _last = Date.now();
        if(
            (_columns === columns) &&
            (_rows === rows)
        )
            return false;
        _turns++ ; 
        _columns = columns;
        _rows = rows;
        if(_toSmall())
            return false;
        return true;
    };
    /*
     * @private
     * @return {boolean}
     */
    const _toSmall = function(){
        if(
            (_columns > _setup.get('minColumns')) ||
            (_rows > _setup.get('minRows')) 
        )
            return false;
        $stdio.clear();
        $stdio.printTo('<+>', 0, 0);
        return true;
    };
    /*
     * @private
     * @return {boolean}
     */
    const _change = async function(){
        if ( _changing ) {
            _delayed = true;
            setTimeout(
                _change,
                _setup.get('delay')
            );
            return false;
        }
        $stdio.clear();
        _changing = true;
        _delayed = false;
        await _levels.run();
        _changing = false;
        return true;
    };
    /*
     * @private
     */
    const _levels = new $levelRunner();
    // constructor
    _loop();
};


exports.Base = sizeBase;
exports.base = sizeBase; // compatibility

