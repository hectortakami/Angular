import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Pipe({
  name: "sanitize"
})
export class SanitizePipe implements PipeTransform {
  spotify_url = "https://open.spotify.com/embed/track/";
  constructor(private _domSanitizer: DomSanitizer) {}

  transform(track_id: unknown): SafeResourceUrl {
    return this._domSanitizer.bypassSecurityTrustResourceUrl(
      `${this.spotify_url}${track_id}`
    );
  }
}
