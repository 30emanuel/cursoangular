import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.css']
})
export class CursosFormComponent implements OnInit {

  form!: FormGroup
  submitted = false

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
    })
  }

  hasError(field: string){
    return this.form.get(field)?.errors
  }

  onSubmit(){
    this.submitted = true
    console.log(this.form.value)
    if(this.form.valid){
      console.log('submit')
    }
  }
  
  onCancel(){
    this.submitted = true
    this.form.reset()
    //console.log('onCancel')
  }

}
