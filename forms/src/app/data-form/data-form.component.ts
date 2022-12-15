import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { EstadoBr } from '../shared/models/estado-br.model';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { DropdownService } from '../shared/services/dropdown.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario!: FormGroup;
  estados!: Observable<EstadoBr[]>

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropDownService: DropdownService,
    private cepService: ConsultaCepService
    ) { }

  ngOnInit(): void {
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

      this.estados = this.dropDownService.getEstadosBr()


    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],

      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
      })
      //[Validators.required, Validators.minLength(3), Validators.maxLength(20)]
    })
  }

  onSubmit(){
    console.log(this.formulario.value)

    if(this.formulario.valid){
      this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
      .pipe(map((dados: any) => dados))
      .subscribe(dados => { 
        console.log(dados)
        // reseta o form
        //this.formulario.reset()
        this.resetar()
      },
      (error:any) => alert('error'))
    }else{
      console.log('formulario invalido')
      this.verificaValidacoesForm(this.formulario)
    }
  }

  verificaValidacoesForm(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(campo =>{
      console.log(campo)
      const controle = formGroup.get(campo)
      controle?.markAsTouched()

      if(controle instanceof FormGroup){
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

  verificaEmailInvalido(){
    let campoEmail = this.formulario.get('email')
    if(campoEmail?.errors){
      return campoEmail?.errors['email'] && campoEmail.touched
    } 
  }

  aplicaCssErro(campo: string){
    return {
      'erro': this.verificaValidTouched(campo),
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

}
