import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pjson'
})
export class PretyJsonPipe implements PipeTransform {

  transform(obj: any, space?: number): any {
    if (!space) {
      space = 2;
    }
    return JSON.stringify(obj, null, space);
  }

}
