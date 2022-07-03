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
  totalCost = 0;

  constructor(private prestationsStore: PrestationsStore) {}

  ngOnInit() {
    this.selectedPrestations$ = this.prestationsStore.watch().pipe(
      map(prestations => {
        const selectedPrestations = [...Object.keys(prestations)].map(key => prestations[key]);
        this.totalCost = selectedPrestations.reduce((acc, curr) => acc + curr.price, 0);
        return selectedPrestations;
      })
    );
  }

  remove(prestation: Prestation) {
    this.prestationsStore.remove(prestation);
  }

}