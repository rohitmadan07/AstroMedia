
# AstroMedia

AstroMedia is a web application that brings together astronomers from all corners of the universe. If you've ever gazed up at the night sky and felt the wonder of the cosmos, this platform is tailor-made for you. It is a platform to connect, share and explore the beauty of the universe together.

The project is deployed at the following link:-
https://astromedia.netlify.app/
(Backend is hosted on GCP)



## Features

- User Authentication and Authorization:- Users can create an account and login to the platform to access the below features. Without logi, User can only view the posts.
- CRUD:- Users can Create, Read, Update and Delete posts. Update and Delete functions are limited to posts created by the user. 
- Like and Comment:- Users can also like and comment on a particular post (given that they are logged in).
- Searching:- Particular posts can be searched by title or tags. Further all the posts are paginated and users can view particular pages as well.


## Screenshots
**Landing Page**
![Landing Page](https://i.imgur.com/xSAAz8A.png)

**After Login**
![After login](https://i.imgur.com/PenC6hZ.png)

**Search**
![Search](https://i.imgur.com/jIGaZTM.png)


**Individual Post**
![Post](https://i.imgur.com/YWh43GZ.png)


**Comment on Post**
![Comment](https://i.imgur.com/4um5wnB.png)

**You might also like this Section**
![Like](https://i.imgur.com/354ORfH.png)

**Signup Page**
![Signup](https://i.imgur.com/viAOoaw.png)

## Run Locally

Clone the project

```bash
  git clone https://github.com/rohitmadan07/AstroMedia.git
```

Go to server in the project directory

```bash
  cd server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

Go to client in the project directory

```bash
  cd client
```

Install dependencies

```bash
  npm install
```

Start the project (view locally)
```bash
  npm start
```
## Future Scope
- Integration of Google OAuth to the signin/signup page for user authentication and authorisation.
