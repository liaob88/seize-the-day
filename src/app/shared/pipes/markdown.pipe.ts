import { Pipe, PipeTransform } from "@angular/core";
import * as marked from "marked";

@Pipe({
  name: "markdown"
})
export class MarkdownPipe implements PipeTransform {
  markDown(md: string) {
    return marked(md);
  }

  transform(value: string): any {
    return this.markDown(value);
  }
}
