function getMoviesk()
		{
			xmlhttp = new XMLHttpRequest();
            var movieTitle =  document.getElementById("title").value;
			if(movieTitle=="")
			{
	            document.getElementById("output1").innerHTML = "Please enter name of the movie";
			}
			else
			{
				document.getElementById("output1").innerHTML = "";
				element=document.getElementById("output2");
				element.innerHTML = "";
				$.mobile.changePage( $("#page2"), {
				transition: "slide",
	            });
		
			    alert(encodeURI(movieTitle));
     			var key="xwd6czu67s5vbdy2tpz5eyhp";

                var url = "http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=xwd6czu67s5vbdy2tpz5eyhp"+"&q="+encodeURI(movieTitle);//"&page_limit="+pageLimit;
                alert(url);
   			    xmlhttp.open('GET',url,true);
                xmlhttp.setRequestHeader("Accept","application/json");
				//xmlhttp.setRequestHeader("Access-Control-Allow-Origin","*")
                xmlhttp.send(null);
                xmlhttp.onreadystatechange = function() {
					alert("readyState:"+xmlhttp.readyState+"; xmlhttp.status:"+xmlhttp.status);
					if (xmlhttp.readyState == 4) {
						 alert("xmlhttp.status:"+xmlhttp.status);
						if ( xmlhttp.status == 200) {
						//	 alert("responseText:"+xmlhttp.responseText);
								var movieInfo = JSON.parse(xmlhttp.responseText);
						//		 alert("movieInfo:"+movieInfo);
								if(movieInfo.total!=0){//""&&current.count!=0){
                                //var date = new Date((current.list[0].dt)*1000);
								//date=date.toString();
								element.innerHTML= movieInfo.movies.length+" movies found";
								for(i=0;i<movieInfo.movies.length;i++)
								{
									var cast="";
									for(j=0;j<movieInfo.movies[i].abridged_cast.length;j++)
									{
								       cast=cast+movieInfo.movies[i].abridged_cast[j].name+",";  
									}
									element.innerHTML = element.innerHTML + "<br/>" +
						            "<img src="+ movieInfo.movies[i].posters.thumbnail+">"+
                     		        "<h3>"+movieInfo.movies[i].title +"("+movieInfo.movies[i].year+")"+"</h3>" +
								//	"<b>Year: </b>"+  movieInfo.movies[i].year+",<br/>"+
									"<b>Rating: </b>"+  movieInfo.movies[i].mpaa_rating+",<br/>"+
									"<b>Runtime: </b>"+  movieInfo.movies[i].runtime+" min,<br/>"+
									//"<b>Critics Consensus: </b>"+  movieInfo.movies[i].critics_consensus+",<br/>"+
									"<b>Release Dates: </b><ul><li><b>In Theaters: </b>"+  movieInfo.movies[i].release_dates.theater+
									"</li><li><b>On DVD: </b>"+movieInfo.movies[i].release_dates.dvd+"</li></ul>"+
									"<b>Critics Rating: </b>"+movieInfo.movies[i].ratings.critics_rating+",<br/>"+
									"<b>Critics Score: </b>"+movieInfo.movies[i].ratings.critics_score+",<br/>"+
									"<b>Audience Rating: </b>"+movieInfo.movies[i].ratings.audience_rating+",<br/>"+
									"<b>Audience Score: </b>"+movieInfo.movies[i].ratings.audience_score+",<br/>"+
									"<b>Summary: </b>"+ movieInfo.movies[i].synopsis+",<br/>"+
									"<b>Cast: </b>"+cast+"<br/><br/>"+
									//"<b>IMDB ID: </b>"+movieInfo.movies[i].alternate_ids.imdb+"<br/><hr>";
                                   "<input type=button value=Reviews  data-corners=true data-inline=true data-shadow=true data-mini=true onclick=getReviewsk("+movieInfo.movies[i].id+","+movieInfo.movies[i].title+")>Reviews</input><br/><br/><hr>";									
									//"<a href= http://api.rottentomatoes.com/api/public/v1.0/movies/"+movieInfo.movies[i].id+"/reviews.json?apikey="+key+">Reviews</a><br/><br/><hr>";
					         	}					                    
					        }
					        else
					            element.innerHTML="No movies found";
					    }
					    else
                            alert("Error -> xmlhttp status: " + xmlhttp.status);
					}
				};
			}  
        }
function getReviewsk(movieId,movieTitle)
        {
			xmlhttp = new XMLHttpRequest();
			element=document.getElementById("output3");
		    element.innerHTML = "";
			$.mobile.changePage( $("#page3"), {
				transition: "slide",
	            });
			var key="xwd6czu67s5vbdy2tpz5eyhp";
            var url = "http://api.rottentomatoes.com/api/public/v1.0/movies/"+movieId+"/reviews.json?apikey="+key+"&review_type=top_critic";//"&page_limit="+pageLimit;
            alert(url);
   			xmlhttp.open('GET',url,true);
            xmlhttp.setRequestHeader("Accept","application/json");
	        //xmlhttp.setRequestHeader("Access-Control-Allow-Origin","*")
            xmlhttp.send(null);
			xmlhttp.onreadystatechange = function() {
					alert("readyState:"+xmlhttp.readyState+"; xmlhttp.status:"+xmlhttp.status);
					if (xmlhttp.readyState == 4) {
						 alert("xmlhttp.status:"+xmlhttp.status);
						if ( xmlhttp.status == 200) {
						//	 alert("responseText:"+xmlhttp.responseText);
							var reviewInfo = JSON.parse(xmlhttp.responseText);
						//		 alert("reviewInfo:"+reviewInfo);
								if(reviewInfo.reviews.length!=0){//""&&current.count!=0){
                                //var date = new Date((current.list[0].dt)*1000);
								//date=date.toString();
								element.innerHTML="<h3>Reviews for "+movieTitle+" :</h3>";//reviewInfo.reviews.length+" reviews found";
								for(i=0;i<reviewInfo.reviews.length;i++)
								{
									element.innerHTML = element.innerHTML+
									"\""+ reviewInfo.reviews[i].quote+".\" "+
								    reviewInfo.reviews[i].critic+",<i>"+
									reviewInfo.reviews[i].publication+"</i>,"+
									reviewInfo.reviews[i].date;
					         	}			
								//element.innerHTML = element.innerHTML+"</ol>";
								//alert("output:"+element.innerHTML);
					        }
					        else
					            element.innerHTML="No reviews found";
					    }
					    else
                            alert("Error -> xmlhttp status: " + xmlhttp.status);
					}
				};
			
		}
	
function getBoxOfficek()
		{
			xmlhttp = new XMLHttpRequest();
    //      var movieTitle =  document.getElementById("title").value;
	//		if(movieTitle=="")
	//		{
	//            document.getElementById("output1").innerHTML = "Please enter name of the movie";
	//		}
	//		else
	//		{
	//			document.getElementById("output1").innerHTML = "";
				element=document.getElementById("output4");
				element.innerHTML = "";
	//			$.mobile.changePage( $("#page2"), {
	//			transition: "slide",
	//            });
		
	//		    alert(encodeURI(movieTitle));
     			var key="xwd6czu67s5vbdy2tpz5eyhp";

                var url = "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/box_office.json?apikey="+key;//+"&q="+encodeURI(movieTitle);//"&page_limit="+pageLimit;
                alert(url);
   			    xmlhttp.open('GET',url,true);
                xmlhttp.setRequestHeader("Accept","application/json");
				//xmlhttp.setRequestHeader("Access-Control-Allow-Origin","*")
                xmlhttp.send(null);
                xmlhttp.onreadystatechange = function() {
					alert("readyState:"+xmlhttp.readyState+"; xmlhttp.status:"+xmlhttp.status);
					if (xmlhttp.readyState == 4) {
						 alert("xmlhttp.status:"+xmlhttp.status);
						if ( xmlhttp.status == 200) {
						//	 alert("responseText:"+xmlhttp.responseText);
								var movieInfo = JSON.parse(xmlhttp.responseText);
						//		 alert("movieInfo:"+movieInfo);
								if(movieInfo.movies.length!=0){//""&&current.count!=0){
                                //var date = new Date((current.list[0].dt)*1000);
								//date=date.toString();
							//	element.innerHTML="<ol>";//movieInfo.movies.length+" movies found";
								for(i=0;i<movieInfo.movies.length;i++)
								{
									var count=i+1;
									var cast="";
									for(j=0;j<movieInfo.movies[i].abridged_cast.length;j++)
									{
								       cast=cast+movieInfo.movies[i].abridged_cast[j].name+",";  
									}
									element.innerHTML = element.innerHTML+
						            "<img src="+ movieInfo.movies[i].posters.thumbnail+">"+
                     		        "<h3>"+count+"- "+movieInfo.movies[i].title +"</h3>" +//+"("+movieInfo.movies[i].year+")"
								//	"<b>Year: </b>"+  movieInfo.movies[i].year+",<br/>"+
									"<b>Rating: </b>"+  movieInfo.movies[i].mpaa_rating+",<br/>"+
									"<b>Runtime: </b>"+  movieInfo.movies[i].runtime+" min,<br/>"+
									//"<b>Critics Consensus: </b>"+  movieInfo.movies[i].critics_consensus+",<br/>"+
									"<b>Release Dates: </b>"+  movieInfo.movies[i].release_dates.theater+",<br/>"+
								//	"</li><li><b>On DVD: </b>"+movieInfo.movies[i].release_dates.dvd+"</li></ul>"+
									"<b>Critics Rating: </b>"+movieInfo.movies[i].ratings.critics_rating+",<br/>"+
									"<b>Critics Score: </b>"+movieInfo.movies[i].ratings.critics_score+",<br/>"+
									"<b>Audience Rating: </b>"+movieInfo.movies[i].ratings.audience_rating+",<br/>"+
									"<b>Audience Score: </b>"+movieInfo.movies[i].ratings.audience_score+",<br/>"+
									"<b>Summary: </b>"+ movieInfo.movies[i].synopsis+",<br/>"+
									"<b>Cast: </b>"+cast+"<hr>";//+
									//"<b>IMDB ID: </b>"+movieInfo.movies[i].alternate_ids.imdb+"<br/><hr>";	
					         	}			
								//element.innerHTML = element.innerHTML+"</ol>";
								//alert("output:"+element.innerHTML);
					        }
					        else
					            element.innerHTML="No movies found";
					    }
					    else
                            alert("Error -> xmlhttp status: " + xmlhttp.status);
					}
					//element.innerHTML = "<ol>"+element.innerHTML+"</ol>";
				};
		//	}  
        }
		

//$(document).on("pagecreate","#page4",function());        