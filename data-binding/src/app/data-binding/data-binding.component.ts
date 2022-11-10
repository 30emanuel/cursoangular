import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css']
})
export class DataBindingComponent implements OnInit {

  url: string = 'http://loiane.com'
  cursoAngular: boolean = true
  urlImagem: string = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Cruzeiro_Esporte_Clube_%28logo%29.svg/1200px-Cruzeiro_Esporte_Clube_%28logo%29.svg.png'
  valorAtual: string = ''
  valorSalvo: string = ''
  isMouseOver: boolean = false

  nomeDoCurso: string = 'Angular'

  valorInicial: number = 15

  botaoClicado(){
    alert('Botão clicado!')
  }

  getValor(){
    return 1
  }

  getCurtirCurso(){
    return true
  }

  onKeyUp(evento: KeyboardEvent){
    this.valorAtual = (<HTMLInputElement>evento.target).value
  }

  salvarValor(valor: string){
    this.valorSalvo = valor
  }

  onMouseOverOut(){
    this.isMouseOver = !this.isMouseOver
  }

  constructor() { }

  ngOnInit(): void {
  }

  onMudouValor(evento: any){
    console.log(evento.novoValor)
  }

}
