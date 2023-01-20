import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ListRisquesComponent } from '../../risques/list-risques/list-risques.component';
import { ListReclamationComponent } from '../../reclamations/list-reclamation/list-reclamation.component';
import { AddReclamationComponent } from '../../reclamations/add-reclamation/add-reclamation.component';
import { EditReclamationComponent } from '../../reclamations/edit-reclamation/edit-reclamation.component';
import { AddRisquesComponent } from '../../risques/add-risques/add-risques.component';
import { EditRisquesComponent } from '../../risques/edit-risques/edit-risques.component';
import { DetailsRisqueComponent } from '../../risques/details-risque/details-risque.component'
import { DetailsReclamtionComponent } from '../../reclamations/details-reclamtion/details-reclamtion.component';
import { ListActionComponent } from '../../actionReclamations/list-action/list-action.component';
export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'reclamations',   component: ListReclamationComponent },
    { path: 'risques',   component: ListRisquesComponent },
    {path:'reclamations/add',component:AddReclamationComponent},
    {path:'reclamations/edit/:id',component:EditReclamationComponent},
    {path:'reclamations/show/:id',component:DetailsReclamtionComponent},
    {path:'causes/show/:id',component:ListActionComponent},

    { path: 'risques/add',   component: AddRisquesComponent },
    {path:'risques/edit/:id',component:EditRisquesComponent},
    {path:'risques/show/:id',component:DetailsRisqueComponent}

];
