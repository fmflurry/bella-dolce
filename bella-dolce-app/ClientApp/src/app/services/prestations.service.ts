import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Prestation } from "@app/models";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class PrestationsService {

  constructor(private httpClient : HttpClient) {}

  getPrestations() {
    return this.httpClient.get<Record<string, Prestation[]>>('api/prestations')
      .pipe(
        map(prestationsResult => prestationsResult.prestations)
      );
  }
}