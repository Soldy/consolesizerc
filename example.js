
const $sizerc = new (require('./index.js')).Base();
const $stdio = new (require('consolestdiorc')).base();

setInterval(()=>{}, 6000);
$sizerc.setup().set('minRows', 7);
$sizerc.setup().set('minColumns', 50);
$sizerc.add(
     function(){
         $stdio.printTo(
            '+--------------------------+\n'+
            '|                          |\n'+
            '|   ConsoleSizeRc Example  |\n'+
            '|                          |\n'+
            '+--------------------------+'
        );
    }
, 5);
