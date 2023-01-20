import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import {NgxPaginationModule} from 'ngx-pagination';

import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { ListRisquesComponent } from '../../risques/list-risques/list-risques.component';
import { ListReclamationComponent } from '../../reclamations/list-reclamation/list-reclamation.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ChartsModule,
    NgbModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  declarations: [
    DashboardComponent,
    ListReclamationComponent,
    ListRisquesComponent
  ]
})

export class AdminLayoutModule {}
