// VFW 1206 Project 2
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
	console.log("Testing");
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
/*
            item.children          = [ "Children's Books:", $( 'childrens' ).value ];
            item.horror             = [ "Horror:", $( 'horror' ).value ];
            item.humor             = [ "Humor:", $( 'humor' ).value ];
            item.literature         = [ "Literature & Fiction:", $( 'literature' ).value ];
            item.manga            = [ "Manga & Graphic Novels:", $( 'manga' ).value ];
            item.mystery          = [ "Mystery, Crime, Thriller & Suspense:", $( 'mystery' ).value ];
            item.romance         = [ "Romance:", $( 'romance' ).value ];
            item.scifi                = [ "Sci-Fi & Fantasy:", $( 'scifi' ).value ];
            item.western          = [ "Western:", $( 'western' ).value ];
		  item.art                   = [ "Art & Photography:", $( 'art' ).value ];
            item.biography       = [ "Biographies and Memoir:", $( 'biography' ).value ];
            item.business         = [ "Business & Finance:", $( 'business' ).value ];
            item.computers       = [ "Computers & Technology:", $( 'computers' ).value ];
            item.cookbooks       = [ "Cookbooks, Food and Wine:", $( 'cookbooks' ).value ];
            item.crafts               = [ "Crafts & Hobbies:", $( 'crafts' ).value ];
            item.education        = [ "Education & Reference:", $( 'education' ).value ];
            item.health              = [ "Health & Fitness:", $( 'health' ).value ];
            item.history             = [ "History:", $( 'history' ).value ];
            item.law                  = [ "Law:", $( 'law' ).value ];
            item.medical           = [ "Medical:", $( 'medical' ).value ];
            item.parenting        = [ "Parenting & Relationships:", $( 'parenting' ).value ];
            item.religion           = [ "Religion & Spirituality:", $( 'religion' ).value ];
            item.math               = [ "Math & Science:", $( 'math' ).value ];
            item.selfhelp         = [ "Self-Help:", $( 'selfhelp' ).value ];
            item.sports             = [ "Sports & Outdoors:", $( 'sports' ).value ];
            item.teens              = [ "Teens:", $( 'teens' ).value ];
            item.travel              = [ "Travel:", $( 'travel' ).value ];
*/
            item.seriesname    = [ "Series Name:", $( 'seriesname' ).value ];
            item.seriesnum      = [ "Series Number:", $( 'seriesnum' ).value ];
            item.series             = [ "Series:",  isaseries ];                           // for radio buttons
            
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
			}
		}
	}
	
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
    
    // Variable defaults

    var isaseries;
   


    // Set Link and Submit Click Events
    
    var displayLink = $ ( 'displayLink' );
   displayLink.addEventListener ( 'click', getData );
    
    var clearLink = $ ( 'clearLink' );
    clearLink.addEventListener ( 'click', clearLocData );
    
    var save = $ ( 'submit' );
    save.addEventListener ( 'click', storeData );

} );

