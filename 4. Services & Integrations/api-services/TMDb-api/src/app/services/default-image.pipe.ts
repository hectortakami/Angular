import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "defaultImage"
})
export class DefaultImagePipe implements PipeTransform {
  transform(value: string): string {
    if (value) {
      return value;
    } else {
      return "../../assets/defaultPoster.jpg";
    }
  }
}
