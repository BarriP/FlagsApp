import { Injectable } from '@angular/core';

@Injectable()
export class HeaderService {

  headerText = "";

  pretest() {
    this.headerText = "Test Inicial";
  }

  posttest() {
    this.headerText = "Test Final";
  }

  question(ronda, fase) {
    this.headerText = `Ronda ${ronda+1} de 8 (Pregunta ${fase+1} de 8)`;
  }

  review(ronda) {
    this.headerText = `Ronda ${ronda+1} de 8 (Revisión)`;
  }
}
