## Firebase (Realtime Database)

1. Create Firebase project
   https://console.firebase.google.com
2. Select `Start with the test mode`
3. Navigate `Database > Create Realtime Database > Rules` and verify all permission for I/O are set to true (this permissions allow anyone to read & write, must change in production env)

#### Firebase REST Usage

###### Note: Notice the ```.json``` termintation after calling all the HTTP Request Services, this is a mandatory usage for the API calls.

_firebase.service.ts_
```typescript