import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: null,
    email: null
  }

  onSubmit(form: any){
    console.log(form.value)
    
    this.http.post('https://httpbin.org/post', JSON.stringify(form.value))
    .pipe(map((dados: any) => dados))
    .subscribe(dados => { 
      console.log(dados)
      form.form.reset()
    })
  }

  constructor(
    private http: HttpClient,
    private cepService: ConsultaCepService
    ) { }

  ngOnInit(): void {
  }

  verificaValidTouched(campo:any){
    return !campo.valid && campo.touched
  }

  consultaCep(cep: string, form: any){
    cep = cep.replace(/\D/g, '')
    if(cep != null && cep !== ''){
      this.cepService.consultaCep(cep)?.subscribe(dados => this.populaDadosForm(dados, form))
    }
  }

  populaDadosForm(dados: any, formulario: any){
    formulario.form.patchValue({
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

  resetaDadosForm(formulario:any){
    formulario.form.patchValue({
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
