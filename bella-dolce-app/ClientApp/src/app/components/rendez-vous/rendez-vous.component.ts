import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Prestation } from "@app/models";
import { PrestationsService } from "@app/services";
import { PrestationsStore } from "@app/shared/store";
import { Observable } from "rxjs";
import { takeWhile } from "rxjs/operators";

@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.css']
})
export class RendezVousComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  currentStep!: number;
  hasSelectedPrestation = false;

  private isAlive = true;


  constructor(private fb: FormBuilder, private prestationsStore: PrestationsStore) {}

  ngOnInit() {
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      emailAddress: ['', Validators.required],
    });

    this.prestationsStore.watchStep()
        .pipe(takeWhile(() => this.isAlive))
        .subscribe(step => {
          this.currentStep = step;
        });

    this.prestationsStore.watch()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(selectedPrestations => {
        this.hasSelectedPrestation = [...Object.keys(selectedPrestations)].length > 0;
      });
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  changeStep(stepNumber: number) {
    this.prestationsStore.setStep(stepNumber);
  }
  
}
