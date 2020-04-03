import { Component, OnInit } from "@angular/core";
import { TmdbService } from "src/app/services/tmdb.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
  movies: any[] = [];
  loading = false;

  constructor(private tmdbService: TmdbService) {}

  ngOnInit(): void {}

  searchTitle(searchTerm: string) {
    if (searchTerm.length <= 0) {
      this.movies = [];
      this.loading = false;
    } else {
      this.loading = true;
      this.tmdbService.searchMovie(searchTerm).subscribe(moviesResult => {
        this.movies = moviesResult;
        this.loading = false;
      });
    }
  }
}
