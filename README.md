Yalantis Node.js School
Test task

# API

## Method Post

URL: http://localhost:3000/api/users

```
body: {
    firstName: "Test",
    lastName: "New",
    email: "test.new4@example.com"
}

response: {
    "id": "6117d9e557c18f9460d8b09f"
}
```

## Method Get All users

URL: http://localhost:3000/api/users

```
response: {
    [
        {
            "_id": "6117be582b3ba97c26c1588d",
            "firstName": "Test",
            "lastName": "Test",
            "email": "test@example.com",
            "__v": 0
        },
        {
            "_id": "6117d9e557c18f9460d8b09f",
            "firstName": "Test",
            "lastName": "New",
            "email": "test.new4@example.com",
            "__v": 0
        }
    ]
}
```

## Method Get one user

URL: http://localhost:3000/api/users?id=6117d9e557c18f9460d8b09f

```
response: {
    "_id": "6117d9e557c18f9460d8b09f",
    "firstName": "Test",
    "lastName": "New",
    "email": "test.new4@example.com",
    "__v": 0
}
```
