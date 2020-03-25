import { Component, OnInit } from "@angular/core";
import { SpotifyApiService } from "src/app/services/spotify-api.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
  artists: any[] = [];
  loading: boolean;

  constructor(private spotifyService: SpotifyApiService) {}

  ngOnInit(): void {}

  searchInSpotify(searchTerm: string) {
    this.loading = true;
    if (searchTerm.length == 0) {
      this.loading = false;
      return;
    } else {
      searchTerm = searchTerm.replace(" ", "_");
      this.spotifyService.search(searchTerm).subscribe(search_results => {
        this.artists = search_results;
        this.loading = false;
      });
    }
  }
}
