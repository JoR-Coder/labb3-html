/* 2014@JoR
 * 
 * 
 */
var	content = $('.content');
var	buttons = $('.menu button');
// Samlar mina globaler här...

$('document').ready( main );

// EOF = End Of File, EOJ = End Of Javascript :-D
console.log( 'EOJ' );


function main(){
	
	registerButtons();
}

function registerButtons(){
	for( b in buttons ){
		buttons[b].on( "click", loadPage );
	}

	msg( 'Registrerat knapparna' );
}

function loadPage( e ){
	var title = $(this).text();

	content.append( title );
	msg( 'This '+e );
	
	return false;
}


function msg( txt ){
	$('#msg').html( txt );
}

function out( txt ){
	$('#msg').html( $('#msg').html() +'<br />'+ txt );
}

