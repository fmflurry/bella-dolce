import { Injectable } from "@angular/core";
import { Prestation } from "@app/models";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PrestationsStore {

  private step$ = new BehaviorSubject(1); // default step
  private selectedPrestations: Record<string, Prestation> = {};
  private selectedPrestations$ = new BehaviorSubject<Record<string, Prestation>>({});

  add(prestation: Prestation) {
    this.selectedPrestations[prestation.id] = prestation;
    this.refresh(this.selectedPrestations);
  }

  remove(prestation: Prestation) {
    console.log(prestation);
    delete this.selectedPrestations[prestation.id];
    this.refresh(this.selectedPrestations);
  }

  getAll() {
    return [...Object.keys(this.selectedPrestations)]
      .map(prestationId => this.selectedPrestations[prestationId]);
  }

  watch() {
    return this.selectedPrestations$;
  }

  setStep(stepNumber: number) {
    this.step$.next(stepNumber);
  }

  watchStep() {
    return this.step$;
  }

  private refresh(selectedPrestations: Record<string, Prestation>) {
    this.selectedPrestations$.next(selectedPrestations);
  }

}
