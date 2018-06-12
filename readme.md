# JWT Service
This Jwt Service which will generate JWT token

### Installation/Setup

Install latest version of [Node.js](https://nodejs.org/)

Install the dependencies 

```sh
$ cd jwtservice
$ npm install
$ [sudo] npm install forever -g
```

To run the application

```
update the config.json with clientId and clientSecreat
$ forever start app.js
```

Request and Response
```
Request:

curl -X POST \
  http://localhost:3000/api/v1/users/sts \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
	"identity":"xxxxx",
	"clientId":"xxxxxxx",
	"aud":"xxxxxx",
	"isAnonymous":"true"
}'

Response:
{
    "jwt": "xxxxxxx"
}
```