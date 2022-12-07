import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AlunoFormComponent } from "../alunos/aluno-form/aluno-form.component";
import { IFormCanDeactivate } from "./iform-candeactivate";

Injectable()
export class AlunosDeactivateGuard implements CanDeactivate<IFormCanDeactivate>{

    canDeactivate(
        component: IFormCanDeactivate,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean{
        console.log('Guarda de desativação')

        //return component.podeMudarRota() NO COMPONENTE

        return component.podeDesativar() // COM INTERFACE (PARA SER USADO EM MAIS DE UMA ROTA)
    }

}