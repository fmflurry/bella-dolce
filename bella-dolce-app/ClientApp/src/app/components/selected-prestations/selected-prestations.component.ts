import { Component, OnInit } from "@angular/core";
import { Prestation } from "@app/models";
import { PrestationsStore } from "@app/shared/store";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

@Component({
  selector: 'app-selected-prestations',
  templateUrl: './selected-prestations.component.html',
  styleUrls: ['./selected-prestations.component.scss']
})
export class SelectedPrestationsComponent implements OnInit {

  selectedPrestations$!: Observable<Prestation[]>;

  constructor(private prestationsStore: PrestationsStore) {}

  ngOnInit() {
    this.selectedPrestations$ = this.prestationsStore.watch().pipe(
      map(prestations => ([...Object.keys(prestations)].map(key => prestations[key])))
    );
  }

  remove(prestation: Prestation) {
    this.prestationsStore.remove(prestation);
  }

}