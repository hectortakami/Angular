## The Movies Database (TMDb) API

_tmdb.service.ts_

```typescript
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
// ...
export class TmdbService {
  tmdbUrl = "https://api.themoviedb.org/3";
  imgUrl = "https://image.tmdb.org/t/p/w500";
  apiKey = "3562a77d8968c9e30b3d1410e3812018";

  constructor(private http: HttpClient) {}

  // All methods goes here
}
```

1. Discover Top Rated Movies

   ```typescript
   getPopularMovies() {
   return this.http
     .get(
       `${this.tmdbUrl}/discover/movie?api_key=${this.apiKey}&sort_by=popularity.desc`
     )
     .pipe(
       map((response: any[]) => {
         response["results"].forEach(movie => {
           movie["poster_path"] = `${this.imgUrl}${movie["poster_path"]}`;
         });
         return response["results"];
       })
     );
   }
   ```

2. Get Movie

   ```typescript
   getMovie(movieID: string) {
    return this.http
      .get(
        `${this.tmdbUrl}/movie/${movieID}?api_key=${this.apiKey}&language=en-US`
      )
      .pipe(
        map(movie => {
          movie["poster_path"] = `${this.imgUrl}${movie["poster_path"]}`;
          return movie;
        })
      );
   }
   ```

3. Search movies
   ```typescript
   searchMovie(movieTitle: string) {
    movieTitle.replace(/\s/g, "%20");
    https: return this.http
      .get(
        `${this.tmdbUrl}/search/movie/?api_key=${this.apiKey}&language=en-US&query=${movieTitle}`
      )
      .pipe(
        map((response: any[]) => {
          response["results"].forEach(movie => {
            if (movie["poster_path"]) {
              movie["poster_path"] = `${this.imgUrl}${movie["poster_path"]}`;
            }
          });
          return response["results"];
        })
      );
   }
   ```
