import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diretiva-ngfor',
  templateUrl: './diretiva-ngfor.component.html',
  styleUrls: ['./diretiva-ngfor.component.scss']
})
export class DiretivaNgforComponent implements OnInit {

  cursos: string[] = ['Angular', 'Java', 'HTML']

  constructor() { }

  ngOnInit(): void {
  }

}
