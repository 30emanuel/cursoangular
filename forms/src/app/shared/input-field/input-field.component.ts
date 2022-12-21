import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const INPUT_FIELD_VALUE_ACESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputFieldComponent),
  multi: true
}

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css'],
  providers: [INPUT_FIELD_VALUE_ACESSOR]
})
export class InputFieldComponent implements ControlValueAccessor {

  @Input() classeCss: any
  @Input() id: string = ''
  @Input() label: string = ''
  @Input() type: string = 'text'
  @Input() control: any
  @Input() isReadyOnly = false

  private innerValue: any

  get value(){
    return this.innerValue
  }

  set value(v: any){
    if(v !== this.innerValue){
      this.innerValue = v
      this.onChangeCb(v)
    }
  }

  onChangeCb: (_: any) => void = () => {}
  onTouchedCb: (_: any) => void = () => {}

  constructor() { }
  writeValue(v: any): void {
    this.value = v
  }
  registerOnChange(fn: any): void {
    this.onChangeCb = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isReadyOnly = isDisabled
  }


}
