import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "password"
})
export class PasswordPipe implements PipeTransform {
  transform(value: string, ...args: boolean[]): string {
    if (args[0]) {
      return "★".repeat(value.length);
    } else {
      return value;
    }
  }
}
