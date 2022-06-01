import { Injectable } from "@angular/core";
import { Prestation } from "@app/models";
import { of } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class PrestationsService {

  getPrestations() {
    const prestations: Prestation[] = [
      {
        name: 'épilation sourcils',
        duration: 60,
        id: '-1',
        price: 7,
        description: ''
      }
    ];
    let i = 0;
    while (i < 25) {
      const prestation = prestations[0];
      prestations.push({
        ...prestation,
        id: `${i}`
      });
      i++;
    }
    return of(prestations);

    // TODO : Call API
  }

}