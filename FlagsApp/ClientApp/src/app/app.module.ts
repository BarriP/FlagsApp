import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { QuestionComponent } from "./question/question.component"
import { PretestComponent } from "./test/pretest.component"
import { PosttestComponent } from "./test/posttest.component"
import { HeaderService } from "./header.service"
import { CookieService } from 'ngx-cookie-service';
 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuestionComponent,
    PretestComponent,
    PosttestComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' }
    ])
  ],
  providers: [HeaderService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
