import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'genderFilter',
})
export class GenderFilter implements PipeTransform {

    transform(items: any[], filter: string[]): any {
        if (!items || !filter) {
            return items;
        }
        return items.filter(item => filter.indexOf(item.gender) !== -1);
    }
}
