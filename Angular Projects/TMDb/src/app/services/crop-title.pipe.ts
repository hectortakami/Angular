import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "cropTitle"
})
export class CropTitlePipe implements PipeTransform {
  transform(value: string): string {
    if (value.includes("(")) {
      let title = "";
      const words = value.split(" ");
      for (let i = 0; i < words.length; i++) {
        if (words[i].startsWith("(")) {
          break;
        }
        title += words[i] + " ";
      }
      value = title;
    }
    return value;
  }
}
