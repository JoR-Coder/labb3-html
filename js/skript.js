/* 2014@JoR
 * 
 * 
 */

// Collecting  globals here...
var Articles =[];
var noArticle;

/* I find it more userfriendly for me as a developer to catch my errors on site.
 *  Note that any errors within any "anonymous functions" won't be caught :-/, so add
 *  try-catches in them to.
 *  Also do note that this does not work on ALL browsers. Notably IE :-(.
 */
$('document').ready( function(){
	try{
		main();
	} catch( e ){
		msg( "Document: "+getFirst(e["stack"])+" - "+e.message );
		return false;
	}
});

// EOF = End Of File, EOJ = End Of Javascript :-D
console.log( 'EOJ' );


function main(){
	// Well! Mein teacher wishes for a global noArticle object...
	noArticle = { title:"No article", author: " ", authorEmail: "", date: " ", text: "Please select an article from the left-hand menu." };
	
	// Reset content...
	clearScr();
	// Clear everything in menu...
	var menu = $(".menu");
	menu.text("");
	
	msg( "Loading content..." );

	$.getJSON( "articles/articles", function( data ) {
		Articles = data["articles"];
		// Let's insert the noArticle object here...
		Articles.unshift( noArticle );
		// Add the "No article"-button. 
	
		// Populate menu with article buttons...
		for( var i=0; i<Articles.length; i++){
			menu.append("<button>"+Articles[i]["title"]+"</button>");
		};

		// Now, make'em buttons active...
		var buttons = $(".menu button");
		
		buttons.on( "click", function(){
			var txt = $(this).text();
			var menuOption;

			for( var i=0; i<Articles.length; i++){
				if( Articles[i]["title"] === txt ){
					menuOption = i;
					break;
				}
			};
	
			// At this stage I should have the index for the article of interrest... Right?
			setArticle( Articles[menuOption] );
		});

	}).done(function() {
		msg( "Prepare for Chuck Norris..." );
		$.getJSON( "http://api.icndb.com/jokes/random", function( chucknorris ){
			if( chucknorris["type"] === "success" ){
				msg( chucknorris["value"]["joke"] );
			}else{
				msg( "Chuck Norris broke my json :-(" );
			}
		}).fail( function(){
			msg( "Chuck Norris broke my JSON :-(" );
		});

	}).fail(function() {
		out( "Failed to load content :-(" );

	});
 

	// Ps!
	// From this point of view... Articles variable is NOT YET populated.	
	
}


// Well! By clearScr, I mean reset, not clrscr.
function clearScr( ){
	// Clear the content...
	var content;
	
	content  = '<h2 id="title"> </h2>';
	content += '<p>Författare: <span id="author">  </span><br />';
	content += 'Datum :<span id="date"> </span></p>';
	content += '<p id="text"> </p>';

	$(".content").html(content);
	
	setArticle( noArticle );
}


// Make sure clearScr(...) is called AND set the noArticle object BEFORE you call for this.
function setArticle( article ){
	$("#title").text(  article["title"] );
	$("#author").html( '<a href="mailto://'+article["authorEmail"]+'">'+article["author"]+'</a>' );
	$("#date").text(   article["date"] );
	$("#text").html(   article["text"] );
}

function getFirst( strip ){
	var str= strip.substring(0, strip.indexOf('\n'));

	return str;
}

function msg( txt ){
	$("#msg").html( txt );
}

function out( txt ){
	$(".content").append( txt );
}
