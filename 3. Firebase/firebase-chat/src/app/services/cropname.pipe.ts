import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "cropname"
})
export class CropnamePipe implements PipeTransform {
  transform(value: string): string {
    const words: string[] = value.split(" ");
    return words[0];
  }
}
