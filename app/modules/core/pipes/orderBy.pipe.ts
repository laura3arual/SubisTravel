import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({name: 'orderBy'})
export class OrderBy implements PipeTransform {

    transform(arr: any[], orderFields: string[]): any {
        console.log(arr);
        orderFields.forEach(function(currentField: string) {
            var orderType = 'ASC';

            if (currentField[0] === '-') {
                currentField = currentField.substring(1);
                orderType = 'DESC';
            }

            arr.sort(function(a, b) {
                return (orderType === 'ASC') ?
                    (a[currentField] < b[currentField]) ? -1 :
                        (a[currentField] === b[currentField]) ? 0 : 1 :
                    (a[currentField] < b[currentField]) ? 1 :
                        (a[currentField] === b[currentField]) ? 0 : -1;
            });

        });
        return arr;
    }
}