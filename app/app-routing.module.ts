import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './pages/error/error.component';
import { WallComponent } from './pages/wall/wall.component';
import { AddPostComponent } from './pages/add-post/add-post.component';

const routes: Routes = [
  { path: 'home'      , component: HomeComponent },
  { path: 'login'     , component: LoginComponent },
  { path: 'register'  , component: RegisterComponent },
  { path: 'wall'      , component: WallComponent },
  { path: 'add-post'  , component: AddPostComponent },
  { path: ''          , redirectTo: 'home', pathMatch: 'full' },
  { path: '**'        , component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
