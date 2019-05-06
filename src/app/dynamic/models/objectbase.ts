export class ObjectBase<T> {
  value: T;
  id: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  regex: string;  
  model: string;
  optionvalues: [];
  maskType: string;
  maxLength: number;
  regexerrmes: string;
  readonlycriteria: string;
  class: string;
  information: string;
  placeholder: string;
  requiredErrorMessage: string;
  cascading: boolean;

  constructor(options: {
      value?: T,
      id?: string,
      label?: string,
      required?: boolean,
      order?: number,
      controlType?: string,
      regex?: string,    
      model?: string,
      optionvalues?: [],
      maskType?: string,
      maxLength?: number,
      regexerrmes?: string,
      readonlycriteria?: string,
      information?: string,
      placeholder?: string,
      class?: string,
      requiredErrorMessage?: string
      
  cascading?: boolean
    } = {}) {
    this.value = options.value;
    this.id = options.id || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.regex = options.regex || '';    
    this.optionvalues = options.optionvalues || [];
    this.maskType = options.maskType || '';
    this.maxLength = options.maxLength === undefined ? 1000 : options.maxLength;
    this.regexerrmes = options.regexerrmes || '';
    this.readonlycriteria = options.readonlycriteria || 'false';
    this.class = options.class || '';
    this.information = options.information || '';
    this.placeholder = options.placeholder || '';
    this.requiredErrorMessage = options.requiredErrorMessage || '';
    this.cascading = !!options.cascading;
  }
}
