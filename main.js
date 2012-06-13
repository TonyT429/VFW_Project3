// VFW 1206 Project 3
// Anthony Torrez
//

// Wait until the DOM is ready.

window.addEventListener("DOMContentLoaded", function() { 
// alert (localStorage.value(0));


    // getElementById Function
    
    function $(x) {
        var ElementX = document.getElementById(x);
        return ElementX;
    }
    
    // Create the element for the select field and fill with options
    
     function makeCats( ) {
//	console.log("Testing");
        var genreTypes = [ "-- Choose a Genre or Subject --", "Art & Photography", "Biographies & Memoirs", "Children's Books", "Computers & Technolory", "Cookbooks, Food & Wine", "Crafts, Hobbies, and Home", "Education & Reference", "Health, Fitness & Dieting", "History", "Horror", "Humor", "Law","Literature & Fiction", "Manga & Graphic Novels", "Math & Science", "Medical", "Mystery, Crime, Thriller & Suspense", "Parenting & Relationships", "Religion & Spirituality", "Romance", "Sci Fi & Fantasy", "Self Help", "Sports & Outdoors", "Teens", "Travel", "Western"];
        var formTag = document.getElementsByTagName( "form" ),
            selectLi = $( 'subject' ),
            makeSelect = document.createElement( 'select' );
            makeSelect.setAttribute( 'id', 'genre' );
        for (var i=0, j=genreTypes.length; i<j; i++) {
            var makeOption = document.createElement( 'option' );
            var optText = genreTypes[ i ];
            makeOption.setAttribute( 'value', optText );
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption );
        }
        console.log($('genre'));
        selectLi.appendChild( makeSelect );
    }
    
     makeCats( );

    // Get value of selected Radio Button
    
    function getSelectedRadio( ) {
	console.log("working");
        var rbuttons = document.forms[0].isaseries;
	   console.log(rbuttons);
        for ( var i=0; i < rbuttons.length; i++ ) {
            if ( rbuttons[ i ].checked) {
                isaseries = rbuttons[ i ].value;
            }
        }
    }
    
    function toggleControls( n ) {
        switch( n ) {
            case "on":
                $( 'genreForm').style.display = "none";
                $( 'clearLink' ).style.display = "inline";
                $( 'displayLink' ).style.display = "none";
//                $( 'addNew').style.display = "inline";
                break;
            case "off":
                $( 'genreForm').style.display = "block";
                $( 'clearLink' ).style.display = "inline";
                $( 'displayLink' ).style.display = "none";
//                $( 'addNew').style.display = "none";
                $( 'items' ).style.display = "none";
                break;
            default:
                return false;
        }
    }
    
    
    function storeData( ) {
        var id = Math.floor(Math.random( )*1000000001);          // collect and store all form field values as a object.  
        getSelectedRadio( );                                                         // calls the value of the radio button        
        var item     = { };                                                                      
            item.genre             = [ "Genre:", $( 'genre' ).value ];               
            item.btitle               = [ "Book Title:", $( 'btitle' ).value ];           
            item.author            = [ "Author:", $( 'author' ).value ];
            item.isbn                = [ "ISBN #:", $( 'isbn' ).value ];
            item.series             = [ "Series:",  isaseries ];                           // for radio buttons
            item.seriesname    = [ "Series Name:", $( 'seriesname' ).value ];
            item.seriesnum      = [ "Series Number:", $( 'seriesnum' ).value ];

            
		// Save data to local storage using JSON stringify to convert objects to a string.
		
        localStorage.setItem( id, JSON.stringify( item ) );
        alert ("Saved" );
    }


	function getData ( ) {
        toggleControls( "on" );
        if (localStorage.length === 0 ) {
            alert ( "There is no data in Local Storage." );
        }
        // Write Data from Local Storage to the browser.
        var makeDiv = document.createElement( 'div' );
        makeDiv.setAttribute( "id", "items" );
        var makeList = document.createElement( 'ul' );
        makeDiv.appendChild( makeList );
        document.body.appendChild( makeDiv );
        $( 'items' ).style.display = "block";
        for (var i=0, len=localStorage.length; i<len; i++ ) {
            var makeli = document.createElement( 'li' );
            var linksLi = document.createElement( 'li' );
            makeList.appendChild( makeli );
            var key = localStorage.key( i );
            var value = localStorage.getItem( key );
            // Convert the string from local storage value back to an object by using stringify
            var obj = JSON.parse( value );
            var makeSubList = document.createElement( 'ul' );
            makeli.appendChild( makeSubList );
            for (var n in obj ) {
                var makeSubli = document.createElement( 'li' );
                makeSubList.appendChild( makeSubli );
                var optSubText = obj[ n ] [ 0 ]+ " " +obj[ n ] [ 1 ];
                makeSubli.innerHTML = optSubText;
                makeSubList.appendChild(linksLi);
                
			}
		 makeItemLinks( localStorage.key(i), linksLi);   // create the edit and delete buttons or links for each item in local storage.
		}
	}
	
	// Make Item Links - create the edit and delete links for each item when displayed.
	
	function makeItemLinks( key, linksLi ) {
		console.log ("run makeItemLinks function");
		// add edit single item link
		var editLink = document.createElement( 'a' );
		editLink.href = "#";      
		editLink.key = key;
		var editText = "Edit Book Info";
//		editLink.addEventListener( "click", editItem );
		editLink.innerHTML = editText;
		linksLi.appendChild( editLink );     
		
		// add a line break
		var breakTag = document.createElement( 'br' );
		linksLi.appendChild( breakTag );
		
		// add delete single item link
		var deleteLink = document.createElement( 'a' );
		deleteLink.href = '#';
		deleteLink.key = key;
		var deleteText = "Delete Book Info";
//		deleteLink.addEventListener( "click", deleteItem );
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild( deleteLink );
	}
	
	function editItem( ) {
		// take the item data from local storage
		var value = localStorage.getItem( this.key );
		var item = JSON.parse( value );
		
		// Show the form
		toggleControls( "off" );
		
		// populate the form with current localStorage values.
		$( 'genre' ).value = item.genre[1];
		$( 'btitle' ).value = item.btitle[1];
		$( 'author' ).value = item.author[1];
		$( 'isbn' ).value = item.isbn[1];
		var radios = document.forms[0].isaseries;
		for ( var i=0; i<radios.length; i++ ) {
			if ( radios[i].value == "No" && item.isaseries[1] == "No" ) {
				radios[i].setAttribute("checked", "checked" );
			} else if( radios[i].value == "Yes" && item.isaseries[1] == "Yes" ) {
				radios[i].setAttribute( "checked", "checked" );
			}
		}
		$( 'seriesname' ).value = item.seriesname[1];
		$( 'seriesnum' ).value = item.seriesnum[1];
	}
	
	// Remove the initial listener from the input "save" button.
	save.removeEventListener( "click", storeData );
	// Change the submit button value to Edit button
	$( 'submit' ).value = "Edit Book Info";
	var editSubmit = $( 'submit' );
	// Save the key value established in this function as a property of the editSubmit event
	// so it can be used when we save the edited data.
	editSubmit.addEventListener( "click", validate );
	editSubmit.key = this.key;
	
	
	 function clearLocData( ) {
        if (localStorage.length === 0) {
            alert ( "This is no data to clear." );
        } else {
            localStorage.clear( );
            alert( "All contacts are deleted!" );
            window.location.reload( );
            return false;
        }
    }
    
	function validate( ) {
		// Define the elements we want to check
		var getGenre = $( 'genre' );
		var getBtitle = $( 'btitle' );
		var getAuthor = $( 'author' ); 
		
		// Get Error Messages
		var messageArray = [ ];
		// Genre Validation
		if (getGenre.value === "-- Choose a Genre or Subject --") {
			var genreError = "Please select a genre";
			getGenre.style.border = "1px solid yellow";
			messageArray.push( genreError );
		}
		
		// Book Title Validation
		if (getBtitle.value === " ") {
		var btitleError = "Please enter the title of the book";
			getBtitle.style.border = "1px solid yellow";
			messageArray.push( authorError );
		}
		
		// Author Validation
		if (getAuthor.value === " ") {
		var authorError = "Please enter the author's name";
			getAuthor.style.border = "1px solid yellow";
			messageArray.push( authorError );
		}
	
	}
    // Variable defaults

    var isaseries;
   


    // Set Link and Submit Click Events
    
    var displayLink = $ ( 'displayLink' );
   displayLink.addEventListener ( 'click', getData );
    
    var clearLink = $ ( 'clearLink' );
    clearLink.addEventListener ( 'click', clearLocData );
    
    var save = $ ( 'submit' );
    save.addEventListener ( 'click', validate );

} );

