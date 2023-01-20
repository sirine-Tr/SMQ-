import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms'
import { Risque } from '../../model/risque';
import { RisqueService } from '../../services/risque.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PieceJointe } from '../../model/pieceJointe';
import { HttpErrorResponse } from '@angular/common/http';
import { PieceJointeService } from '../../services/pieceJointe.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'edit-risques',
  templateUrl: './edit-risques.component.html',
  styleUrls: ['./edit-risques.component.css']
})
export class EditRisquesComponent implements OnInit {

  risquesForm:FormGroup
  private id:number
  pieceJointe:PieceJointe
  constructor(private toastr: ToastrService,private formBuilder: FormBuilder,private risqueService:RisqueService,private route: ActivatedRoute,private router: Router, private pieceJointeService:PieceJointeService) { }

  ngOnInit(): void {
    this.id=+this.route.snapshot.paramMap.get('id');

    this.risquesForm = this.formBuilder.group({
      dateDetection: ['', [Validators.required]],
      type: ['', [Validators.required]],
      niveau: ['', [Validators.required]],
      description: ['', [Validators.required]],
      lieuOuPromotion: ['', [Validators.required]],
      evolution:['', [Validators.required]],
      acteur:['', [Validators.required]],
      pieceJointe:['', [Validators.required]],

    });
    this.getRisque(this.id)
  }
  getRisque(id:number)
  {
     this.risqueService.getRisqueById(id).subscribe((data:Risque)=>{
      this.risquesForm.controls['dateDetection'].setValue(data.dateDetection)
      this.risquesForm.controls['type'].setValue(data.type)
      this.risquesForm.controls['description'].setValue(data.description)
      this.risquesForm.controls['lieuOuPromotion'].setValue(data.lieuOuPromotion)
      this.risquesForm.controls['evolution'].setValue(data.evolution)
      this.risquesForm.controls['niveau'].setValue(data.niveau)
      this.risquesForm.controls['acteur'].setValue(data.acteur)

     })
  }
  onSubmit(){
    this.risqueService.editRisque(this.risquesForm.value,this.id).subscribe((data:any)=>{
    this.showNotification()
    this.getAllRisque()
  })
  }
  getAllRisque(): void {
    
    this.router.navigate(['/risques']);
  }

  onUploadFiles(files: File[]): void {
    const formData = new FormData();
    
    for (const file of files) { formData.append('files', file, file.name); }
    this.pieceJointeService.upload(formData).subscribe(
      event => {
        console.log(event);
        this.pieceJointe.name=event[0]
         this.risquesForm.controls['pieceJointe'].setValue(this.pieceJointe)
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
      this.risquesForm.controls['pieceJointe'].setValue(data)
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
