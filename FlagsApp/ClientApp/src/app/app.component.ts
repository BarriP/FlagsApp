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
  private sessionId: number;

  constructor(public service: HeaderService, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  logged(user) {
    this.user = user;

    this.http.post<any>(this.baseUrl + 'api/flags/session/new', user).subscribe(result => {
      console.log(result);
      this.sessionId = result.sessionId;
    }, error => {
      alert("Error al enviar datos + (" + error.toString() + ")");
      console.log(error);
    });

    this.view = 'pretest';
  }

  pretest(results) {
    this.view = 'question';

    results.sessionId = this.sessionId;

    this.http.post(this.baseUrl + 'api/flags/test/new', results).subscribe(result => {
      console.log(result);
    }, error => {
      alert("Error al enviar datos + (" + error.toString() + ")");
      console.log(error);
    });
  }

  question(results) {
    if (results.end) {
      this.view = 'posttest';
      return;
    } else {
      this.http.post(this.baseUrl + 'api/flags/round/new', results.round).subscribe(result => {
        console.log(result);
      }, error => {
        alert("Error al enviar datos + (" + error.toString() + ")");
        console.log(error);
      });
    }
  }

  posttest(results) {
    this.view = 'end';
  }

  ngOnInit() {

  }

}
