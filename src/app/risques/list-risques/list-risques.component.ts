import { Component } from '@angular/core';
import { Risque } from '../../model/risque';
import { RisqueService } from '../../services/risque.service';
import { ToastrService}  from 'ngx-toastr';

@Component({
  selector: 'app-list-risques',
  templateUrl: './list-risques.component.html',
  styleUrls: ['./list-risques.component.css']
})
export class ListRisquesComponent {
  risques:Risque[]
  pageSize: number = 1000000;
  pageNumber:number =0 ;
  pageSizeT= 10;
  
  constructor(private toastr: ToastrService,private risqueService:RisqueService) { }

  ngOnInit() {
    this.pageSizeT= 10;

    this.getListRisques(this.pageNumber ,this. pageSize);
  }
  getListRisques(pageNumber,pageSize){
    this.risqueService.getRisques(pageNumber,pageSize).subscribe((data:Risque[])=>{
      this.risques=data
      console.log(this.risques)

    })
  }
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.pageNumber = 1;
    this.getListRisques(this.pageNumber ,this. pageSize);
  }
  onTableDataChange(event: any) {
    this.pageNumber = event;
    this.getListRisques(this.pageNumber ,this. pageSize);
  }
  retrieveRisques(): void {
    this.risqueService.getRisques(this.pageNumber , this.pageSize).subscribe({
        next: (data) => {
          this.risques = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  onDeleteRisque(id: any): void {
    var result = confirm("Vous etes sure de supprimer ce risque");
    if(result){
      this.risqueService.deleteRisque(id)
      .subscribe({
        next: (res) => {
          this.retrieveRisques()
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
