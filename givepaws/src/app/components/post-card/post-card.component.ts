import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators , FormArray, FormBuilder } from '@angular/forms'  
import { DonateService } from 'src/app/services/donate.service';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  imgMessage = "Upload ใบเสร็จ"
  imgMessage_2 = "Upload รูป"
  files: File[] = [];
  files_2: File[] = [];
  cardForm: FormGroup;
  hospitalList: any;
  // topicForm: FormGroup;

  constructor(
    private _fb:FormBuilder,
    private _donateSerivce: DonateService,
    private _userService: UserService,
    private _toastr: ToastrService,
    private _router: Router,
  ){
    this.cardForm = this._fb.group({
      topic: this._fb.control('',[Validators.required]),
      description: this._fb.control('',[Validators.required]),
      date: '',
      cardstatus: 'waiting',
      receipttype:this._fb.control('',[Validators.required]),
      receiptnumber:this._fb.control('',[Validators.required]),
      receiptimgpath:this._fb.control([],[Validators.required]),
      price:this._fb.control('',Validators.compose([Validators.required,Validators.pattern(/^[0-9]\d*$/)])),
      hospitalid: this._fb.control('',[Validators.required]),
      topicForm: this._fb.group({
        topics: this._fb.array([])
      }),
      uploaded_images: [[], Validators.required],
      user:'',
    });
  }

  ngOnInit(): void {
    this._userService.getHospitalList().subscribe({
      next: res =>{
        this.hospitalList = res
      }
    })
  }

  private topicGroup(): FormGroup {
    return this._fb.group({
      topic: this._fb.control('',[Validators.required]),
      amount: this._fb.control('',Validators.compose([Validators.required,Validators.pattern(/^[0-9]\d*$/)])),
    });
  }

  addTopic(): void {
    this.topicsArray.push(this.topicGroup());
  }
 

  removeTopic(index: number): void {
    this.topicsArray.removeAt(index);
  }

  get topicsArray(): FormArray {
    return <FormArray>this.cardForm.get('topicForm')?.get('topics')
  }
  
  onSelect(event:any) {
    this.imgMessage = "Upload ใบเสร็จ"
    this.files.push(...event.addedFiles);
    this.cardForm.patchValue({
      receiptimgpath: this.files
    })

  }
  onRemove(event:any) {
    this.files.splice(this.files.indexOf(event), 1);
    this.cardForm.patchValue({
      receiptimgpath: this.files
    })

  }

  onSelect_2(event:any) {
    this.imgMessage_2 = "Upload รูป"
    this.files_2.push(...event.addedFiles);
    this.cardForm.patchValue({
      uploaded_images: this.files_2
    })
  }
  onRemove_2(event:any) {
    this.files_2.splice(this.files.indexOf(event), 1);
    this.cardForm.patchValue({
      uploaded_images: this.files_2
    })

  }

  onSubmit(){
      if(this.cardForm.get('topicForm')?.get('topics')?.value.length == 0){
        this.cardForm.get('topicForm')?.get('topics')?.clearAsyncValidators()
        this.cardForm.get('topicForm')?.get('topics')?.updateValueAndValidity()
      }

      if(this.cardForm.valid){
        console.log(this.cardForm.value)
        const now = new Date();
        this.cardForm.patchValue({
          date: now.toISOString().slice(0, 19).replace('T', ' '),
          user: sessionStorage.getItem('id')
        })
        this._donateSerivce.postDonate(this.cardForm.value).subscribe({
          next: res =>{
            if(res){
              console.log(res)
              this._router.navigate(['acceptdonate/history/',sessionStorage.getItem('username')])
              this._toastr.success('sent post request successfully')
            }
            else{
              this._toastr.error('Error !!!, Something wrong')
            }
          }
        })
      }
      else{
        this.imgMessage = "กรุณา Upload ใบเสร็จ"
        this.imgMessage_2 = "กรุณา Upload รูป"
      }
    }
  
}
