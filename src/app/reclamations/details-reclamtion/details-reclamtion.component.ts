import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms'
import { Reclamation } from '../../model/reclamation';
import { ReclamationService } from '../../services/reclamation.service';
import { ActivatedRoute } from '@angular/router';
import { Causes } from '../../model/causes';
import { CauseService } from '../../services/cause.service';
import { Consequances } from '../../model/consequances';
import { ConsequanceService } from '../../services/consequence.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'details-reclamtion',
  templateUrl: './details-reclamtion.component.html',
  styleUrls: ['./details-reclamtion.component.css']
})
export class DetailsReclamtionComponent implements OnInit {

  public reclamationFrom!:FormGroup
  public causeForm:FormGroup
  public consequenceForm:FormGroup
  public consequenceFormEdit:FormGroup
  public causeFormEdit:FormGroup

  private id:number
  constructor(private toastr: ToastrService,private formBuilder: FormBuilder,private reclamationService:ReclamationService,private route: ActivatedRoute,private causeService:CauseService,private consequanceService:ConsequanceService) { }
  displayStyleCauseAdd:String
  displayStyleConsequeanceAdd:String
  displayStyleConsequeanceEdit:String
  public causes:Causes[];
  public consequences:Consequances[]
  pageSize: number = 1000000;
  pageNumber:number =0 ;
  pageSizeT= 10;
  idConsequences=null
  idCause=null
  displayStyleCauseEdit
  ngOnInit(): void {
    this.id=+this.route.snapshot.paramMap.get('id');
    this.reclamationFrom = this.formBuilder.group({
      dateDetection: ["", [Validators.required]],
      type: ["", [Validators.required]],
      gravite: ["", [Validators.required]],
      description: ["", [Validators.required]],
      lieuOuPromotion: ["", [Validators.required]],
      //pieceJointe:['', [Validators.required]],
      acteur:['', [Validators.required]],

    });
    this.causeForm = this.formBuilder.group({
      dateCreation: ["", [Validators.required]],
      descriptionCause: ["", [Validators.required]],
      nature: ["", [Validators.required]],
      reclamation:["",[Validators.required]]
    });
    this.causeFormEdit = this.formBuilder.group({
      dateCreation: ["", [Validators.required]],
      descriptionCause: ["", [Validators.required]],
      nature: ["", [Validators.required]],
      reclamation:["",[Validators.required]]
    });
    this.consequenceForm = this.formBuilder.group({
      dateCreation: ["", [Validators.required]],
      descriptionConsequances: ["", [Validators.required]],
      reclamation:["",[Validators.required]]

    });
    this.consequenceFormEdit = this.formBuilder.group({
      dateCreation: ["", [Validators.required]],
      descriptionConsequances: ["", [Validators.required]],
      reclamation:["",[Validators.required]]

    });
    this.getReclamation(this.id)
    this.getConsequences(this.id,this.pageNumber,this.pageSize)
    this.getCauses(this.id,this.pageNumber,this.pageSize)
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
      this.causeForm.controls['reclamation'].setValue(data)
      this.consequenceForm.controls['reclamation'].setValue(data)
      this.consequenceFormEdit.controls['reclamation'].setValue(data)
      this.causeFormEdit.controls['reclamation'].setValue(data)

     })
  }
  openPopupAddCause() {
    this.displayStyleCauseAdd = "block";
    const bodyTag = document.body;
    bodyTag.classList.add('modal-open');
  }
  closePopupAddCause() {
    this.displayStyleCauseAdd = "none";
  }
  openPopupAddConsequeance() {
    this.displayStyleConsequeanceAdd = "block";
    const bodyTag = document.body;
    bodyTag.classList.add('modal-open');
  }
  closePopuAddConsequeance() {
    this.displayStyleConsequeanceAdd = "none";
  }
  getCauses(id:number,pageNumber:number,pageSize:number){
     this.causeService.getCauses(pageNumber,pageSize).subscribe((data:Causes[])=>{
         this.causes=data.filter(item=>item.reclamationDto.idReclamation==id)
         console.log(this.causes)
     })
  }

  getConsequences(id:number,pageNumber:number,pageSize:number){
    this.consequanceService.getConsequances(pageNumber,pageSize).subscribe((data:Consequances[])=>{
        this.consequences=data.filter(item=>item.reclamationDto.idReclamation==id)
        console.log(this.consequences)
    })
 }

 submitAddCauses(){
  this.causeService.addCause(this.causeForm.value).subscribe((data:Causes)=>{
    this.causeForm.reset()
    this.closePopupAddCause()
    this.showNotificationAdd()
    this.getCauses(this.id,this.pageNumber,this.pageSize)
  })
 }

 submitAddConsequeces(){
  this.consequanceService.addConsequance(this.consequenceForm.value).subscribe((data:Causes)=>{
    this.causeForm.reset()
    this.closePopuAddConsequeance()
    this.showNotificationAdd()
    this.getConsequences(this.id,this.pageNumber,this.pageSize)
  })
 }

 deleteCause(id:number){
  var result = confirm("Vous etes sure de supprimer cette cause");
  if(result){
  this.causeService.deleteCause(id).subscribe(data=>{
    this.getCauses(this.id,this.pageNumber,this.pageSize)
    this.showNotificationDelete()
  })
}
 }
 deleteConsequence(id:number){
  var result = confirm("Vous etes sure de supprimer cette consequence");
  if(result){
  this.consequanceService.deleteConsequance(id).subscribe(data=>{
    this.getConsequences(this.id,this.pageNumber,this.pageSize)
    this.showNotificationDelete()
  })
}
 }
 // consequences edit
 openPopupEditConsequeance(id:number) {
  this.idConsequences=id
  this.getConsequecneById(id)
  this.displayStyleConsequeanceEdit = "block";
  const bodyTag = document.body;
  bodyTag.classList.add('modal-open');
}
closePopuEditConsequeance() {
  this.displayStyleConsequeanceEdit = "none";
}
getConsequecneById(id){
  this.consequanceService.getConsequanceById(id).subscribe((data:Consequances)=>{
    this.consequenceFormEdit.controls["dateCreation"].setValue(data.dateCreation)
    this.consequenceFormEdit.controls["descriptionConsequances"].setValue(data.descriptionConsequances)

  })
}
submitEditConsequeces(){
   this.consequanceService.editConsequances(this.consequenceFormEdit.value,this.idConsequences).subscribe((data)=>{
    this.consequenceFormEdit.reset()
    this.closePopuEditConsequeance()
    this.showNotificationEdit()
    this.getConsequences(this.id,this.pageNumber,this.pageSize)  
    })
}


//causes edit
openPopupEditCause(id:number) {
  this.idCause=id
  this.getCauseById(id)
  this.displayStyleCauseEdit = "block";
  const bodyTag = document.body;
  bodyTag.classList.add('modal-open');
}
closePopupEditCause() {
  this.displayStyleCauseEdit = "none";
}
getCauseById(id){
  this.causeService.getCausesById(id).subscribe((data:Causes)=>{
    this.causeFormEdit.controls["dateCreation"].setValue(data.dateCreation)
    this.causeFormEdit.controls["descriptionCause"].setValue(data.descriptionCause)
    this.causeFormEdit.controls["nature"].setValue(data.nature)
  })
}
submitEditCauses(){
   this.causeService.editCauses(this.causeFormEdit.value,this.idCause).subscribe((data)=>{
    this.causeFormEdit.reset()
    this.closePopupEditCause()
    this.showNotificationEdit()
    this.getCauses(this.id,this.pageNumber,this.pageSize)  
    })
}

showNotificationAdd(){
  this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> <b>Ajout est effectuée avec succes</b>.', '', {
    timeOut: 8000,
    closeButton: true,
    enableHtml: true,
    toastClass: "alert alert-primary alert-with-icon",
    positionClass: 'toast-top-right'
  });

}
showNotificationEdit(){
  this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> <b>Modification est effectuée avec succes</b>.', '', {
    timeOut: 8000,
    closeButton: true,
    enableHtml: true,
    toastClass: "alert alert-primary alert-with-icon",
    positionClass: 'toast-top-right'
  });

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
