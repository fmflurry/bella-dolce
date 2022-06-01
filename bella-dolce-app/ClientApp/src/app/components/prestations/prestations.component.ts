import { Component, OnDestroy, OnInit } from "@angular/core";
import { Prestation } from "@app/models";
import { PrestationsService } from "@app/services";
import { PrestationsStore } from "@app/shared/store/prestations.store";
import { Observable } from "rxjs";
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
    this.prestationsService.getPrestations()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(prestations => {
        this.allPrestations = prestations; // keep all possible prestations in memory
        const { byAlphabetical } = this;
        this.prestations = prestations.sort(byAlphabetical); // prestations that will be displayed, will be reassigned regarding user selection/filters
      });


    this.prestationsStore.watch()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(selectedPrestations => {
        const updatedSelectedPrestations: Prestation[] = [...Object.keys(selectedPrestations)].map(prestationId => selectedPrestations[prestationId]) || [];
        const formerSelectedPrestations: Prestation[] = [...Object.keys(this.selectedPrestations)].map(prestationId => this.selectedPrestations[prestationId]) || [];

        if (updatedSelectedPrestations.length < formerSelectedPrestations.length) {
          // Prestation was removed, add it to rendered prestations
          const prestationId = [...Object.keys(this.selectedPrestations)].find(key => !selectedPrestations.hasOwnProperty(key));
          const prestation = this.allPrestations.find(allPresta => allPresta.id === prestationId) as Prestation;
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
    
    // remove prestations from view
    const updatedPrestations = [...this.prestations]; // no mutation
    const index = this.prestations.findIndex(p => p.id === prestation.id);
    updatedPrestations.splice(index, 1);
    this.prestations = updatedPrestations;
  }

  byAlphabetical(a: Prestation, b: Prestation) {
    return a?.name.toLowerCase().localeCompare(b?.name.toLowerCase());
  }

}