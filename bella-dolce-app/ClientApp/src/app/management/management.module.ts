import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent, LoginComponent } from './components';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    RouterModule.forChild([
      { path: '', component: DashboardComponent }
    ])
  ],
  providers: [
  ],
})
export class ManagementModule { }
