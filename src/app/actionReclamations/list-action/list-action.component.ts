import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { ActionReclamation } from '../../model/actionReclamation';
import { ActionReclamationService } from '../../services/actionReclamation.service';
import { Causes } from '../../model/causes';
import { CauseService } from '../../services/cause.service';
import { ToastrService}  from 'ngx-toastr';

@Component({
  selector: 'list-action',
  templateUrl: './list-action.component.html',
  styleUrls: ['./list-action.component.css']
})
export class ListActionComponent implements OnInit {
  displayStyleAdd:String
  displayStyleEdit:String
  public actionFormGroup:FormGroup
  public actionFormGroupEdit:FormGroup
  modalTite:String
  actionReclamations:ActionReclamation[]
  public idAction=null
  public id:number
  constructor(private toastr: ToastrService,private formBuilder: FormBuilder,private route: ActivatedRoute,private actionReclamationService:ActionReclamationService,private causeService:CauseService) { }

  ngOnInit(): void {
    this.id=+this.route.snapshot.paramMap.get('id');
    this.actionFormGroup = this.formBuilder.group({
      cin: ['', [Validators.required]],
      responsable: ['', [Validators.required]],
      dateDecision: ['', [Validators.required]],
      libelle: ['', [Validators.required]],
    });
    this.actionFormGroup= this.formBuilder.group({
      cin: ['', [Validators.required]],
      responsable: ['', [Validators.required]],
      dateDecision: ['', [Validators.required]],
      libelle: ['', [Validators.required]],
      causes:['',Validators.required]
    });
    this.actionFormGroupEdit= this.formBuilder.group({
      cin: ['', [Validators.required]],
      responsable: ['', [Validators.required]],
      dateDecision: ['', [Validators.required]],
      libelle: ['', [Validators.required]],
      causes:['',Validators.required]
    });
    this.getCauseById(this.id)
    this.getActionReclamtion(this.id)
  }
  openPopupAdd() {
    this.displayStyleAdd = "block";
    this.modalTite="Ajouter une Action"
    const bodyTag = document.body;
    bodyTag.classList.add('modal-open');
  }
  closePopupAdd() {
    this.displayStyleAdd = "none";

  }


  getActionReclamtion(id:number){
    this.actionReclamationService.getActionReclamations().subscribe((data:ActionReclamation[])=>{
      this.actionReclamations=data.filter(item=>item.causesDto.idCauses==id)
      console.log(this.actionReclamations)
    })
  }
  onSubmitAddActionRisque(){
   
      this.actionReclamationService.addActionReclamation(this.actionFormGroup.value).subscribe(data=>{
        this.actionFormGroup.reset()
         this.closePopupAdd()
         this.showNotificationAdd()
        this.getActionReclamtion(this.id)
      })
    

  }
  onSubmitEditActionRisque()
  {
    this.actionReclamationService.editActionReclamation(this.actionFormGroupEdit.value,this.idAction).subscribe(data=>{
      this.actionFormGroupEdit.reset()
      this.closePopupEdit()
      this.showNotificationEdit()
      this.getActionReclamtion(this.id)
  })
  }
  onDeleteActionReclamation(id:number){
    var result = confirm("Vous etes sure de supprimer cette action");
    if(result){
     this.actionReclamationService.deleteActionReclamation(id).subscribe(data=>{
      this.getActionReclamtion(this.id)
      this.showNotificationDelete()
     })
    }
  }
  openPopupEdit(id:number) {
    this.idAction=id
    this.getActionRisqueById(id)
    this.displayStyleEdit = "block";
    const bodyTag = document.body;
    bodyTag.classList.add('modal-open');

  }
 

  getActionRisqueById(id:number){
    this.idAction=id
    this.modalTite="Modifier une Action"
    this.actionReclamationService.getActionReclamationById(id).subscribe((data:ActionReclamation)=>{
          this.actionFormGroupEdit.controls['cin'].setValue(data.cin)
          this.actionFormGroupEdit.controls['responsable'].setValue(data.responsable)
          this.actionFormGroupEdit.controls['dateDecision'].setValue(data.dateDecision)
          this.actionFormGroupEdit.controls['libelle'].setValue(data.libelle)
          



          
    })
  }
  closePopupEdit() {
    this.displayStyleEdit = "none";

  }
  getCauseById(id){
    this.causeService.getCausesById(id).subscribe((data:Causes)=>{
      this.actionFormGroupEdit.controls['causes'].setValue(data)
      this.actionFormGroup.controls['causes'].setValue(data)

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
