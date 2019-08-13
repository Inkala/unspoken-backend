# Unspoken

## Description

An app to share thoughts and feelings and support others. People can create their profile, post their messages, react to other people's posts and leave comments on them.

## Models

**User model**

```
username - String // required // unique
password - String // required
messages - [ObjectID<Messages>]
```

**Message model**

```
message - String // required
likes - [ObjectID<likes>]
reactions - [ObjectID<reactions>]
comments - [ObjectID<comments>]
```

**Likes model**

```
userId - ObjectID<User> // required
new - Boolean
```

**Reactions model**

```
userId - ObjectID<User> // required
new - Boolean
```

**Comments model**

```
comment - String // required
userId - ObjectID<User> // required
new - Boolean
```

## API Endpoints/Backend Routes

## Routes

### Auth

- **GET** /auth/me
- **POST** /auth/signup
  - body:
    - username
    - password
  - if username or password empty 
    - req.status(422).json({message: 'Both fields are required'})
  - if username found 
    - req.status(422).json({message: 'The username is already taken'})
- **POST** /auth/login
  - body:
    - username
    - password
  - if username not found
    - req.status(404).json({message: 'Username not found})
  - if password incorrect
    - req.status(401).json({message: 'Wrong password})
- **POST** /auth/logout
  - body: (empty)

### Profile

- if not logged in
  - req.status(403).json({message: 'Not logged in})
- **GET** /profile/
- **GET** /profile/messages
- **GET** /profile/likes
- **GET** /profile/reactions

### Messages

- **GET** /messages/
- **POST** /messages/new
  - body:
    - userId
    - message
  - if message is empty
    - req.status(422).json({message: 'This field is required'})
- **PUT** /messages/:id/edit
  - body:
    - userId
    - message
  - if userId not equal session id
    - req.status(401).json({message: 'Permission denied'})
  - if message is empty
    - req.status(422).json({message: 'This field is required'})
- **DELETE** /messages/:id/delete
  - body: (empty)
  - if userId not equal session id
    - req.status(401).json({message: 'Permission denied'})
- **GET** /messages/:id/comments
  - if id not found 
    - req.status(404).json({message: 'message not found'})
- **GET** /messages/:id/likes
  - if id not found 
    - req.status(404).json({message: 'message not found'})
- **GET** /messages/:id/reactions
  - if id not found 
    - req.status(404).json({message: 'message not found'})

### Likes

- **POST** /likes/:messageId
  - body: (empty)
  - if not message found 
    - req.status(404).json({message: 'message not found'})
  - if no session id
    - req.status(401).json({message: 'Permission denied'})
- **DELETE** /likes/:id/delete
  - body: (empty)
  - if not message found 
    - req.status(404).json({message: 'message not found'})
  - if no session id
    - req.status(401).json({message: 'Permission denied'})

### Reactions

- **POST** /reactions/:messageId
  - body: (empty)
  - if not message found 
    - req.status(404).json({message: 'message not found'})
  - if no session id
    - req.status(401).json({message: 'Permission denied'})
- **DELETE** /reactions/:id/delete
  - body: (empty)
  - if not message found 
    - req.status(404).json({message: 'message not found'})
  - if no session id
    - req.status(401).json({message: 'Permission denied'})

### Comments

- **POST** /comments/:messageId
  - body:
    - userId
    - message
  - if not message found 
    - req.status(404).json({message: 'message not found'})
  - if no session id
    - req.status(401).json({message: 'Permission denied'})
      - if message is empty
    - req.status(422).json({message: 'This field is required'})
- **DELETE** /comment/:id/delete
  - body: (empty)
  - if not message found 
    - req.status(404).json({message: 'message not found'})
  - if no session id
    - req.status(401).json({message: 'Permission denied'})

## Links

### Git

[Frontend repository](https://github.com/Inkala/unspoken)
