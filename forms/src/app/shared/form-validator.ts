import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn } from "@angular/forms"

export class FormValidations{
  static minSelectedCheckboxes(min:number = 1) {
      const validator: ValidatorFn = (formArray: AbstractControl) => {
        if (formArray instanceof FormArray) {
          const totalSelected = formArray.controls
            .map((control) => control.value)
            .reduce((prev, next) => (next ? prev + next : prev), 0)
          return totalSelected >= min ? null : { required: true }
        }
        throw new Error('formArray is not an instance of FormArray')
      }
      return validator
    }
  static cepValidator(control: FormControl){
    const cep = control.value
    if(cep && cep !== ''){
      const validacep = /^[0-9]{5}-[0-9]{3}$/
      return validacep.test(cep) ? null : { cepInvalido : true}
    }
    return null
  }

  static equalsTo(otherField: string){
    function validator(formControl: AbstractControl) {
      if(otherField == null){
        throw new Error('é necessario informar um campo.')
      }

      if(!formControl.root || !(<FormGroup>formControl.root).controls){
        return null
      }

      const field = (<FormGroup>formControl.root).get(otherField)
      if(!field){
        throw new Error('é necessario informar um campo valido.')
      }

      if(field.value !== formControl.value){
        return {equalsTo : otherField}
      }
      return null
    }
    return validator
  }
}