import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms'
import { Reclamation } from '../../model/reclamation';
import { ReclamationService } from '../../services/reclamation.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PieceJointe } from '../../model/pieceJointe';
import { HttpErrorResponse } from '@angular/common/http';
import { PieceJointeService } from '../../services/pieceJointe.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'edit-reclamation',
  templateUrl: './edit-reclamation.component.html',
  styleUrls: ['./edit-reclamation.component.css']
})
export class EditReclamationComponent implements OnInit {

  public reclamationFrom!:FormGroup
  private reclamation:Reclamation
  private id:number
  pieceJointe:PieceJointe={name:''}
  constructor(private toastr: ToastrService, private formBuilder: FormBuilder,private reclamationService:ReclamationService,private route: ActivatedRoute, private pieceJointeService:PieceJointeService, private router:Router) { }

  ngOnInit(): void {
    this.id=+this.route.snapshot.paramMap.get('id');
    this.reclamationFrom = this.formBuilder.group({
      dateDetection: ["", [Validators.required]],
      type: ["", [Validators.required]],
      gravite: ["", [Validators.required]],
      description: ["", [Validators.required]],
      lieuOuPromotion: ["", [Validators.required]],
     // pieceJointe:['', [Validators.required]],
      acteur:['', [Validators.required]],

    });
    this.getReclamation(this.id)

  }
  getReclamation(id:number)
  {
     this.reclamationService.getReclamationById(id).subscribe((data:Reclamation)=>{
      this.reclamationFrom.controls['dateDetection'].setValue(data.dateDetection)
      this.reclamationFrom.controls['type'].setValue(data.type)
      this.reclamationFrom.controls['gravite'].setValue(data.gravite)
      this.reclamationFrom.controls['description'].setValue(data.description)
      this.reclamationFrom.controls['lieuOuPromotion'].setValue(data.lieuOuPromotion)
      this.reclamationFrom.controls['acteur'].setValue(data.acteur)

     })
  }
  onSubmit(){
    this.reclamationService.editReclamation(this.reclamationFrom.value,this.id).subscribe((data:any)=>{
      this.getAllReclamation()
      this.showNotification()
    })
    }
    getAllReclamation(): void {
      
      this.router.navigate(['/reclamations']);
    }

   
  
  onUploadFiles(files: File[]): void {
    const formData = new FormData();
    
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
    this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> <b>Modification est effectuée avec succes</b>.', '', {
      timeOut: 8000,
      closeButton: true,
      enableHtml: true,
      toastClass: "alert alert-primary alert-with-icon",
      positionClass: 'toast-top-right'
    });

  }
}
