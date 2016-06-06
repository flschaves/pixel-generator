jQuery( document ).ready( function() {
	
	var quality = 5;

	var image = jQuery( '#image' )[0];

	jQuery( '.scan' ).on( 'blabla', function( event, y, x ) {

		if ( ! image.canvas ) {
			image.canvas = jQuery( '<canvas />' )[0];
			image.canvas.width = image.width;
			image.canvas.height = image.height;
			image.canvas.getContext( '2d' ).drawImage(image, 0, 0, image.width, image.height);
		}
		
		var pixelData = image.canvas.getContext('2d').getImageData( x, y, quality, quality ).data;

		jQuery( '#output' ).html( 'R: ' + pixelData[0] + '<br>G: ' + pixelData[1] + '<br>B: ' + pixelData[2] + '<br>A: ' + pixelData[3] );
		jQuery( '#css' ).append( '.pixel { background-color: rgba( ' + pixelData[0] + ', ' + pixelData[1] + ', ' + pixelData[2] + ', ' + pixelData[3] + ' ); }' );
		jQuery( '#teste' ).append( '<div style="width: 5px; height: 5px; background-color: rgba( ' + pixelData[0] + ', ' + pixelData[1] + ', ' + pixelData[2] + ', ' + pixelData[3] + ' );"></div>' );

	});

	var pixelNumber = 0,
		scanLeft 	= 0,
		scanTop  	= 0,
		scan 		= jQuery( '.scan' );

	var scanning = setInterval( function(){
		pixelNumber++;
		if ( scan.offset().left >= image.width ) {
			scanTop += quality;
			scanLeft = 0;
		}
		scan.css({
			'top' : scanTop,
			'left': scanLeft += quality,
		});

		scan.trigger( 'blabla', [ scan.offset().top, scan.offset().left] );

		if ( scan.offset().top >= image.height ) {
			clearInterval( scanning );
		}
	}, 1000);

});
