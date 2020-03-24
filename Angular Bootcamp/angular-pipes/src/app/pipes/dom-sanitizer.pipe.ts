import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Pipe({
  name: "domSanitizer"
})
export class DomSanitizerPipe implements PipeTransform {
  constructor(private _domSanitizer: DomSanitizer) {}
  transform(value: string): SafeResourceUrl {
    return this._domSanitizer.bypassSecurityTrustResourceUrl(value);
  }
}
