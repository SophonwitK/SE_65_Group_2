import { Component } from '@angular/core';
import { FormGroup,Validators , FormArray, FormBuilder } from '@angular/forms'  

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent {
  imgMessage = "Upload ใบเสร็จ"
  imgMessage_2 = "Upload รูป"
  files: File[] = [];
  files_2: File[] = [];
  cardForm: FormGroup;
  // topicForm: FormGroup;

  constructor(
    private _fb:FormBuilder
  ){
    // this.topicForm = this._fb.group({
    //   topics: this._fb.array([])
    // });
    // fields = ['cardid',
    // 'topic',
    // 'description',
    // 'date',
    // 'cardstatus',
    // 'receipttype',
    // 'receiptnumber',
    // 'receiptimgpath',
    // 'hospitalid',
    // 'user']
    this.cardForm = this._fb.group({
      topic: this._fb.control('',[Validators.required]),
      description: this._fb.control('',[Validators.required]),
      date: '',
      cardstatus: 'waiting',
      receipttype:this._fb.control('',[Validators.required]),
      receiptnumber:this._fb.control('',[Validators.required]),
      receiptimgpath:this._fb.control('',[Validators.required]),
      hospitalid: this._fb.control('',[Validators.required]),
      topicForm: this._fb.group({
        topics: this._fb.array([])
      }),
      user:'',
    });
  }

  private topicGroup(): FormGroup {
    return this._fb.group({
      topic: this._fb.control('',[Validators.required]),
      price: this._fb.control('',Validators.compose([Validators.required,Validators.pattern(/^[0-9]\d*$/)])),
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

  }
  onRemove(event:any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onSelect_2(event:any) {
    this.imgMessage_2 = "Upload รูป"
    this.files_2.push(...event.addedFiles);

  }
  onRemove_2(event:any) {
    this.files_2.splice(this.files.indexOf(event), 1);
  }

  onSubmit(){
    if(this.cardForm.get('topicForm')?.get('topics')?.value.length == 0){
      this.cardForm.get('topicForm')?.clearValidators()
      this.cardForm.get('topicForm')?.updateValueAndValidity()
      console.log('clear')
    }
    else{
      console.log('not clear false')
    }
    console.log(this.cardForm.get('topicForm')?.get('topics')?.value)
    console.log(this.cardForm.get('topicForm')?.value)
  }
  
}
