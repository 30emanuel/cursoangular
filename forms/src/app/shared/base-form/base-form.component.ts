import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-base-form',
  template: '<br>'
})
export abstract class BaseFormComponent implements OnInit {

  formulario!: FormGroup

  constructor() { }

  ngOnInit(): void {
  }

  abstract submit():any

  onSubmit(): void{
    if(this.formulario.valid){
      this.submit()
    }else{
      console.log('formulario invalido')
      this.verificaValidacoesForm(this.formulario)
    }
  }

  verificaValidacoesForm(formGroup: FormGroup | FormArray){
    Object.keys(formGroup.controls).forEach(campo =>{
      console.log(campo)
      const controle = formGroup.get(campo)
      controle?.markAsDirty()
      controle?.markAsTouched()
      if(controle instanceof FormGroup || controle instanceof FormArray){
        this.verificaValidacoesForm(controle)
      }
    })
  }

  resetar(){
    this.formulario.reset()
  }

  verificaValidTouched(campo: string){
    return !this.formulario.controls[campo].valid && this.formulario.controls[campo].touched
  }

  aplicaCssErro(campo: string){
    return {
      'erro': this.verificaValidTouched(campo),
    }
  }

  getCampo(campo: string){
    return this.formulario.get(campo)
  }

}
