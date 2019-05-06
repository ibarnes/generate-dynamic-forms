import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dropdownFilter'
})
export class DropdownFilterPipe implements PipeTransform {
  transform(items: any[], dependsOn: string, cascaded_parent: string, cascading: boolean): any {
    //return items;
    if (cascaded_parent && cascading) {
      console.log(dependsOn);
      console.log(cascaded_parent);
      console.log(cascading);
      console.log(items);
      return items.filter(f => f.has_parent === 'Y' && f.cascaded_parent === cascaded_parent);
    }
    else {
      return items;
    }
  }
}
