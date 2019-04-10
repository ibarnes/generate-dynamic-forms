import { ObjectBase } from './objectbase';

export class RadioButtonObject extends ObjectBase<string> {
  controlType = 'radiobutton';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
