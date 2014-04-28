/* 2014@JoR
 * 
 * 
 */
var buttons;
var content;
// Samlar mina globaler här...

$('document').ready( main );

// EOF = End Of File, EOJ = End Of Javascript :-D
console.log( 'EOJ' );


function main(){
	content = $('.content');
	registerButtons();
}

function registerButtons(){
	msg( 'Registrerat knapparna' );
	buttons = $('button');
	for( b in buttons ){
		buttons[b].on( 'click', loadPage );
	}
}

function loadPage(  ){
	var title = $(this).text();
	content.append( title );
	msg( 'This'+title );
	
	return false;
}


function msg( txt ){
	$('#msg').html( txt );
}

function out( txt ){
	$('#msg').html( $('#msg').html() +'<br />'+ txt );
}

