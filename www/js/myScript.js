//Function to get the list of movie search results based on a given keyword.
function getMovies() {
	xmlhttp = new XMLHttpRequest(); 
	var movieTitle = document.getElementById("title").value;
//Check to see if a keyword is inserted or not
	if (movieTitle == "") {
		document.getElementById("output1").innerHTML = "Please enter name of the movie";
	} 
	else 
	{
		document.getElementById("output1").innerHTML = "";
		element = document.getElementById("output2");
		element.innerHTML = "";
		//transition to page2
		$.mobile.changePage($("#page2"), {
			transition: "slide",
		});
		var key = "xwd6czu67s5vbdy2tpz5eyhp";
		var url = "http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=xwd6czu67s5vbdy2tpz5eyhp" + "&q=" + encodeURI(movieTitle);
		xmlhttp.open('GET', url, true);
		xmlhttp.setRequestHeader("Accept", "application/json");
		//sending the request to RESTful web service
		xmlhttp.send(null);
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4) {
				if (xmlhttp.status == 200) {
					//parsing the json response 
					var movieInfo = JSON.parse(xmlhttp.responseText);
					if (movieInfo.total != 0) {
						element.innerHTML = movieInfo.movies.length + " movie(s) found";
						for (i = 0; i < movieInfo.movies.length; i++) {
							var cast = "";
							for (j = 0; j < movieInfo.movies[i].abridged_cast.length; j++) {
								cast = cast + movieInfo.movies[i].abridged_cast[j].name + ", ";
							}
							element.innerHTML = element.innerHTML + "<br/>" + "<img src=" 
							+ movieInfo.movies[i].posters.thumbnail + ">" + "<h3>"
							+ movieInfo.movies[i].title + "(" + movieInfo.movies[i].year + ")" 
							+ "</h3>" + "<b>Rating: </b>" + movieInfo.movies[i].mpaa_rating
							+ "<br/>" + "<b>Runtime: </b>" + movieInfo.movies[i].runtime + " min<br/>" 
							+ "<b>Release Dates: </b><ul><li><b>In Theaters: </b>" 
							+ movieInfo.movies[i].release_dates.theater + "</li><li><b>On DVD: </b>" 
							+ movieInfo.movies[i].release_dates.dvd + "</li></ul>" + "<b>Critics Rating: </b>"
							+ movieInfo.movies[i].ratings.critics_rating + "<br/>" + "<b>Critics Score: </b>" 
							+ movieInfo.movies[i].ratings.critics_score + "<br/>" + "<b>Audience Rating: </b>"
							+ movieInfo.movies[i].ratings.audience_rating + "<br/>" + "<b>Audience Score: </b>"
							+ movieInfo.movies[i].ratings.audience_score + "<br/>" + "<b>Summary: </b>" 
							+ movieInfo.movies[i].synopsis + "<br/>" + "<b>Cast: </b>" + cast + "<br/><br/>" 
							+ "<a onclick='getReviews(/" + movieInfo.movies[i].id + "/,/"+ movieInfo.movies[i].title 
							+"/)' href='#'><b>Reviews</b></a>" + "<br/><br/><hr>";
						}
					} else element.innerHTML = "No movies found";
				} else alert("Error -> xmlhttp status: " + xmlhttp.status);
			}
		};
	}
}

//Function to show the reviews about a particular movie
function getReviews(movieId, movieTitle) {
	var name = String(movieTitle);
	var movieName = name.substring(1, name.length - 1);
	xmlhttp = new XMLHttpRequest();
	element = document.getElementById("output3");
	element.innerHTML = "";
	//transition to page3
	$.mobile.changePage($("#page3"), {
		transition: "slide",
	});
	var key = "xwd6czu67s5vbdy2tpz5eyhp";
	var url = "http://api.rottentomatoes.com/api/public/v1.0/movies/" + movieId + "/reviews.json?apikey=" + key + "&review_type=top_critic";
	xmlhttp.open('GET', url, true);
	xmlhttp.setRequestHeader("Accept", "application/json");
	//Sending the request to RESTfull web service
	xmlhttp.send(null);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			if (xmlhttp.status == 200) {
				//parsing the json response
				var reviewInfo = JSON.parse(xmlhttp.responseText);
				if (reviewInfo.reviews.length != 0) {
					element.innerHTML = "<h3>Reviews for " + movieName + " :</h3>";
					for (i = 0; i < reviewInfo.reviews.length; i++) {
						element.innerHTML = element.innerHTML + reviewInfo.reviews[i].quote + " " + reviewInfo.reviews[i].critic + ", <i>" 
						+ reviewInfo.reviews[i].publication + "</i>, " + reviewInfo.reviews[i].date + "<br/></br>";
					}
				} else element.innerHTML = "No reviews found";
			} else alert("Error -> xmlhttp status: " + xmlhttp.status);
		}
	};
}

//Function to retrieve information about the top ten movies in the box office
function getBoxOffice() {
	xmlhttp = new XMLHttpRequest();
	element = document.getElementById("output4");
	element.innerHTML = "";
	var key = "xwd6czu67s5vbdy2tpz5eyhp";
	var url = "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/box_office.json?apikey=" + key;
	xmlhttp.open('GET', url, true);
	xmlhttp.setRequestHeader("Accept", "application/json");
	//Sending the request to the RESTful web service
	xmlhttp.send(null);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			if (xmlhttp.status == 200) {
				//parsing the json response
				var movieInfo = JSON.parse(xmlhttp.responseText);
				if (movieInfo.movies.length != 0) {
					for (i = 0; i < movieInfo.movies.length; i++) {
						var count = i + 1;
						var cast = "";
						for (j = 0; j < movieInfo.movies[i].abridged_cast.length; j++) {
							cast = cast + movieInfo.movies[i].abridged_cast[j].name + ", ";
						}
						element.innerHTML = element.innerHTML + "<img src=" + movieInfo.movies[i].posters.thumbnail 
						+ ">" + "<h3>" + count + "- " + movieInfo.movies[i].title + "</h3>" + "<b>Rating: </b>"
						+ movieInfo.movies[i].mpaa_rating + "<br/>" + "<b>Runtime: </b>" + movieInfo.movies[i].runtime 
						+ " min<br/>" + "<b>Release Dates: </b>" + movieInfo.movies[i].release_dates.theater + "<br/>" 
						+ "<b>Critics Rating: </b>" + movieInfo.movies[i].ratings.critics_rating + "<br/>" 
						+ "<b>Critics Score: </b>" + movieInfo.movies[i].ratings.critics_score + "<br/>" 
						+ "<b>Audience Rating: </b>" + movieInfo.movies[i].ratings.audience_rating + "<br/>"
						+ "<b>Audience Score: </b>" + movieInfo.movies[i].ratings.audience_score + "<br/>"
						+ "<b>Summary: </b>" + movieInfo.movies[i].synopsis + "<br/>" + "<b>Cast: </b>" + cast + "<hr>";
					}
				} else element.innerHTML = "No movies found";
			} else alert("Error -> xmlhttp status: " + xmlhttp.status);
		}
	};
}

//Function to get the thumbnails of top 10 box office movies
function getBoxOfficeImages() {
	xmlhttp = new XMLHttpRequest();
	element = document.getElementById("images");
	var key = "xwd6czu67s5vbdy2tpz5eyhp";
	var url = "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/box_office.json?apikey=" + key;
	xmlhttp.open('GET', url, true);
	xmlhttp.setRequestHeader("Accept", "application/json");
	//Sending the request to RESTful web service
	xmlhttp.send(null);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			if (xmlhttp.status == 200) {
				//Parsing the json response
				var movieInfo = JSON.parse(xmlhttp.responseText);
				if (movieInfo.movies.length != 0) {
					for (i = 0; i < movieInfo.movies.length; i++) {
						element.innerHTML += "<a onclick='getMovieDetailsFromImages(\"" 
						+ movieInfo.movies[i].id + "\")' href='#'><img id='image' src = "
						+ movieInfo.movies[i].posters.thumbnail + "></a>";
					}
				} else alert("Error -> xmlhttp status: " + xmlhttp.status);
			}
		}
	};
}

//Function to get movie details by clicking on movie thumbnail on home page
function getMovieDetailsFromImages(id) {
	xmlhttp = new XMLHttpRequest();
	var movieId = id;
	element = document.getElementById("output2");
	element.innerHTML = "";
	//transition to page2
	$.mobile.changePage($("#page2"), {
		transition: "slide",
	});
	var key = "xwd6czu67s5vbdy2tpz5eyhp";
	var url = "http://api.rottentomatoes.com/api/public/v1.0/movies/" + movieId + ".json?apikey=" + key;
	xmlhttp.open('GET', url, true);
	xmlhttp.setRequestHeader("Accept", "application/json");
	//send the request to RESTful web service
	xmlhttp.send(null);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			if (xmlhttp.status == 200) {
				//Parsing the json response
				var movieInfo = JSON.parse(xmlhttp.responseText);
				var genre = "";
				var cast = "";
				var director = "";
				for (i = 0; i < movieInfo.genres.length; i++) {
					genre = genre + movieInfo.genres[i] + ", ";
				}
				for (i = 0; i < movieInfo.abridged_cast.length; i++) {
					cast = cast + movieInfo.abridged_cast[i].name + ", ";
				}
				for (i = 0; i < movieInfo.abridged_directors.length; i++) {
					director = director + movieInfo.abridged_directors[i].name + ", ";
				}
				element.innerHTML = element.innerHTML + "<br/>" + "<img src=" + movieInfo.posters.thumbnail + ">" 
				+ "<h3>" + movieInfo.title + "(" + movieInfo.year + ")" + "</h3>" + "<b>Genre(s): </b>" + genre 
				+ "<br/>" + "<b>Rating: </b>" + movieInfo.mpaa_rating + "<br/>" + "<b>Runtime: </b>" + movieInfo.runtime 
				+ " min<br/>" + "<b>In Theaters: </b>" + movieInfo.release_dates.theater + "<br/>" + "<b>Critics Rating: </b>" 
				+ movieInfo.ratings.critics_rating + "<br/>" + "<b>Critics Score: </b>" + movieInfo.ratings.critics_score 
				+ "<br/>" + "<b>Audience Rating: </b>" + movieInfo.ratings.audience_rating + "<br/>" + "<b>Audience Score: </b>" 
				+ movieInfo.ratings.audience_score + "<br/>" + "<b>Summary: </b>" + movieInfo.synopsis + "<br/>" + "<b>Cast: </b>" 
				+ cast + "<br/>" + "<b>Director(s): </b>" + director + "<br/>" + "<b>Studio: </b>" + movieInfo.studio + "<br/><br/>" 
				+ "<a onclick='getReviews(/" + movieInfo.id + "/,/" + movieInfo.title + "/)' href='#'><b>Reviews</b></a><br/>";
			} else alert("Error -> xmlhttp status: " + xmlhttp.status);
		}
	};
}

//Function to get the theater list by providing zipcode.
function getTheaters() {
	var zip = document.getElementById("zip").value;
	//Condition to show the result only when the seach box in not empty and the zipcode is valid.
	if (isValidUSZip(zip) && zip != "") {
		document.getElementById("output1").innerHTML = "";
		element = document.getElementById("output5");
		document.getElementById("output").innerHTML = "";
		element.innerHTML = "";
		$.mobile.changePage($("#page5"), {
			transition: "slide",
		});
		xmlhttp = new XMLHttpRequest();
		var url = "http://www.fandango.com/rss/moviesnearme_" + zip;
		xmlhttp.open('GET', url, true);
		xmlhttp.setRequestHeader("Accept", "application/xml");
		xmlhttp.send();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4) {
				if (xmlhttp.status == 200) {
					var text = xmlhttp.responseText;
					if (window.DOMParser) {
						parser = new DOMParser();
						xmlDoc = parser.parseFromString(text, "text/xml");
					} else // Internet Explorer
					{
						xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
						xmlDoc.async = false;
						xmlDoc.loadXML(text);
					}
					var dateTime = xmlDoc.getElementsByTagName("pubDate")[0].childNodes[0].nodeValue;
					var date = dateTime.substring(0, (dateTime.indexOf(":") - 2));
					element.innerHTML = "<b>" + date + "</b><br><br><b>";
					var xmlNodes = ["title", "description", "link"];
					var itemTags = xmlDoc.getElementsByTagName("item");
					var add = xmlDoc.getElementsByTagName("description")[1].childNodes[0].nodeValue;
					var index = add.indexOf("</p>");
					var address = add.substring(3, index);
					//Setting address of theatre in localStorege
					localStorage.setItem("theatreDestination", address);
					for (i = 0; i < itemTags.length; i++) {
						for (j = 0; j < xmlNodes.length; j++) {
							var recordNode = itemTags[i].getElementsByTagName(xmlNodes[j])[0];
							if (j == 0) {
								element.innerHTML += "<b>" + recordNode.textContent + "</b><br>";
							} else {
								element.innerHTML += recordNode.textContent + "<br>";
							}
							if (j == 1) {
								element.innerHTML = (element.innerHTML).replace('Search other theaters', '');
							}
						}
						element.innerHTML += "<hr><br>";
					}
				}
			}
		};
	} else {
		document.getElementById("output").innerHTML = "Please enter a valid zip code";
	}
}

function isValidUSZip(zip) {
	return /^\d{5}(-\d{4})?$/.test(zip);
}

function findMyLocation() {
	if (!navigator.geolocation) {
		location.innerHTML = "<p>Geolocation is not supported by your browser</p>";
		return;
	}

	function success(position) {
		var lat = parseFloat(position.coords.latitude);
		var lon = parseFloat(position.coords.longitude);
		localStorage.setItem("latitude", lat);
		localStorage.setItem("longitude", lon);
	};

	function showError(error) {
		switch (error.code) {
		case error.PERMISSION_DENIED:
			location.innerHTML = "Geolocation request terminated by user."
			break;
		case error.POSITION_UNAVAILABLE:
			location.innerHTML = "Your location information is unavailable."
			break;
		case error.TIMEOUT:
			location.innerHTML = "Request timed out."
			break;
		case error.UNKNOWN_ERROR:
			location.innerHTML = "Unknown error."
			break;
		}
	}
	navigator.geolocation.getCurrentPosition(success, showError);
}

//Function to redirect current html page map.html page.
function changeThePage() {
	var result = document.getElementById("output5").innerHTML;
	if (result != "" || result != null) {
		window.location = 'map.html';
	} else {
		document.getElementById("output").innerHTML = "Please first search for movie theaters.";
	}
}

//Functions to redirect from the map.html page to index page according to the selected tab.
function redirectToHomePage() {
	window.location = 'index.html';
}

function redirectToMovieinformation() {
	window.location = 'index.html#page2';
}

function redirectToReview() {
	window.location = 'index.html#page3';
}

function redirectToBoxOffice() {
	window.location = 'index.html#page4';
}

function redirectToTheaters() {
	window.location = 'index.html#page5';
}