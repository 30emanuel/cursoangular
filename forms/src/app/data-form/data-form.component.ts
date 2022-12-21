import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged, empty, map, Observable, switchMap, tap } from 'rxjs';
import { BaseFormComponent } from '../shared/base-form/base-form.component';
import { FormValidations } from '../shared/form-validator';
import { Cidade } from '../shared/models/cidade';
import { EstadoBr } from '../shared/models/estado-br.model';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { DropdownService } from '../shared/services/dropdown.service';
import { VerificaEmailService } from './services/verifica-email.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent extends BaseFormComponent implements OnInit {

  //formulario!: FormGroup;
  estados!: EstadoBr[]
  cidades!: Cidade[]
  //estados!: Observable<EstadoBr[]>
  cargos!: any[]
  tecnologias!: any[]
  newsLetterOp!: any[]
  frameworks = ['Angular', 'React','Vue']

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropDownService: DropdownService,
    private cepService: ConsultaCepService,
    private verificarEmailService: VerificaEmailService
    ) {
      super()
     }

   override ngOnInit(): void {
    //this.verificarEmailService.verificaEmail('email@email.com').subscribe()

    /*this.formulario = new FormGroup({
      nome: new FormControl(null),
      email: new FormControl(null)
    })
    this.dropDownService.getEstadosBr().subscribe(
      res =>{
        this.estados = res
        console.log(this.estados)
      }
    )*/
    //this.estados = this.dropDownService.getEstadosBr()
      this.dropDownService.getEstadosBr()
      .subscribe(
        dados => this.estados = dados
      )

      
      this.cargos = this.dropDownService.getCargos()
      this.tecnologias = this.dropDownService.getTecnologias()
      this.newsLetterOp = this.dropDownService.getNewsLetter()


    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email], [this.validarEmail.bind(this)]],
      confirmarEmail: [null, [FormValidations.equalsTo('email')]],
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
      }),
      cargo: [null],
      tecnologias: [null],
      newsLetter: ['s'],
      termos: [null, Validators.pattern('true')],
      frameworks: this.buildFrameworks()
      //[Validators.required, Validators.minLength(3), Validators.maxLength(20)]
    })

    this.formulario.get('endereco.cep')!.statusChanges
      .pipe(
        distinctUntilChanged(),
        tap(value => console.log('status CEP: ', value)),
        switchMap(status => status === 'VALID' ? 
          this.cepService.consultaCep(this.formulario.get('endereco.cep')?.value)
          : empty()
        )
      )
      .subscribe(dados => dados ? this.populaDadosForm(dados): {})

      //this.dropDownService.getCidades(8).subscribe(
      //  console.log)

      this.formulario.get('endereco.estado')?.valueChanges
        .pipe(
          tap(estado => console.log('Novo estado: ', estado)),
          map(estado => this.estados.filter(e => e.sigla === estado)),
          map((estados: any) => estados && estados.length > 0 ? estados[0].id : empty()),
          switchMap((estadoId: number) => this.dropDownService.getCidades(estadoId)),
          tap(console.log)
        )
        .subscribe(cidades => this.cidades = cidades)

  }

  buildFrameworks(){
    const values = this.frameworks.map(v => new FormControl(false))
    return this.formBuilder.array(values, FormValidations.minSelectedCheckboxes(1))
    
    /*return [
      new FormControl(false),
      new FormControl(false),
      new FormControl(false)
    ]*/
  }

  submit() {
    console.log(this.formulario.value)

    let valueSubmit = Object.assign({}, this.formulario.value)

    valueSubmit = Object.assign(valueSubmit,{
      frameworks: valueSubmit.frameworks
      .map((v:any, i:any) => v ? this.frameworks[i] : null)
      .filter((v: null) => v !== null)
    })

    console.log(valueSubmit)
    this.http.post('https://httpbin.org/post', JSON.stringify(valueSubmit))
      .pipe(map((dados: any) => dados))
      .subscribe(dados => { 
        console.log(dados)
        // reseta o form
        //this.formulario.reset()
        this.resetar()
      },
      (error:any) => alert('error'))
  }

  verificaRequired(campo: string){
    return(
      this.formulario.get(campo)?.hasError('required') &&
      (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty)
    )
  }

  verificaEmailInvalido(){
    let campoEmail = this.formulario.get('email')
    if(campoEmail?.errors){
      return campoEmail?.errors['email'] && campoEmail.touched
    } 
  }

  consultaCep(){
    let cep = this.formulario.get('endereco.cep')?.value

    if(cep != null && cep !== ''){
      this.cepService.consultaCep(cep)?.subscribe(
        dados => this.populaDadosForm(dados)
      )
    }
  }

  populaDadosForm(dados: any){
    this.formulario.patchValue({
      endereco:{
        rua: dados.logradouro,
        cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    })
  }

  resetaDadosForm(){
    this.formulario.patchValue({
      endereco:{
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    })
  }

  setarCargo(){
    const cargo = {nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl'}
    this.formulario.get('cargo')?.setValue(cargo)
  }

  compararCargos(obj1: any, obj2: any){
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2
  }

  setarTecnologia(){
    this.formulario.get('tecnologias')?.setValue(['java', 'javascript', 'php'])
  }

  validarEmail(formControl: FormControl){
    return this.verificarEmailService.verificaEmail(formControl.value)
    .pipe(map(emailExiste => emailExiste ? { emailInvalido : true } : null))
  }

}
