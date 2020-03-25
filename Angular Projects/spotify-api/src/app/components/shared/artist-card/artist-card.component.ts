import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-artist-card",
  templateUrl: "./artist-card.component.html",
  styleUrls: ["./artist-card.component.scss"]
})
export class ArtistCardComponent implements OnInit {
  @Input() artists: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  redirectArtist(artist: any) {
    if (artist.type == "album") {
      this.router.navigate(["/artist", artist["artists"]["0"]["id"]]);
    }
    if (artist.type == "artist") {
      this.router.navigate(["/artist", artist["id"]]);
    }
  }
}
