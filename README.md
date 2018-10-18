
## Description

PokeTrade is a web application exclusively designed for Pokemon fans.   
Pokemon trainers from all over the world can have their own trainer profile as well as edit it! They can also make a trade list for other trainers to see. This trade list includes the Pokemon you offer and the ones you are interested in. 
PokeTrade also includes a search engine, where you check which trainers have the Pokemon you want in your team, so that you can contact them for trades and catch them all!
 
 
## User Stories
### Homepage
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup.
### Authentication
- **sign up** - As a user I want to sign up on the webpage so that I can access the app. 
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account.
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account.
### Profile
- **profile** -
### Trades
- **trade list** -
### Search engine
- **searh engine** -
### Error control
- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault. 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault.


## Backlog
- 

## ROUTES:
### MVP
#### /
- GET /
    Renders the homepage. 
#### /auth
- GET /auth/signup
    Renders the signup form (with flash msg).
    If user has logged in, redirects to /profile. 
- POST /auth/signup
    Redirects to /profile if user has signed up correctly. 
- GET /auth/login
    Renders the login form (with flash msg).
    If user has logged in, redirects to /profile. 
- POST /auth/login
    If user has logged in correctly, redirects to /profile. 
    Else, redirects to /login. 
- POST /auth/logout
    Redirects to /.
#### /trades 
- GET /trades
- GET /trades/add
- POST /trades/add
- GET /trades/edit
- POST /trades/edit
- POST /trades/delete
- GET /pokesearch
- POST /pokesearch
- GET /pokesearch/results

### Backlog
### /profile
- GET /profile
    Renders the profile page if the user is logged in. 
    Else, redirects to /. 
- GET /profile/edit
- POST /profile/edit
### /pokemon/:pokemon
- GET /pokemon/:pokemon

## Models

### Trainer
 
```
username: String
password: String
etc
```

### Pokemon

```
name: String
etc
``` 

## Links

### Trello

[Trello link](Pending)

### Git


[Repository Link](https://github.com/evapanizo/poketrade)

[Deploy Link](Pending)

### Slides


[Slides Link](Pending)