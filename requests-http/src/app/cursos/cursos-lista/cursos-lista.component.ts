import { Component, OnInit, ViewChild } from '@angular/core';
import { catchError, EMPTY, Observable, Subject, switchMap, take } from 'rxjs';
import { Curso } from '../curso';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Cursos2Service } from '../cursos2.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.css'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  cursos$!: Observable<Curso[]>
  error$ = new Subject<boolean>()

  deleteModalRef!: BsModalRef
  @ViewChild('deleteModal') deleteModal: any
  cursoSelecionado!: Curso;

  constructor(
    private service: Cursos2Service,
    private modalService: BsModalService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    //this.service.list()
    //.subscribe(dados => this.cursos = dados)
    this.onRefresh()
  }

  onRefresh(){
    this.cursos$ = this.service.list()
    .pipe(
      catchError(error => {
        console.log(error)
        //this.error$.next(true)
        this.handleError()
        return EMPTY
      })
    )
  }

  onEdit(id: number){
    this.router.navigate(['editar', id], {relativeTo: this.route})
  }

  onDelete(curso: Curso){
    this.cursoSelecionado = curso
    //this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'})
    const result$ = this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja remover esse curso?')
    result$.asObservable().pipe(
      take(1),
      switchMap(result => result ? this.service.remove(curso.id) : EMPTY)
    ).subscribe(
      success => { 
        this.onRefresh()
      },
      error => {
        this.alertService.showAlertDanger('Erro ao remover curso. Tente novamente mais tarde.')
      }
    )
  }

  onConfirmDelete(){
    this.service.remove(this.cursoSelecionado.id).subscribe(
      success => { 
        this.onRefresh()
      },
      error => {
        this.alertService.showAlertDanger('Erro ao remover curso. Tente novamente mais tarde.')
      }
    )
  }

  onDeclineDelete(){
    this.deleteModalRef.hide()
  }

  handleError(){
    this.alertService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde.')
  }

}
