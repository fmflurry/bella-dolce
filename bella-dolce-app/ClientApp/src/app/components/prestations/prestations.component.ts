import { Component, OnDestroy, OnInit } from "@angular/core";
import { Prestation } from "@app/models";
import { PrestationsService } from "@app/services";
import { PrestationsStore } from "@app/shared/store/prestations.store";
import { combineLatest, Observable } from "rxjs";
import { takeWhile } from "rxjs/operators";

@Component({
  selector: '[app-prestations]',
  templateUrl: './prestations.component.html',
  styleUrls: ['./prestations.component.scss']
})
export class PrestationsComponent implements OnInit, OnDestroy {

  prestations: Prestation[] = [];
  allPrestations: Prestation[] = [];
  selectedPrestations: Record<string, Prestation> = {};
  private isAlive = true;

  constructor(private prestationsService: PrestationsService, private prestationsStore: PrestationsStore) {}

  ngOnInit() {
    const allPrestations$ = this.prestationsService.getPrestations();
    const selectedPrestations$ = this.prestationsStore.watch();

    combineLatest([allPrestations$, selectedPrestations$]).pipe(
      takeWhile(() => this.isAlive),
    ).subscribe(([allPrestations, selectedPrestations]) => {
        this.allPrestations = allPrestations;
        const { byAlphabetical } = this;
        this.prestations = allPrestations.sort(byAlphabetical); // prestations that will be displayed, will be reassigned regarding user selection/filters

        const updatedSelectedPrestations: Prestation[] = [...Object.keys(selectedPrestations)].map(prestationId => selectedPrestations[prestationId]) || [];
        const formerSelectedPrestations: Prestation[] = [...Object.keys(this.selectedPrestations)].map(prestationId => this.selectedPrestations[prestationId]) || [];

        // remove prestations already selected
        this.prestations = this.prestations.reduce((acc, curr) => {
          console.log(curr, selectedPrestations.hasOwnProperty(curr.id));
          if (!selectedPrestations.hasOwnProperty(curr.id)) {
            acc.push(curr);
          }
          return acc;
        }, [] as Prestation[]);

        if (updatedSelectedPrestations.length < formerSelectedPrestations.length) {
          // Prestation was removed, add it to rendered prestations
          const prestationId = [...Object.keys(this.selectedPrestations)].find(key => !selectedPrestations.hasOwnProperty(key)) || 0;
          const prestation = this.allPrestations.find(allPresta => allPresta.id === +prestationId) as Prestation;
          const { byAlphabetical } = this;
          this.prestations = [...this.prestations, prestation].sort(byAlphabetical);
        }


        this.selectedPrestations = {...selectedPrestations};
    });
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  add(prestation: Prestation) {
    // add prestation to selectedPrestations in store
    this.prestationsStore.add(prestation);
  }

  byAlphabetical(a: Prestation, b: Prestation) {
    return a?.name.toLowerCase().localeCompare(b?.name.toLowerCase());
  }

}