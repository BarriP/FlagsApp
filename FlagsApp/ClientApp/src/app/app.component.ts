import { Component, OnInit, Inject } from '@angular/core';
import { User } from "./models/user"
import { HeaderService } from "./header.service";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  view = 'login';

  private user: User;

  constructor(public service: HeaderService, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  logged(user) {
    this.user = user;

    this.http.post(this.baseUrl + 'api/flags/session/new', user).subscribe(result => {
      console.log(result);
    }, error => {
      alert("Error al enviar datos + (" + error.toString() + ")");
      console.log(error);
    });

    this.view = 'pretest';
  }

  pretest(results) {
    this.view = 'question';
  }

  question(results) {
    this.view = 'posttest';
  }

  posttest(results) {
    this.view = 'end';
  }

  ngOnInit() {

  }

}
