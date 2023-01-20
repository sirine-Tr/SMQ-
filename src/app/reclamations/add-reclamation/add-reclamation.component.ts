import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms'
import { Reclamation } from '../../model/reclamation';
import { ReclamationService } from '../../services/reclamation.service';
import { PieceJointeService } from '../../services/pieceJointe.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { PieceJointe } from '../../model/pieceJointe';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'add-reclamation',
  templateUrl: './add-reclamation.component.html',
  styleUrls: ['./add-reclamation.component.css']
})
export class AddReclamationComponent implements OnInit {
   public reclamationFrom!:FormGroup
   private reclamation:Reclamation
   file:File
   //name:String
   pieceJointe:PieceJointe={name:''}
  constructor(private toastr: ToastrService,private reclamationService:ReclamationService, private formBuilder: FormBuilder, private pieceJointeService:PieceJointeService, private router:Router) { }

  ngOnInit(): void {
    this.reclamationFrom = this.formBuilder.group({
      dateDetection: ['', [Validators.required]],
      type: ['', [Validators.required]],
      gravite: ['', [Validators.required]],
      description: ['', [Validators.required]],
      lieuOuPromotion: ['', [Validators.required]],
      acteur: ['', [Validators.required]],
   //   pieceJointe:['', [Validators.required]],
    });
  }
  onSubmit(){
  
    this.reclamationService.addReclamation(this.reclamationFrom.value).subscribe((data:any)=>{
      this.showNotification()
      this.getAllReclamation()
    })
    }
    getAllReclamation(): void {
      
      this.router.navigate(['/reclamations']);
    }
  
  onUploadFiles(files: File[]): void {
    const formData = new FormData();
    //this.name=files[0].name;
    
    for (const file of files) { formData.append('files', file, file.name); }
    this.pieceJointeService.upload(formData).subscribe(
      event => {
        console.log(event);
        this.pieceJointe.name=event[0]
         this.reclamationFrom.controls['pieceJointe'].setValue(this.pieceJointe)
         this.ajouterPieceJointe()
       // this.resportProgress(event);
        
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
  ajouterPieceJointe(){
    this.pieceJointeService.addPieceJointe(this.pieceJointe).subscribe((data:PieceJointe)=>{
      this.reclamationFrom.controls['pieceJointe'].setValue(data)
    })
  }
  showNotification(){
    this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> <b>Ajout est effectuée avec succes</b>.', '', {
      timeOut: 8000,
      closeButton: true,
      enableHtml: true,
      toastClass: "alert alert-primary alert-with-icon",
      positionClass: 'toast-top-right'
    });

  }
}
