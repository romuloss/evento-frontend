import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistryStatusComponent } from './components/registry-status/registry-status.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RegistryStatusComponent],
  exports:[RegistryStatusComponent]
})
export class SharedModule { }
