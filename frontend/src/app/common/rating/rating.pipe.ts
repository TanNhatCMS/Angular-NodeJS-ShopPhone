import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  standalone: true,
  name: 'formatRating'
})
export class RatingPipe implements PipeTransform {

  transform(value: any): any {
    return Math.floor(value / 2);
  }

}
