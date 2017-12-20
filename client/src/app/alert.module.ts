import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AlertService } from './_services/alert.service';

import { AlertComponent } from './alert/alert.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  providers: [AlertService],
  declarations: [AlertComponent],
  exports: [AlertComponent]
})
export class AlertModule { }
