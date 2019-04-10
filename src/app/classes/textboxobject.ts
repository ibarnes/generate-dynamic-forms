import { ObjectBase } from './objectbase';

export class TextboxObject extends ObjectBase<string> {
  controlType = 'textbox';
  type: string;
  value: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}