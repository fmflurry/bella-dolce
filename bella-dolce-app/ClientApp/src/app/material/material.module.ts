import { NgModule } from "@angular/core";
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider'
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
// import { MatAcorditionModule } from '@angular/material/acordition';

@NgModule({
  exports: [
    MatStepperModule,
    MatCardModule,
    MatDividerModule,
    MatBadgeModule,
    MatDialogModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
  ],
})
export class MaterialModule {
}