import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import {
  ContactComponent,
  HomeComponent,
  NavMenuComponent,
  PrestationsComponent,
  RendezVousComponent,
  SelectedPrestationsComponent,
  SelectRendezVousComponent,
  ShoppingCartComponent
} from './components';
import { MaterialModule } from './material/material.module';
import { DurationPipe } from './pipes';
import { SharedModule } from './shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ContactComponent,
    RendezVousComponent,
    PrestationsComponent,
    DurationPipe,
    ShoppingCartComponent,
    SelectedPrestationsComponent,
    SelectRendezVousComponent
  ],
  imports: [
    MaterialModule,
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'rendez-vous', component: RendezVousComponent },
      { path: 'contact', component: ContactComponent },
    ]),
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
