import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Cursos2Service } from '../cursos2.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.css']
})
export class CursosFormComponent implements OnInit {

  form!: FormGroup
  submitted = false

  constructor(
    private formBuilder: FormBuilder,
    private service: Cursos2Service,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {

    //this.route.params
    //.pipe(
    //  map((params: any) => params['id']),
    //  switchMap(id => this.service.loadById(id))
    //)
    //.subscribe(curso => this.updateForm(curso))

    const curso = this.route.snapshot.data['curso']

    this.form = this.formBuilder.group({
      id: [curso.id],
      nome: [curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
    })
  }

  //updateForm(curso: any){
  //  this.form.patchValue({
  //    id: curso.id,
  //    nome: curso.nome
  //  })
  //}

  hasError(field: string){
    return this.form.get(field)?.errors
  }

  onSubmit(){
    this.submitted = true
    console.log(this.form.value)

    if(this.form.valid){
      let msgSuccess = 'Curso criado com sucesso.'
      let msgError = 'Erro ao criar curso, tente novamente.'
      if(this.form.value.id){
        msgSuccess = 'Curso atualizado com sucesso.'
        msgError = 'Erro ao atualizar curso, tente novamente.'
      }
      this.service.save(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess(msgSuccess)
          this.location.back()
        },
        error => {
          this.modal.showAlertDanger(msgError)
        }
      )
    }
  }
  
  onCancel(){
    this.submitted = true
    this.form.reset()
    //console.log('onCancel')
  }

}
