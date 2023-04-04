import { Component, OnInit,Input } from '@angular/core';
import { FormGroup,Validators , FormArray, FormBuilder } from '@angular/forms'  
import { DonateService } from 'src/app/services/donate.service';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  username = sessionStorage.getItem('username')
  imgMessage = "Upload ใบเสร็จ"
  imgMessage_2 = "Upload รูป"
  files: File[] = [];
  files_2: File[] = [];
  cardForm: FormGroup;
  hospitalList: any;
  card_id:any;
  // topicForm: FormGroup;

  constructor(
    private _fb:FormBuilder,
    private _donateSerivce: DonateService,
    private _userService: UserService,
    private _toastr: ToastrService,
    private _router: Router,
    private _activeRouter: ActivatedRoute,
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
      bankname:this._fb.control('',[Validators.required]),
      accountname:this._fb.control('',[Validators.required]),
      accountnumber:this._fb.control('',[Validators.required]),
    });
  }

  ngOnInit(): void {
    this.topicsArray.push(this.topicGroup());
    this.card_id = this._activeRouter.snapshot.paramMap.get('id')
    if(this.card_id){
      this._donateSerivce.getCardByID(this.card_id).subscribe({
        next: res =>{
          this.cardForm.patchValue({
            topic: res.topic,
            description: res.description,
            date: '',
            cardstatus: 'waiting',
            receipttype: res.receipttype,
            receiptnumber: res.receiptnumber,
            price: res.donate_topic[0].amount,
            hospitalid: res.hospitalid.hospitalid,
            bankname:res.bankname,
            accountname:res.accountname,
            accountnumber:res.accountnumber,
          })
          if(res.donate_topic.length > 1){
            res.donate_topic.forEach((topic:any) => {
              if(res.donate_topic[0]!=topic){
                this.patchDonateTopic(topic)
              }
            });
          }
        }
      })
    }
    this._userService.getHospitalList().subscribe({
      next: res =>{
        this.hospitalList = res
      }
    })
  }

  private topicGroup(): FormGroup {
    return this._fb.group({
      cardid: '',
      topic: this._fb.control('',[Validators.required]),
      amount: this._fb.control('',Validators.compose([Validators.required,Validators.pattern(/^[0-9]\d*$/)])),
      status: 'waiting',
    });
  }

  addTopic(): void {
    this.topicsArray.push(this.topicGroup());
  }

  patchDonateTopic(data:any){
    this.topicsArray.push(
      this._fb.group({
        cardid: '',
        topic: data.topic,
        amount: data.amount,
        status: 'waiting',
      })
    );
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
    const topicLength = this.cardForm.get('topicForm')?.get('topics')?.value.length
    this.topicsArray.at(0).patchValue({
      topic: "ค่ารักษา",
      amount: this.cardForm.get('price')?.value,
    })
    if(this.cardForm.valid){
      const now = new Date();
      this.cardForm.patchValue({
        date: now.toISOString().slice(0, 19).replace('T', ' '),
        user: sessionStorage.getItem('id')
      })
      if(this.card_id){
        this._donateSerivce.deleteCardByID(this.card_id).subscribe({})
      }
      this._donateSerivce.postDonate(this.cardForm.value).subscribe({
        next: res =>{
          if(res){
            const cardid = res.cardid
            for(let i=0;i<topicLength;i++){
              this.topicsArray.at(i).patchValue({
                cardid: cardid
              })
            }

            this._donateSerivce.postTopic(this.cardForm.get('topicForm')?.get('topics')?.value).subscribe({
              next: res =>{
                console.log(res)
              }
            })
            this._router.navigate(['post/card/history/',sessionStorage.getItem('username')])
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
