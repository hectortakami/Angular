# Spotify API

### Usage

1. ###### Create a Spotify Application

   https://developer.spotify.com/dashboard/

2. ###### Generate Token (Postman)

   https://developer.spotify.com/documentation/general/guides/authorization-guide/

Postman Request

```
Request: POST
URL: https://accounts.spotify.com/api/token
Body: application/x-www-form-urlencoded

KEY               Value
grant_type        client_credentials
client_id         <SPOTIFY_CLIENT_ID>
client_secret     <SPOTIFY_CLIENT_SECRET>
```

Postman Response

```
{
   "access_token":"<SPOTIFY_ACCESS_TOKEN>",
   "token_type":"Bearer",
   "expires_in":3600,
   "scope":""
}
```

_Note: This token is only valid 1 hour_

### API Requests

- Get a List of New Releases

  ```
   Request: GET
   URL: https://api.spotify.com/v1/browse/new-releases?limit=<no.registers>

   Headers
   KEY               Value
   Authorization     Bearer <SPOTIFY_ACCESS_TOKEN>
  ```

- Search in Spotify

  ```
   Request: GET
   URL: https://api.spotify.com/v1/search?q=$<search_term>&type=track%2Cartist&market=US&limit=12&offset=5`

   Headers
   KEY               Value
   Authorization     Bearer <SPOTIFY_ACCESS_TOKEN>
  ```

- Get an Artist

  ```
   Request: GET
   URL: https://api.spotify.com/v1/artists/<artist_id>`

   Headers
   KEY               Value
   Authorization     Bearer <SPOTIFY_ACCESS_TOKEN>
  ```

- Get Artist Top Tracks

  ```
   Request: GET
   URL: https://api.spotify.com/v1/artists/<artist_id>/top-tracks?country=<country_code>`

   Headers
   KEY               Value
   Authorization     Bearer <SPOTIFY_ACCESS_TOKEN>
  ```
