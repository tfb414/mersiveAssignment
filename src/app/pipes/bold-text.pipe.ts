import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'boldText'})
export class BoldTextPipe implements PipeTransform {
  transform(value: string, wordToBold: string): string {
    return value === wordToBold ? `<strong>${value}</strong>` : value;
  }
}
