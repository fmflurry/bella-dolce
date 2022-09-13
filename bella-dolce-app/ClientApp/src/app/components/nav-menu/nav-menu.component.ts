import { Component, OnDestroy, OnInit } from '@angular/core';
import { TokenService } from '@app/auth/services';
import { PrestationsStore } from '@app/shared/store';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit, OnDestroy {

  isExpanded = false;
  isAdministrator = false;
  isAlive = true;

  constructor(private tokenService: TokenService, private prestationStore: PrestationsStore) {}

  ngOnInit() {
    this.tokenService.watchIsAdministrator().pipe(
      takeWhile(() => this.isAlive)
    ).subscribe(isAdministrator => { this.isAdministrator = isAdministrator; });
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  goToPrestations() {
    this.prestationStore.setStep(1);
  }
}
