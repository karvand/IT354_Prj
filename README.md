IT-354 Project
Movie Finder

Description:
Movie Finder is a mobile application that can be used for finding information about movies and movie theaters. The user can search for movies based on a keyword and find detailed information and latest reviews about it. The application is also capable of showing the top 10 movies in the box office and their complete profile. 
Another functionality of movie finder is searching for movie theaters based on a given zip code and displaying the full information about them as well as the route from user’s current location to the closest theater.
The application consumes RESTful API’s to retrieve the mentioned information.

The following technologies have been used for building this application:
•	PhoneGap: An open source mobile application framework which is owned by Adobe and enables creating mobile apps using standardized web APIs for different platforms. It includes different services such as PhoneGap Build that packages mobile apps in the cloud and PhoneGap Desktop which is an alternative to Phonegap CLI(Command Line Interface). Both of the mentioned services have been used in this application.
•	jQuery Mobile: A powerful UI framework designed to make responsive apps that are accessible on all smartphone, tablet and desktop devices
•	GitHub: A web based Git repository that enables distributed revision control and source code management. 
•	Restful Web Services(API’s)
•	Rotten Tomatoes: A free web service that provides information about movies in json/xml format
•	Fandango : A free web service that provides information about movies theaters in xml format
•	Google Maps: A free API that enables customizing maps, and the  information on maps
•	XMLHttpRequest (XHR): A Javascript object which is used to communicate asynchronously with a server-side component and dynamically update the source of an HTML page based on the resulting response.
•	Coda: A web development application framework for MAC OS X

Application Walkthrough
1.	When user opens the homepage, he or she will see the top 10 box office movies.
2.	When user clicks on any of the movie icon, the user will be provided with information of the selected movie. Such as Movie name, rating, runtime, release date critics and audience score, summary etc.
3.	Now when the search box is empty and if the user clicks on the find movie button then the application will notify the user to enter the name of the movie.
4.	When the user types the keyword related to the movie, the application will give top 30 results that match that keyword.
5.	However if user searches for a movie with exact name then the application will show result of that movie only.
6.	When user click on the review the application will give top 30 review of that movie.
7.	The box office tab will give you the list of top 10 box office movies and if the user wants to search for these movies then he needs to go back to the home page and search for that movie.
8.	Another tab is theatre. Here when the user types the zip code and click on theatre button, the application will provide list of all the theaters and the movies that they are showing at present. 
9.	Now when the user clicks on get directions, the application will take user to the Google map. Now when user again clicks on get directions the application will show the driving route from the user current location to the first movie theatre that was on the list.

Team Members: Amitesh Jain, Kaveh Arvand
