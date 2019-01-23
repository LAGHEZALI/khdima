import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';

import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { LanguageComponent } from './layouts/bottomSheet/language/language.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ErrorComponent } from './pages/error/error.component';
import { HomeComponent } from './pages/home/home.component';
import { LoadingComponent } from './layouts/loading/loading.component';
import { LoginErrorComponent } from './layouts/modals/login-error/login-error.component';
import { LoginSuccessComponent } from './layouts/modals/login-success/login-success.component';
import { WallComponent } from './pages/wall/wall.component';
import { RegisterErrorComponent } from './layouts/modals/register-error/register-error.component';
import { RegisterSuccessComponent } from './layouts/modals/register-success/register-success.component';
import { PostComponent } from './pages/wall/post/post.component';
import { WavesurferComponent } from './layouts/modals/wavesurfer/wavesurfer.component';
import { GaleryComponent } from './layouts/modals/galery/galery.component';
import { KhdimaMenuComponent } from './layouts/bottomSheet/khdima-menu/khdima-menu.component';
import { AddPostComponent } from './pages/add-post/add-post.component';
import { SearchComponent } from './layouts/modals/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
    HomeComponent,
    WallComponent,
    LoadingComponent,
    PostComponent,
    AddPostComponent,
    //  bottom sheets
    LanguageComponent,
    KhdimaMenuComponent,
    //  Dialogs
    LoginErrorComponent,
    LoginSuccessComponent,
    RegisterErrorComponent,
    RegisterSuccessComponent,
    WavesurferComponent,
    GaleryComponent,
    SearchComponent,
  ],
  entryComponents: [
    //  bottom sheets
    LanguageComponent,
    KhdimaMenuComponent,
    //  Dialogs
    LoginErrorComponent,
    LoginSuccessComponent,
    RegisterErrorComponent,
    RegisterSuccessComponent,
    WavesurferComponent,
    GaleryComponent,
    SearchComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
