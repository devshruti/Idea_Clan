# Idea Clan Assignment

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Deployment](#deployment)


## Deployment

deployed link: https://idea-clan-s5zm.onrender.com

## Installation

1. Clone the repository: git clone https://github.com/devshruti/Idea_Clan.git
2. Install dependencies:  npm install
3. Set up environment variables:
Create a `.env` file in the root directory and add the following variables:
port=8080
mongo_URI=your_database_url
secretKey=your_secret_key
refreshSecretKey=your_refrshsecret_key



## Usage

1. Start the server: npm run start
2. Access the API endpoints: Base URL: http://localhost:8080
3. Available endpoints:
- `/user/register` (POST): Register a new user.
- `/user/login` (POST): Login with username and password.
- `/post/create` (POST): Create a new post.
- `/post/` (GET): Retrieve all posts.
- `/relation/follow`(POST): To Follow.
- `/relation/unfollow`(POST): To Unfollow.
- `/graphql` (POST): Access GraphQL API.

## Testing

To test the API endpoints, you can use tools like Postman or Thunder Client. Here are some sample requests:

### Register User
POST /user/register
{
"username": "example_user",
"email": "user@example.com",
"password": "password123"
}


### Login
POST /user/login
{
"email": "user@example.com",
"password": "password123"
}


### Create Post
POST /post/create
{
"content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
}



