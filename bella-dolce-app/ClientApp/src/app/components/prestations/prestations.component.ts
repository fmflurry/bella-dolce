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
  isLoading = true;

  private isAlive = true;

  constructor(private prestationsService: PrestationsService, private prestationsStore: PrestationsStore) {}

  ngOnInit() {
    const allPrestations$ = this.prestationsService.getPrestations();
    const selectedPrestations$ = this.prestationsStore.watch();

    combineLatest([allPrestations$, selectedPrestations$]).pipe(
      takeWhile(() => this.isAlive),
    ).subscribe(([allPrestations, selectedPrestations]) => {
        // stop loading
        this.isLoading = false;

        // bind all prestations
        this.allPrestations = allPrestations;

        // sort prestations to display
        const { byAlphabetical } = this;
        this.prestations = allPrestations.sort(byAlphabetical); // prestations that will be displayed, will be reassigned regarding user selection/filters

        const currentSelectedPrestations: Prestation[] = [...Object.keys(selectedPrestations)].map(prestationId => selectedPrestations[prestationId]) || [];
        const formerSelectedPrestations: Prestation[] = [...Object.keys(this.selectedPrestations)].map(prestationId => this.selectedPrestations[prestationId]) || [];

        // remove prestations already selected
        this.prestations = this.prestations.reduce((acc, curr) => {
          if (!selectedPrestations.hasOwnProperty(curr.id)) {
            acc.push(curr);
          }
          return acc;
        }, [] as Prestation[]);

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