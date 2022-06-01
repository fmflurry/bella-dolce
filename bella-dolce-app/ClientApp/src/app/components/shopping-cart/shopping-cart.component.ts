import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PrestationsStore } from "@app/shared/store";
import { takeWhile } from "rxjs/operators";
import { SelectedPrestationsComponent } from "@app/components";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  selectedPrestationsCount = 0;

  private isAlive = true;

  constructor(private prestationsStore: PrestationsStore, private matDialog: MatDialog) { }

  ngOnInit() {
    this.prestationsStore.watch()
    .pipe(takeWhile(() => this.isAlive))
    .subscribe(selectedPrestations => {
      this.selectedPrestationsCount = [...Object.keys(selectedPrestations)].length;
    });
  }

  ngOnDestroy() {
    this.isAlive = false;
    this.matDialog.closeAll();
  }

  openSelectedPrestations() {
    this.matDialog.open(SelectedPrestationsComponent, {
      minWidth: '20%',
      maxWidth: '50%'
    });
  }

}
