import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
//import { RouterModule } from "@angular/router";

import { CursoDetalheComponent } from "./curso-detalhe/curso-detalhe.component";
import { CursoNaoEncontradoComponent } from "./curso-nao-encontrado/curso-nao-encontrado.component";
import { CursosComponent } from "./cursos.component";
import { CursosService } from "./cursos.service";
import { CursosRoutingModule } from "./cursos.rounting.module";

@NgModule({
    imports: [
        CommonModule,
        //RouterModule
        CursosRoutingModule
    ],
    exports: [],
    declarations: [
        CursosComponent,
        CursoDetalheComponent,
        CursoNaoEncontradoComponent
    ],
    providers: [CursosService],
})
export class CursosModule{}