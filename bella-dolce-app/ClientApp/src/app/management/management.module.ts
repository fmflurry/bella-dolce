import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IsAdministratorGuard } from '@app/auth/guards';
import { MaterialModule } from '@app/material/material.module';
import { SharedModule } from '@app/shared/shared.module';
import {
  DashboardComponent,
  LoginComponent,
  ManageAppointmentsComponent,
  ManageAvailabilityComponent
} from './components';

@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    ManageAvailabilityComponent,
    ManageAppointmentsComponent
  ],
  imports: [
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
        canActivate: [
          IsAdministratorGuard
        ]
      },
      {
        path: 'login',
        component: LoginComponent,
      }
    ])
  ],
  providers: [
  ],
})
export class ManagementModule { }
