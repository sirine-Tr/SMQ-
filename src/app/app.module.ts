import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AddReclamationComponent } from './reclamations/add-reclamation/add-reclamation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditReclamationComponent } from './reclamations/edit-reclamation/edit-reclamation.component';
import { EditRisquesComponent } from './risques/edit-risques/edit-risques.component';
import { AddRisquesComponent } from './risques/add-risques/add-risques.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { DetailsRisqueComponent } from './risques/details-risque/details-risque.component';
import { RisqueService } from './services/risque.service';
import { ReclamationService } from './services/reclamation.service';
import { DetailsReclamtionComponent } from './reclamations/details-reclamtion/details-reclamtion.component';
import { ListActionComponent } from './actionReclamations/list-action/list-action.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AddReclamationComponent,
    EditReclamationComponent,
    EditRisquesComponent,
    AddRisquesComponent,
    DetailsRisqueComponent,
    DetailsReclamtionComponent,
    ListActionComponent,


  ],
  providers: [RisqueService,ReclamationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
