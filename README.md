# PopcornPal <a name="top"></a>
<img align="right" src="images/moviecamera.svg" alt="Movie Camera" width="140"/>
PopcornPal is a full-stack web application for movie enthusiasts who enjoy reading information about movies. It allows users to explore a diverse collection of movies, learn about movie directors and genres, and manage favorite movies if registered.

## Features

- **Browse Movies:** Browse through a wide collection of movies.
- ~~Search: Search for specific movies by title or genre.~~ [Under Development]
- **Movie Details:** Access information on a movie, including the plot summary and details about the directors.
- **User Registration:** Create an account by providing a username, password, and email address.
- **User Profile Management:** Registered users can modify their profile information.
- **Personalized Experience:** Users can add and remove movies in their "My Favorites" list.

## Technologies & Dependencies
### Frontend
<strong>React:</strong> A JavaScript library for building responsive user interfaces with a component-based approach, optimizing performance through virtual DOM for seamless updates and rendering.

### Backend
<strong>Node.js:</strong> The runtime environment for the PopcornPal project, handling HTTP requests and routing clients to the appropriate API endpoints.

<strong>Express.js:</strong> Works alongside Node.js to handle HTTP requests, define routes, and implement middleware to manage various aspects of the project.

### Database
<strong>MongoDB:</strong> The database management system for handling the storage and retrieval of data related to movies and users.

### Other
<strong>Mongoose:</strong> Interacts with the MongoDB database to define schemas, validate structures of movie and user documents, and employs query methods to locate matching records.

<strong>JWT/JSON Web Token:</strong> Generates tokens at user login for secure, stateless authorization.

<strong>Passport.js:</strong> Works alongside JWT authentication to handle authentication and authorization between endpoints on the web server.

<strong>Bcrypt:</strong> Enables secure login authentication by hashing users' passwords for enhanced security.

##
[Back to top](#top)
