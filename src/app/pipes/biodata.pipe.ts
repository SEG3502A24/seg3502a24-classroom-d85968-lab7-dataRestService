import { Pipe, PipeTransform } from '@angular/core';
import { Bio } from '../authors/model/author';

@Pipe({
  name: 'biodata',
  standalone: true
})
export class BiodataPipe implements PipeTransform {

  transform(value: Bio[] | undefined): string {
    if (value == null) return '';
    return value.map((bio) => `${bio.biodata}`).join(' <b>and</b> ');
  }

}
