function newRequest() {

	var title = document.getElementById("title").value;
	title = title.trim();
	title = title.replace(" ","+");
	localTitle = title;

	var author = document.getElementById("author").value;
	author = author.trim();
	author = author.replace(" ","+");
	localAuthor = author;

	var isbn = document.getElementById("isbn").value;
	isbn = isbn.trim();
	isbn = isbn.replace("-","");
	localIsbn = isbn;


	var query = ["",title,author,isbn].join("+");
	console.log(query);
	if (query != "+++") {

		// remove old script
		var oldScript = document.getElementById("jsonpCall");
		if (oldScript != null) {
			document.body.removeChild(oldScript);
		}
		// make a new script element
		var script = document.createElement('script');

		// build up complicated request URL
		var beginning = "https://www.googleapis.com/books/v1/volumes?q="
		var callback = "&callback=handleResponse"

		script.src = beginning+query+callback
		script.id = "jsonpCall";

		// put new script into DOM at bottom of body
		document.body.appendChild(script);
	}
	else {/* override the notfoundoverlay error message*/
		document.getElementById("ourTitle").textContent = localTitle;
		document.getElementById("ourAuthor").textContent = localAuthor;
		document.getElementById("ourIsbn").textContent = localIsbn;
		on("notFoundOverlay");
	}

}

function newLandingRequest() {

	var title = document.getElementById("landingtitle").value;
	title = title.trim();
	title = title.replace(" ","+");
	localTitle = title;

	var author = document.getElementById("landingauthor").value;
	author = author.trim();
	author = author.replace(" ","+");
	localAuthor = author;

	var isbn = document.getElementById("landingisbn").value;
	isbn = isbn.trim();
	isbn = isbn.replace("-","");
	localIsbn = isbn;


	var query = ["",title,author,isbn].join("+");
	console.log(query);
	if (query != "+++") {

		// remove old script
		var oldScript = document.getElementById("jsonpCall");
		if (oldScript != null) {
			document.body.removeChild(oldScript);
		}
		// make a new script element
		var script = document.createElement('script');

		// build up complicated request URL
		var beginning = "https://www.googleapis.com/books/v1/volumes?q="
		var callback = "&callback=handleResponse"

		script.src = beginning+query+callback
		script.id = "jsonpCall";

		// put new script into DOM at bottom of body
		document.body.appendChild(script);
	}
	else {/* override the notfoundoverlay error message*/
		document.getElementById("ourTitle").textContent = localTitle;
		document.getElementById("ourAuthor").textContent = localAuthor;
		document.getElementById("ourIsbn").textContent = localIsbn;
		on("notFoundOverlay");
	}

}

function handleResponse(bookListObj) {

	bookList = bookListObj.items;
	listCount = 0;
	console.log("fsdrdsf ", bookList);
	if(bookList == null){
		document.getElementById("ourTitle").textContent = localTitle;
		document.getElementById("ourAuthor").textContent = localAuthor;
		document.getElementById("ourIsbn").textContent = localIsbn;

		on("notFoundOverlay");
	}
	else{

	off("leftButton");
	off("sleftButton")
	/* where to put the data on the Web page */
	var bookDisplay = document.getElementById("bookDisplay");

	/* write each title as a new paragraph */
	var book = bookList[listCount].volumeInfo;
	var title = book.title;

	var titlePgh = document.createElement("p");
	titlePgh.id = "titlePgh";
	titlePgh.textContent = title;


	var displayImg = document.createElement("img");
	displayImg.id = "displayImg";
	displayImg.alt = "No Image";
	if(book.hasOwnProperty("imageLinks") ){
		if(book.imageLinks.hasOwnProperty("thumbnail"))
			displayImg.src = book.imageLinks.thumbnail;
	}
	else displayImg.src = "";

	var diplayAuthor = document.createElement("p");
	diplayAuthor.id = "diplayAuthor";
	if(book.hasOwnProperty("authors"))
		diplayAuthor.textContent = "by " + book.authors;
	else diplayAuthor.textContent = "by ";

	var displayDescription = document.createElement("p");
	displayDescription.id = "displayDescription";
	if(book.hasOwnProperty("description"))
		displayDescription.textContent = book.description.substring(0,92)+ "...";
	else diplayAuthor.description = "";

	thumbnail.append(displayImg);
	info.append(titlePgh);
	info.append(diplayAuthor);
	info.append(displayDescription);

	/* TUrn overlay on after loaded the book display. Otherwise flicker*/
	off('landingPage');
	on('rightButton');
	on('overlay');
}

}

function rightElement() {
	listCount++;

	on("leftButton");
	if(listCount === bookList.length - 1){
		off("rightButton");

	}

	/* where to put the data on the Web page */
	var bookDisplay = document.getElementById("bookDisplay");

	/* write each title as a new paragraph */
	var book = bookList[listCount].volumeInfo;
	var title = book.title;

	var titlePgh = document.getElementById("titlePgh");
	/* ALWAYS AVOID using the innerHTML property */
	titlePgh.textContent = title;

	var displayImg = document.getElementById("displayImg");
	displayImg.alt = "No Image";
	if(book.hasOwnProperty("imageLinks") ){
		if(book.imageLinks.hasOwnProperty("thumbnail"))
			displayImg.src = book.imageLinks.thumbnail;
	}
	else displayImg.src = "";

	var diplayAuthor = document.getElementById("diplayAuthor");
	if(book.hasOwnProperty("authors"))
		diplayAuthor.textContent = book.authors;
	else diplayAuthor.textContent = "";

	var displayDescription = document.getElementById("displayDescription");
	if(book.hasOwnProperty("description"))
		displayDescription.textContent = book.description.substring(0,92)+ "...";
	else diplayAuthor.description = "";


}

function leftElement() {
	listCount--;

	on("rightButton");
	if(listCount === 0){
		off("leftButton");
	}
	/* where to put the data on the Web page */
	var bookDisplay = document.getElementById("bookDisplay");

	/* write each title as a new paragraph */
	var book = bookList[listCount].volumeInfo;
	var title = book.title;

	var titlePgh = document.getElementById("titlePgh");
	/* ALWAYS AVOID using the innerHTML property */
	titlePgh.textContent = title;

	var displayImg	= document.getElementById("displayImg");
	displayImg.alt = "No Image";
	if(book.hasOwnProperty("imageLinks") ){
		if(book.imageLinks.hasOwnProperty("thumbnail"))
			displayImg.src = book.imageLinks.thumbnail;
	}
	else displayImg.src = "";

	var diplayAuthor = document.getElementById("diplayAuthor");
	if(book.hasOwnProperty("authors"))
		diplayAuthor.textContent = book.authors;
	else diplayAuthor.textContent = "";

	var displayDescription = document.getElementById("displayDescription");
	if(book.hasOwnProperty("description"))
		displayDescription.textContent = book.description.substring(0,92)+ "...";
	else diplayAuthor.description = "";

}

function srightElement() {
	listCount++;

	on("sleftButton");
	if(listCount === bookList.length - 1){
		off("srightButton");

	}

	/* where to put the data on the Web page */
	var bookDisplay = document.getElementById("bookDisplay");

	/* write each title as a new paragraph */
	var book = bookList[listCount].volumeInfo;
	var title = book.title;

	var titlePgh = document.getElementById("titlePgh");
	/* ALWAYS AVOID using the innerHTML property */
	titlePgh.textContent = title;

	var displayImg = document.getElementById("displayImg");
	displayImg.alt = "No Image";
	if(book.hasOwnProperty("imageLinks") ){
		if(book.imageLinks.hasOwnProperty("thumbnail"))
			displayImg.src = book.imageLinks.thumbnail;
	}
	else displayImg.src = "";

	var diplayAuthor = document.getElementById("diplayAuthor");
	if(book.hasOwnProperty("authors"))
		diplayAuthor.textContent = book.authors;
	else diplayAuthor.textContent = "";

	var displayDescription = document.getElementById("displayDescription");
	if(book.hasOwnProperty("description"))
		displayDescription.textContent = book.description.substring(0,92)+ "...";
	else diplayAuthor.description = "";


}

function sleftElement() {
	listCount--;

	on("srightButton");
	if(listCount === 0){
		off("sleftButton");
	}
	/* where to put the data on the Web page */
	var bookDisplay = document.getElementById("bookDisplay");

	/* write each title as a new paragraph */
	var book = bookList[listCount].volumeInfo;
	var title = book.title;

	var titlePgh = document.getElementById("titlePgh");
	/* ALWAYS AVOID using the innerHTML property */
	titlePgh.textContent = title;

	var displayImg	= document.getElementById("displayImg");
	displayImg.alt = "No Image";
	if(book.hasOwnProperty("imageLinks") ){
		if(book.imageLinks.hasOwnProperty("thumbnail"))
			displayImg.src = book.imageLinks.thumbnail;
	}
	else displayImg.src = "";

	var diplayAuthor = document.getElementById("diplayAuthor");
	if(book.hasOwnProperty("authors"))
		diplayAuthor.textContent = book.authors;
	else diplayAuthor.textContent = "";

	var displayDescription = document.getElementById("displayDescription");
	if(book.hasOwnProperty("description"))
		displayDescription.textContent = book.description.substring(0,92)+ "...";
	else diplayAuthor.description = "";

}

function keephandler(){

	console.log("keeephandler");
	var bookInfo = document.getElementById("bookDisplay");
	bookInfo = bookInfo.cloneNode(true);
	bookInfo.classList.add("booktile");

	/* add fake id names */
	bookInfo.id = "test";
	bookInfo.children[0].id = "test";
	bookInfo.children[1].id = "test";

	/* add style classes to the thumbnail and info divs */
	bookInfo.children[0].classList.add("tilethumbnail");
	bookInfo.children[1].classList.add("tileinfo");

	var listDiv = document.getElementById("wishlist");

	var removebutton = document.createElement("button");
	removebutton.classList.add("button");
	removebutton.classList.add("booktileButton");
	removebutton.textContent = "X";
	removebutton.onclick = function () { this.parentNode.parentNode.parentNode.remove();}

	var buttonDiv = document.createElement("div");
	buttonDiv.classList.add("removeButton");
	buttonDiv.append(removebutton);
	bookInfo.children[1].prepend(buttonDiv); /* add button to the top of the div*/
	listDiv.append(bookInfo);
	off("overlay");
}

function deleteTile(){
	alert(this.textContent);
	this.parentNode.parentNode.remove();
	//element.parentNode.remove();
}

function on(id) {
	if(id === "rightButton" || id === "leftButton") document.getElementById(id).style.visibility = "visible";
	else if(id === "srightButton" || id === "sleftButton") document.getElementById(id).style.visibility = "visible";
    	else document.getElementById(id).style.display = "block";

}

function off(id) {
	if(id === "rightButton" || id === "leftButton") document.getElementById(id).style.visibility = "hidden";
	else if(id === "srightButton" || id === "sleftButton") document.getElementById(id).style.visibility = "hidden";
	else document.getElementById(id).style.display = "none";

	/*removing elements from the dom after clicking cross (overlay)*/
	if(id === "overlay"){
		var titlePgh = document.getElementById("titlePgh");
		if(titlePgh) titlePgh.remove();

		var displayImg = document.getElementById("displayImg");
		if(displayImg) displayImg.remove();

		var diplayAuthor = document.getElementById("diplayAuthor");
		if(diplayAuthor) diplayAuthor.remove();

		var displayDescription = document.getElementById("displayDescription");
		if(displayDescription) displayDescription.remove();
	}
}