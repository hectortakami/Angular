# TypeScript Cheat Sheet

#### Searching

1. ###### Find if a search term is in our database
   _String containing a substring_
   ```javascript
   array.forEach(value => {
     // Use ' .includes() ' function
     if (value.includes(searchTerm)) {
       //   TODO when we find a        coincidence
     }
   });
   ```

#### Dates

1. ###### Full current date

   ```javascript
   year = new Date();
   // Mon Mar 23 2020 20:23:31 GMT-0600    (hora estándar central)
   ```

2. ###### Get the current year

   ```javascript
   year = new Date().getFullYear();
   // 2020
   ```
