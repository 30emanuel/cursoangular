import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

//import { CursoDetalheComponent } from './cursos/curso-detalhe/curso-detalhe.component';
//import { CursoNaoEncontradoComponent } from './cursos/curso-nao-encontrado/curso-nao-encontrado.component';
//import { CursosComponent } from './cursos/cursos.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  //{path: 'cursos', component: CursosComponent},
  //{path: 'curso/:id', component: CursoDetalheComponent},
  //{path: 'naoEncontrado', component: CursoNaoEncontradoComponent}
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}