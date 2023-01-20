import { Component } from '@angular/core';
import { Reclamation } from '../../model/reclamation';
import { ReclamationService } from '../../services/reclamation.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService}  from 'ngx-toastr';

@Component({
  selector: 'app-list-reclamation',
  templateUrl: './list-reclamation.component.html',
  styleUrls: ['./list-reclamation.component.css']
})
export class ListReclamationComponent {
  public reclamations:Reclamation[]=[]
  pageSize: number = 1000000;
  pageNumber:number =0 ;
  pageSizeT= 10;
  filenames: string[] = [];
  pageSizes = [3, 6, 9];
  tableSizes: number[] = [3, 6, 9, 12];
  constructor(private toastr: ToastrService,private reclamationService:ReclamationService) { }
  ngOnInit() {
    this.pageSizeT= 10;
    this.getReclamation(this.pageNumber ,this. pageSize)
    console.log(this.reclamations)

  }
  /*getListReclamtions(pageNumber,pageSize){
    this.reclamationService.getReclamations(pageNumber,pageSize).subscribe((data:Reclamation[])=>{
       data.forEach(d=>{
        this.reclamations.push(d)
       })
       this.reclamations=data
    })

  }*/
  public getReclamation(pageNumber , pageSize): void {
    this.reclamationService.getReclamations(pageNumber , pageSize).subscribe(
      (response: Reclamation[]) => {
        this.reclamations = response;
       // this.totalElements = response ['totalElements'];
        console.log(this.reclamations);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.pageNumber = 1;
    this.getReclamation(this.pageNumber ,this. pageSize);
  }
  onTableDataChange(event: any) {
    this.pageNumber = event;
    this.getReclamation(this.pageNumber ,this. pageSize);
  }
  retrieveReclalations(): void {
    this.reclamationService.getReclamations(this.pageNumber , this.pageSize).subscribe({
        next: (data) => {
          this.reclamations = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  onDeleteReclamation(id: any): void {
    var result = confirm("Vous etes sure de supprimer cette reclamation");
    if(result){
    this.reclamationService.deleteReclamation(id)
      .subscribe({
        next: (res) => {
          this.retrieveReclalations()
          this.showNotificationDelete()
        },
        error: (e) => console.error(e)
      });
    }
  }
  showNotificationDelete(){
    this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> <b>Suppression est effectuée avec succes</b>.', '', {
      timeOut: 8000,
      closeButton: true,
      enableHtml: true,
      toastClass: "alert alert-primary alert-with-icon",
      positionClass: 'toast-top-right'
    });
  
  }
}
