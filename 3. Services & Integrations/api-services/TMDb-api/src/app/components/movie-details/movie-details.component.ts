import { Component, OnInit } from "@angular/core";
import { TmdbService } from "src/app/services/tmdb.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-movie-details",
  templateUrl: "./movie-details.component.html",
  styleUrls: ["./movie-details.component.scss"]
})
export class MovieDetailsComponent implements OnInit {
  movie: any;
  movieId: string;
  rating: any;
  missing: any;
  loading = false;

  constructor(
    private tmdbService: TmdbService,
    private paramRoute: ActivatedRoute
  ) {
    this.loading = true;
    this.paramRoute.params.subscribe(params => {
      this.movieId = params["movie_id"];
    });
    this.tmdbService.getMovie(this.movieId).subscribe(movieData => {
      this.movie = movieData;
      console.log(this.movie);
      this.rating = new Array(Math.round(Number(this.movie.vote_average)));
      this.missing = new Array(10 - this.rating.length);
      setTimeout(() => {
        this.loading = false;
      }, 200);
    });
  }

  ngOnInit(): void {}
}
