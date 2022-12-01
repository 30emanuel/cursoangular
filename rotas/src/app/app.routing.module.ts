import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

//import { CursoDetalheComponent } from './cursos/curso-detalhe/curso-detalhe.component';
//import { CursoNaoEncontradoComponent } from './cursos/curso-nao-encontrado/curso-nao-encontrado.component';
//import { CursosComponent } from './cursos/cursos.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  {path: 'cursos', loadChildren: () => import('./cursos/cursos.module').then(m => m.CursosModule)},
  {path: 'alunos', loadChildren: () => import('./alunos/alunos.module').then(m => m.AlunosModule)},
  //{path: 'cursos', component: CursosComponent},
  //{path: 'curso/:id', component: CursoDetalheComponent},
  //{path: 'naoEncontrado', component: CursoNaoEncontradoComponent}
  {path: 'login', component: LoginComponent},
  {path: '', component: HomeComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}