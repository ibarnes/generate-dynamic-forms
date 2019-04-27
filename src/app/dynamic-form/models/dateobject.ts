import { ObjectBase } from './objectbase';

export class DateObject extends ObjectBase<string> {
  controlType = 'date';
  type: string;
  value: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
