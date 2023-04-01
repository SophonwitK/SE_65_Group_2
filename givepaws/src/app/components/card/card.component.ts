import { Component, OnInit,Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DonateService } from '../../services/donate.service';
import { MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  username = sessionStorage.getItem('username')
  user_id = sessionStorage.getItem('id')
  id:any
  cardData:any
  acceptDonate:any
  donarData:any
  imageObject: Array<object> = []
  totalDonate: Array<any> = []

  constructor(
    private _activeRouter: ActivatedRoute,
    private _donateService: DonateService,
    private _dialog: MatDialog,
    private _router: Router,
    private _toastr: ToastrService,
  ){

  }

  ngOnInit(): void {
    this.id = this._activeRouter.snapshot.paramMap.get('id')
    this.getCardByID()
    this._donateService.getDonateAcceptByCardID(this.id).subscribe({
      next: res =>{
        this.acceptDonate = res
      }
    })
    this.getDonar();
  }

  getDonar(){
    this._donateService.getAllDonarByCardID(this.id).subscribe({
      next: res=>{
        this.donarData = res
      }
    })
  }

  getCardByID(){
    this._donateService.getCardByID(this.id).subscribe({
      next: res =>{
        this.cardData = res
        console.log(res)
        res.donate_topic.forEach((topic:any) => {
          this._donateService.getAllTotalDonateByTopicID(topic.donatetopicid).subscribe({
            next: res =>{
              this.totalDonate.push(res)
            }
          })
        });
        res.images.forEach((data:any) => {
          this.imageObject.push({
            image: `http://127.0.0.1:8000/${data.image}`,
            thumbImage: `http://127.0.0.1:8000/${data.image}`,
          })
        });
      }
    })
  }

  openDonar(enterAnimationDuration: string, exitAnimationDuration: string,card_id: any): void {
    const dialog = this._dialog.open(DonarComponent, {
      data: card_id,
      width:'25%',
      height: 'auto',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialog.afterClosed().subscribe({
      next: (res) =>{
        this.getDonar();
      }
    })
  }

  deleteDonar(enterAnimationDuration: string, exitAnimationDuration: string,donar: any): void {
    const dialog = this._dialog.open(DeleteDonarComponent, {
      data: donar,
      width:'15%',
      height: 'auto',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialog.afterClosed().subscribe({
      next: (res) =>{
        this.getDonar();
      }
    })
  }

  
  openReport(enterAnimationDuration: string, exitAnimationDuration: string,card_id: any): void {
    const dialog = this._dialog.open(ReportComponent, {
      
      data: card_id,
      width:'25%',
      height: 'auto',
      position: {top: '10rem'},
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialog.afterClosed().subscribe({
      next: (res) =>{
        this.getDonar();
      }
    })
  }

  openSlip(enterAnimationDuration: string, exitAnimationDuration: string,topic: any): void {
    const dialog = this._dialog.open(ViewSlipComponent, {
      data: topic,
      width:'20%',
      height: 'auto',
      position: {top: '10rem'},
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialog.afterClosed().subscribe({
      next: (res) =>{
        this.getDonar();
      }
    })
  }

  openPayment(enterAnimationDuration: string, exitAnimationDuration: string,card: any): void {
    const dialog = this._dialog.open(PaymentComponent, {
      data: card,
      width:'20%',
      height: 'auto',
      position: {top: '10rem'},
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialog.afterClosed().subscribe({
      next: (res) =>{

      }
    })
  }


  login(){
    this._router.navigate(['login']);
    this._toastr.error('please login');
  }


}

@Component({
  selector: 'add-donar-card',
  templateUrl: './add-donar.component.html',
})
export class DonarComponent{
  donarData: FormGroup;
  imgMessage = "Upload Images"
  files: File[] = [];

  constructor(
    public _dialogRef: MatDialogRef<DonarComponent>,
    private _fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public card_id: any,
    private _donateService: DonateService,
    private _toastr: ToastrService,
  ){
    this.donarData = this._fb.group({
      date: '',
      topic: this._fb.control('',Validators.required),
      img:this._fb.control('',Validators.required),
      description: this._fb.control('',Validators.required),
      cardid: this.card_id,
    })
  }

    
  onSelect(event:any) {
    this.imgMessage = "Upload Images"
    this.files.push(...event.addedFiles);
    this.donarData.patchValue({
      img: this.files
    })
  }
  onRemove(event:any) {
    this.files.splice(this.files.indexOf(event), 1);
    this.donarData.patchValue({
      img: this.files
    })
  }

  onSubmit(){
    if(this.donarData.valid){
      const now = new Date();
      this.donarData.patchValue({
        date: now.toISOString().slice(0, 19).replace('T', ' ')
      })
      this._donateService.postDonar(this.donarData.value).subscribe({
        next: res =>{
          if(res){
            this._dialogRef.close()
            this._toastr.success("post successfully")
          }
          else{
            this._toastr.error("error !, something wrong")
          }
        }
      })

    }
    else{ 
      this.imgMessage = "Images Require"
      this._toastr.warning("Please, Enter valid Data")
    }
  }
}


@Component({
  selector: 'delete-donar-card',
  templateUrl: './delete-donar.component.html',
})
export class DeleteDonarComponent{
  constructor(
    private _donateService:DonateService,
    @Inject(MAT_DIALOG_DATA) public donar: any,
    private _toastr: ToastrService,
    private _dialogRef: DialogRef,
  ){

  }

  onDelete(){
      this._donateService.deleteDonar(this.donar.donarid).subscribe({
        next: res =>{
            this._dialogRef.close()
            this._toastr.success("delete successfully")
        }
      })
    }

}
    

@Component({
  selector: 'report-card',
  templateUrl: './report.component.html',
})
export class ReportComponent implements OnInit {
  user_id = sessionStorage.getItem('id')
  reportData: FormGroup

  constructor(
    public _dialogRef: MatDialogRef<DonarComponent>,
    private _fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public card_id: any,
    private _donateService: DonateService,
    private _toastr: ToastrService,
  ){
    this.reportData = this._fb.group({
      topic: this._fb.control('',Validators.required),
      description: this._fb.control('',Validators.required),
      cardid: this.card_id,
      userid: this.user_id,
    })
  }

  ngOnInit(): void {

  }

  onSubmit(){
    if(this.reportData.valid){
      this._donateService.postReport(this.reportData.value).subscribe({
        next: res =>{
          if(res){
            this._dialogRef.close()
            this._toastr.success("report successfully")
          }
          else{
            this._toastr.error("error !, something wrong")
          }
        }
      })
    }
    else{ 
      this._toastr.warning("Please, Enter valid Data")
    }
  }

}

@Component({
  selector: 'payment-card',
  templateUrl: './payment.component.html',
})
export class PaymentComponent {
  imgMessage = "Upload Images"
  files: File[] = [];
  paymentData: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _dialogRef: MatDialogRef<DonarComponent>,
    private _fb:FormBuilder,
    private _donateService: DonateService,
    private _toastr: ToastrService,
  ){
    this.paymentData = this._fb.group({
      user: sessionStorage.getItem('id'),
      contribution : this._fb.control('',Validators.compose([Validators.required,Validators.pattern(/^[0-9]\d*$/)])),
      date:'',
      paymentcardimg:this._fb.control('',Validators.required),
      status: 'waiting',
      cardid:'',
      donatetopicid:'',
    })
  }
  ngOnInit(): void {

    console.log(this.data)
  }

  onSelect(event:any) {
    this.imgMessage = "Upload Images"
    this.files.push(...event.addedFiles);
    this.paymentData.patchValue({
      paymentcardimg: this.files
    })
  }
  onRemove(event:any) {
    this.files.splice(this.files.indexOf(event), 1);
    this.paymentData.patchValue({
      paymentcardimg: this.files
    })
  }

  onSubmit(){
    if(this.paymentData.valid){
      const now = new Date();
      this.paymentData.patchValue({
        date: now.toISOString().slice(0, 19).replace('T', ' ')
      })
      if(this.data.donatetopicid){
        this.paymentData.patchValue({
          donatetopicid: this.data.donatetopicid
        })
      }
      else{
        this.paymentData.patchValue({
          cardid: this.data.cardid
        })
      }
      this._donateService.postPayment(this.paymentData.value).subscribe({
        next: res =>{
          if(res){
            this._dialogRef.close()
            this._toastr.success("post successfully")
          }
          else{
            this._toastr.error("error !, something wrong")
          }
        }
      })

    }
    else{ 
      this.imgMessage = "Images Require"
      this._toastr.warning("Please, Enter valid Data")
    }
  }
}

@Component({
  selector: 'view-slip-topic-card',
  templateUrl: './view-slip.component.html',
})
export class ViewSlipComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public topic: any,
  ){
  }

}

