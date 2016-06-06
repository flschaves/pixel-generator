;(function ( window, document, undefined ){

    'use strict';

    // Vars
    var quality = 4, x = 0, y = 0,

        // DOM
        image = document.querySelector( '[data-js="image"]' ),
        output = document.querySelector( '[data-js="output-draw"]' ),
        outputCode = document.querySelector( '[data-js="output-code"]' );

    image.canvas = document.createElement( 'canvas' );
    image.canvas.width = image.width;
    image.canvas.height = image.height;
    image.canvas.getContext( '2d' ).drawImage( image, 0, 0, image.width, image.height );

    var shadow = [];
    while ( true ) {

        if ( x >= image.width ) {
            y += quality;
            x = 0;
        }

        if ( y > image.height ) {
            break;
        }

        x += quality;

        var data = image.canvas.getContext('2d').getImageData( x, y, quality, quality ).data;

        if ( data[ 0 ] + data[ 1 ] + data[ 2 ] + data[ 3 ] == 0 ) {
            continue;
        }

        var r = toHex( data[ 0 ] );
        var g = toHex( data[ 1 ] );
        var b = toHex( data[ 2 ] );

        shadow.push( x + 'px ' + y +  'px #' + r + g + b );
    }

    shadow = shadow.join( ', ' );

    outputCode.value = '.draw { box-shadow: ' + shadow + '; width: ' + quality + 'px; height: ' + quality + 'px; } ';

    output.style.boxShadow = shadow;
    output.style.height = quality + 'px';
    output.style.width = quality + 'px';

    function toHex( num ) {
        var h = Math.round( num ).toString( 16 );
        return h.length == 0 ? '00' : h.length == 1 ? '0' + h : h;
    }
    
}( window, window.document ));