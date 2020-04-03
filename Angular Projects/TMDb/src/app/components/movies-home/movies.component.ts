import { Component, OnInit } from "@angular/core";
import { TmdbService } from "src/app/services/tmdb.service";

@Component({
  selector: "app-movies",
  templateUrl: "./movies.component.html",
  styleUrls: ["./movies.component.scss"]
})
export class MoviesComponent implements OnInit {
  movies: any[] = [];
  loading = false;

  constructor(private tmdbService: TmdbService) {
    this.loading = true;
    this.tmdbService.getPopularMovies().subscribe(dbMovies => {
      this.movies = dbMovies;
      this.loading = false;
    });
  }

  ngOnInit(): void {}
}
