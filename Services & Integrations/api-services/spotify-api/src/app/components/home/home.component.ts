import { Component, OnInit } from "@angular/core";
import { SpotifyApiService } from "src/app/services/spotify-api.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  newReleases: any[] = [];
  loading: boolean;
  errorMsg: string;

  constructor(private spotifyService: SpotifyApiService) {
    this.errorMsg = "";
  }

  ngOnInit(): void {
    this.loading = true;
    this.spotifyService.newReleases().subscribe(
      spotify_new_releses => {
        this.newReleases = spotify_new_releses;
        this.loading = false;
      },
      error => {
        this.errorMsg = error["error"]["error"]["message"];
      }
    );
  }
}
