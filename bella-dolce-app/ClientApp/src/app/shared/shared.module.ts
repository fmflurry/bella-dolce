import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "@app/material/material.module";
import { ExpansionPanelComponent, OverlaySpinnerComponent, PrimaryButtonComponent } from "./components";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [
    PrimaryButtonComponent,
    OverlaySpinnerComponent,
    ExpansionPanelComponent
  ],
  exports: [
    PrimaryButtonComponent,
    OverlaySpinnerComponent,
    ExpansionPanelComponent
  ]
})
export class SharedModule {

}
