function getMovies() {
	xmlhttp = new XMLHttpRequest();
	var movieTitle = document.getElementById("title").value;
	if (movieTitle == "") {
		document.getElementById("output1").innerHTML = "Please enter name of the movie";
	} else {
		document.getElementById("output1").innerHTML = "";
		element = document.getElementById("output2");
		element.innerHTML = "";
		$.mobile.changePage($("#page2"), {
			transition: "slide",
		});
		var key = "xwd6czu67s5vbdy2tpz5eyhp";
		var url = "http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=xwd6czu67s5vbdy2tpz5eyhp" + "&q=" + encodeURI(movieTitle);
		xmlhttp.open('GET', url, true);
		xmlhttp.setRequestHeader("Accept", "application/json");
		xmlhttp.send(null);
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4) {
				if (xmlhttp.status == 200) {
					var movieInfo = JSON.parse(xmlhttp.responseText);
					if (movieInfo.total != 0) {
						element.innerHTML = movieInfo.movies.length + " movie(s) found";
							for (i = 0; i < movieInfo.movies.length; i++) {
							var cast = "";
							for (j = 0; j < movieInfo.movies[i].abridged_cast.length; j++) {
								cast = cast + movieInfo.movies[i].abridged_cast[j].name + ",";
							}
							element.innerHTML = element.innerHTML + "<br/>" + "<img src=" + movieInfo.movies[i].posters.thumbnail + ">" + "<h3>" + movieInfo.movies[i].title + "(" + movieInfo.movies[i].year + ")" + "</h3>" + "<b>Rating: </b>" + movieInfo.movies[i].mpaa_rating + ",<br/>" + "<b>Runtime: </b>" + movieInfo.movies[i].runtime + " min,<br/>" + "<b>Release Dates: </b><ul><li><b>In Theaters: </b>" + movieInfo.movies[i].release_dates.theater + "</li><li><b>On DVD: </b>" + movieInfo.movies[i].release_dates.dvd + "</li></ul>" + "<b>Critics Rating: </b>" + movieInfo.movies[i].ratings.critics_rating + ",<br/>" + "<b>Critics Score: </b>" + movieInfo.movies[i].ratings.critics_score + ",<br/>" + "<b>Audience Rating: </b>" + movieInfo.movies[i].ratings.audience_rating + ",<br/>" + "<b>Audience Score: </b>" + movieInfo.movies[i].ratings.audience_score + ",<br/>" + "<b>Summary: </b>" + movieInfo.movies[i].synopsis + ",<br/>" + "<b>Cast: </b>" + cast + "<br/><br/>" + "<input type='button' id='current1' value='Reviews' data-corners='true' data-inline='true' data-shadow='true' data-mini='true' onclick='getReviews(/" + movieInfo.movies[i].id + "/,/" + movieInfo.movies[i].title + "/)'></input><br/><br/><hr>";
						}
					} else element.innerHTML = "No movies found";
				} else alert("Error -> xmlhttp status: " + xmlhttp.status);
			}
		};
	}
}

function getReviews(movieId, movieTitle) {
	var name = String(movieTitle);
	var movieName = name.substring(1, name.length - 1);
	xmlhttp = new XMLHttpRequest();
	element = document.getElementById("output3");
	element.innerHTML = "";
	$.mobile.changePage($("#page3"), {
		transition: "slide",
	});
	var key = "xwd6czu67s5vbdy2tpz5eyhp";
	var url = "http://api.rottentomatoes.com/api/public/v1.0/movies/" + movieId + "/reviews.json?apikey=" + key + "&review_type=top_critic";
	xmlhttp.open('GET', url, true);
	xmlhttp.setRequestHeader("Accept", "application/json");
	xmlhttp.send(null);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			if (xmlhttp.status == 200) {
				var reviewInfo = JSON.parse(xmlhttp.responseText);
				if (reviewInfo.reviews.length != 0) {
					element.innerHTML = "<h3>Reviews for " + movieName + " :</h3>";
					for (i = 0; i < reviewInfo.reviews.length; i++) {
						element.innerHTML = element.innerHTML  + reviewInfo.reviews[i].quote + reviewInfo.reviews[i].critic + ",<i>" + reviewInfo.reviews[i].publication + "</i>," + reviewInfo.reviews[i].date + "<br/></br>";
					}
				} else element.innerHTML = "No reviews found";
			} else alert("Error -> xmlhttp status: " + xmlhttp.status);
		}
	};
}

function getBoxOffice() {
	xmlhttp = new XMLHttpRequest();
	element = document.getElementById("output4");
	element.innerHTML = "";
	var key = "xwd6czu67s5vbdy2tpz5eyhp";
	var url = "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/box_office.json?apikey=" + key;
	xmlhttp.open('GET', url, true);
	xmlhttp.setRequestHeader("Accept", "application/json");
	xmlhttp.send(null);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			if (xmlhttp.status == 200) {
				var movieInfo = JSON.parse(xmlhttp.responseText);
				if (movieInfo.movies.length != 0) {
					for (i = 0; i < movieInfo.movies.length; i++) {
						var count = i + 1;
						var cast = "";
						for (j = 0; j < movieInfo.movies[i].abridged_cast.length; j++) {
							cast = cast + movieInfo.movies[i].abridged_cast[j].name + ",";
						}
						element.innerHTML = element.innerHTML + "<img src=" + movieInfo.movies[i].posters.thumbnail + ">" + "<h3>" + count + "- " + movieInfo.movies[i].title + "</h3>" + "<b>Rating: </b>" + movieInfo.movies[i].mpaa_rating + ",<br/>" + "<b>Runtime: </b>" + movieInfo.movies[i].runtime + " min,<br/>" + "<b>Release Dates: </b>" + movieInfo.movies[i].release_dates.theater + ",<br/>" + "<b>Critics Rating: </b>" + movieInfo.movies[i].ratings.critics_rating + ",<br/>" + "<b>Critics Score: </b>" + movieInfo.movies[i].ratings.critics_score + ",<br/>" + "<b>Audience Rating: </b>" + movieInfo.movies[i].ratings.audience_rating + ",<br/>" + "<b>Audience Score: </b>" + movieInfo.movies[i].ratings.audience_score + ",<br/>" + "<b>Summary: </b>" + movieInfo.movies[i].synopsis + ",<br/>" + "<b>Cast: </b>" + cast + "<hr>";
					}
				} else element.innerHTML = "No movies found";
			} else alert("Error -> xmlhttp status: " + xmlhttp.status);
		}
	};
}

function getBoxOfficeImages() {
	xmlhttp = new XMLHttpRequest();
	element = document.getElementById("images");
	var key = "xwd6czu67s5vbdy2tpz5eyhp";
	var url = "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/box_office.json?apikey=" + key;
	xmlhttp.open('GET', url, true);
	xmlhttp.setRequestHeader("Accept", "application/json");
	xmlhttp.send(null);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			if (xmlhttp.status == 200) {
				var movieInfo = JSON.parse(xmlhttp.responseText);
				if (movieInfo.movies.length != 0) {
					for (i = 0; i < movieInfo.movies.length; i++) {
						element.innerHTML += "<a onclick='getMovieDetailsFromImages(\"" + movieInfo.movies[i].title + "\")' href='#'><img id='image' src = " + movieInfo.movies[i].posters.thumbnail + "></a>";
					}
				} else alert("Error -> xmlhttp status: " + xmlhttp.status);
			}
		}
	};
};

function getMovieDetailsFromImages(title) {
	xmlhttp = new XMLHttpRequest();
	var movieTitle = title;
		//document.getElementById("output1").innerHTML = "";
		element = document.getElementById("output2");
		element.innerHTML = "";
		$.mobile.changePage($("#page2"), {
			transition: "slide",
		});
		var key = "xwd6czu67s5vbdy2tpz5eyhp";
		var url = "http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=xwd6czu67s5vbdy2tpz5eyhp" + "&q=" + encodeURI(movieTitle);
		xmlhttp.open('GET', url, true);
		xmlhttp.setRequestHeader("Accept", "application/json");
		xmlhttp.send(null);
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4) {
				if (xmlhttp.status == 200) {
					var movieInfo = JSON.parse(xmlhttp.responseText);
					if (movieInfo.total != 0) {
						element.innerHTML = movieInfo.movies.length + " movies found";
						for (i = 0; i < movieInfo.movies.length; i++) {
							var cast = "";
							for (j = 0; j < movieInfo.movies[i].abridged_cast.length; j++) {
								cast = cast + movieInfo.movies[i].abridged_cast[j].name + ",";
							}
							element.innerHTML = element.innerHTML + "<br/>" + "<img src=" + movieInfo.movies[i].posters.thumbnail + ">" + "<h3>" + movieInfo.movies[i].title + "(" + movieInfo.movies[i].year + ")" + "</h3>" + "<b>Rating: </b>" + movieInfo.movies[i].mpaa_rating + ",<br/>" + "<b>Runtime: </b>" + movieInfo.movies[i].runtime + " min,<br/>" + "<b>Release Dates: </b><ul><li><b>In Theaters: </b>" + movieInfo.movies[i].release_dates.theater + "</li><li><b>On DVD: </b>" + movieInfo.movies[i].release_dates.dvd + "</li></ul>" + "<b>Critics Rating: </b>" + movieInfo.movies[i].ratings.critics_rating + ",<br/>" + "<b>Critics Score: </b>" + movieInfo.movies[i].ratings.critics_score + ",<br/>" + "<b>Audience Rating: </b>" + movieInfo.movies[i].ratings.audience_rating + ",<br/>" + "<b>Audience Score: </b>" + movieInfo.movies[i].ratings.audience_score + ",<br/>" + "<b>Summary: </b>" + movieInfo.movies[i].synopsis + ",<br/>" + "<b>Cast: </b>" + cast + "<br/><br/>" + "<input type='button' value='Reviews'  data-corners='true' data-inline='true' data-shadow='true' data-mini='true' onclick='getReviews(/" + movieInfo.movies[i].id + "/,/" + movieInfo.movies[i].title + "/)'></input><br/><br/><hr>";
						}
					} else element.innerHTML = "No movies found";
				} else alert("Error -> xmlhttp status: " + xmlhttp.status);
			}
		};
}