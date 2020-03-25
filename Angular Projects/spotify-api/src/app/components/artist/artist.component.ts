import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SpotifyApiService } from "src/app/services/spotify-api.service";

@Component({
  selector: "app-artist",
  templateUrl: "./artist.component.html",
  styleUrls: ["./artist.component.scss"]
})
export class ArtistComponent implements OnInit {
  artistID: string;
  artistData: any;
  artistTracks: any;
  loadingArtist: boolean;
  loadingTracks: boolean;

  constructor(
    private router: ActivatedRoute,
    spotifyService: SpotifyApiService
  ) {
    this.loadingArtist = true;
    this.loadingTracks = false;
    this.router.params.subscribe(params => {
      this.artistID = params.artist_id;
    });
    spotifyService.getArtist(this.artistID).subscribe(artist => {
      this.artistData = artist;
      this.loadingArtist = false;
      this.loadingTracks = true;
    });
    spotifyService.getArtistTopTracks(this.artistID).subscribe(tracks => {
      this.artistTracks = tracks;
      this.loadingTracks = false;
    });
  }

  ngOnInit(): void {}
}
