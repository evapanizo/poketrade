
## Description

PokeTrade is a web application exclusively designed for Pokemon fans.   
Pokemon trainers from all over the world can have their own trainer profile as well as edit it! They can also make a trade list for other trainers to see. This trade list includes the Pokemon you offer and the ones you are interested in. 
PokeTrade also includes a search engine, where you check which trainers have the Pokemon you want in your team, so that you can contact them for trades and catch them all!
 
 
## User Stories
### Homepage
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup.
### Authentication
- **sign up** - As a user I want to sign up on the webpage so that I can access the app. 
- **login** - As a user I want to log in on the webpage so that I can get back to my account.
- **logout** - As a user I want to log out from the webpage so that I can make sure no one will access my account.
### Profile
- **profile** - As a user I want to show and edit my profile so that other users can learn about me and have my contact info.  
### Trades
- **trade list** - As a user I want to show and edit my trade list so that other users can learn my trade preferences.  
### Search engine
- **searh engine** - As a user I want to search a Pokemon I'm interested in so that I can find out which users might want to trade it. 
### Error control
- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault. 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault.

## Backlog
- Styles & animations. 
- Trainer's profile page. 
- Add upload profile picture option. 
- Add reset password option.
- Notifications.
- Add events. 
- Add pokemon details. 
- Get the PokeData from the PokeAPI and seed the database.
- Communication between trainers. 

## ROUTES:
### MVP
#### /
- GET /

Renders the homepage. 
#### /auth
- GET /auth/signup

Renders the signup form.
    
If user has logged in, redirects to /profile. 

- POST /auth/signup

Redirects to /profile if user has signed up correctly. 

Else, redirects to /signup. 

- GET /auth/login

Renders the login form.

If user has logged in, redirects to /profile. 

- POST /auth/login

If user has logged in correctly, redirects to /profile.

Else, redirects to /login. 

- POST /auth/logout

Redirects to /.

#### /trades 
- GET /trades

Renders the trade list page (protected).

- GET /trades/add

Renders the add pokemon form (protected).

- POST /trades/add

Redirects to trade list page (protected).

- GET /trades/edit

Renders the edit pokemon form (protected).

- POST /trades/edit

Redirects to trade list page (protected).

- POST /trades/delete

Redirects to trade list page (protected).

- GET /pokesearch

Renders the search engine page (protected).

- POST /pokesearch

Redirects to search results page (protected).

- GET /pokesearch/results

Renders the search results page (protected).

### Backlog
### /profile
- GET /profile

Renders the profile page (protected).

- GET /profile/edit

Renders the edit profile page (protected).

- POST /profile/edit

Redirects to profile page (protected).


### /pokemon/:pokemon
- GET /pokemon/:pokemon

Renders the pokemon details page (protected).

## Models

### Trainer

#### MVP
```
username: String
password: String
my_pokemon: Array of Pokemon IDs
wish_list: Array of Pokemon IDs
```
#### Backlog
```
Avatar: String // URL
Telegram: String
Gender: String
Description: String
Location: String
```
### Pokemon
#### MVP
```
name: String
image: String //URL
``` 
#### Backlog
```
trade-platform: String // Enum: Switch, PoGo, GBA, ...
game: String // Enum: Gold, Silver, Yellow, ...
``` 

## Links

### Trello

[Trello link](Pending)

### Git


[Repository Link](https://github.com/evapanizo/poketrade)

[Deploy Link](Pending)

### Slides


[Slides Link](Pending)