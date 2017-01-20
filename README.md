# ExpressJS-OAuth2-Client-Credentials

Project ini menggunakan authentikasi OAuth2 dengan type client credentials

## Cara Menggunakan :

* Download dependency dengan perintah `npm install`
* jalankan dengan perintah `node app.js`
* jalankan perintah berikut untuk mendaftarkan user anda :

```
curl -H "Content-Type: application/json" -X POST -d '{"client_name": "rizkimufrizal", "client_website": "rizkimufrizal.github.io" }' http://localhost:3000/client
```

Jika berhasil maka akan muncul output json seperti berikut.

```
{
  "status":true,
  "info":{
    "__v":0,
    "client_id":"12fa01d1-23e9-465b-8645-291bc819b31c",
    "client_secret":"c84af793-7d69-43a1-85c8-e73af9850b1e",
    "client_name":"rizkimufrizal",
    "client_website":"rizkimufrizal.github.io",
    "_id":"5881d433a016824dfe47efa6"
  }
}
```

Silahkan simpan client_id dan client_secret yang nantinya berfungsi untuk penukaran dengan access_token dan refresh_token. Untuk mendapatkan access_token dan refresh_token, silahkan jalankan perintah berikut.

```
curl -v -H "Content-Type: application/json" -X POST http://localhost:3000/oauth/token -u <clientId>:<clientSecret> -d '{"grant_type": "client_credentials"}'
```

Contohnya :

```
curl -v -H "Content-Type: application/json" -X POST http://localhost:3000/oauth/token -u 12fa01d1-23e9-465b-8645-291bc819b31c:c84af793-7d69-43a1-85c8-e73af9850b1e -d '{"grant_type": "client_credentials"}'
```

Jika berhasil maka akan muncul access_token dan refresh_token seperti berikut.

```
{
  "access_token": {
    "access_token": "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiIxMmZhMDFkMS0yM2U5LTQ2NWItODY0NS0yOTFiYzgxOWIzMWMiLCJpYXQiOjE0ODQ5MDM3NTJ9.iJJrgVBtA0U-bvvmKXIYcaLvawd9nJaGP9p9wzaAxaY5UImFCKqtZABGk-oeL_-d_13GmzIyA_l2WOhnNP_O1Zk7NRbzIgz7bX17uNJvcXk-HY_jFKoxBpkEhPkHIy93EWm1wLTyR35xtHfImDi4CNe3r0UrVNA1PhJF0MrRCaZEdQSUlcUXny9PzOD8o6kTk6H5SUEXgb-YO0dQGF7FzZrw2TOmSMtBDujiLSGUxQFWS9_gQeAdMFd2bp1TbuYfSzEFhXcMwrometP6uThPT2PK5Tn5gmJhiZDrRxbmgkRs5m8KEKON0beBWb9JWFjlFjNMdZphVLf7QCMEF-WZzg",
    "refresh_token": "IZIacLF4S93k8fek0FtMspHhFVqsBfBQiShXsbmoiUxWg82ng4JW7UxJi3OpeUH1DUF0EUlBC2OyadyguX6xNNp5AFZ7lfxf7IYgZdXYpmKUHAeAQktaBVHcB6Bp7aecmwUmVAxNnhvXX81fjzuy2dDk9FMSB0EKZsNYcZniPE8Yp7jGtlJNKrX1SnlurW4MPmBXRqP86rBCH9RTFmcLzEh9ws2wPDhtdqLYQGe7X7vsUXEb55yP799UV3GXJSTHyUVREtiQJ6OiTVVQq1bLpnRU0ixjf1TSeDaKVAkY0SvIcO1qt54zTqFBMerbC0RvZeicJbKkVl0fNzrkjMcEzKbP8AaCGszbDhp8zZnxoWQIbCzKtTPPxnYpZRTZyIe4w7Dv1As3O9otucTvPDjz2VIr3X3RZWKjTk31gBD3iVaUI8JVjxJ5koBiPBKCL2tV0c0eUjDCxHOLev59OEpLPIURhPppDK7HfsjhkkcL5CGNcqyhHd26WAxx70U5NbOS",
    "expires_in": 3600
  },
  "token_type": "Bearer"
}
```

Kemudian anda dapat mengakses resource tersebut dengan perintah seperti berikut.

```
curl -X GET http://localhost:3000/restricted -v -H "Authorization: Bearer <accessToken>"
```

Contohnya :

```
curl -X GET http://localhost:3000/restricted -v -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiIxMmZhMDFkMS0yM2U5LTQ2NWItODY0NS0yOTFiYzgxOWIzMWMiLCJpYXQiOjE0ODQ5MDM3NTJ9.iJJrgVBtA0U-bvvmKXIYcaLvawd9nJaGP9p9wzaAxaY5UImFCKqtZABGk-oeL_-d_13GmzIyA_l2WOhnNP_O1Zk7NRbzIgz7bX17uNJvcXk-HY_jFKoxBpkEhPkHIy93EWm1wLTyR35xtHfImDi4CNe3r0UrVNA1PhJF0MrRCaZEdQSUlcUXny9PzOD8o6kTk6H5SUEXgb-YO0dQGF7FzZrw2TOmSMtBDujiLSGUxQFWS9_gQeAdMFd2bp1TbuYfSzEFhXcMwrometP6uThPT2PK5Tn5gmJhiZDrRxbmgkRs5m8KEKON0beBWb9JWFjlFjNMdZphVLf7QCMEF-WZzg"
```

Jika berhasil maka muncul pesan seperti berikut.

```
Yay, you successfully accessed the restricted resource!
```
