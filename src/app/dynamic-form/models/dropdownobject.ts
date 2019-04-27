import { ObjectBase } from './objectbase';

export class DropDownObject extends ObjectBase<string> {
  controlType = 'dropdown';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}