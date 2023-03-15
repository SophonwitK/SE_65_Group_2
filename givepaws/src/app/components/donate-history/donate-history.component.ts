import { Component, ViewChild, OnInit,Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import  {MatTableDataSource } from '@angular/material/table';
import { DonateService } from 'src/app/services/donate.service';
import { MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup,FormBuilder ,Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-donate-history',
  templateUrl: './donate-history.component.html',
  styleUrls: ['./donate-history.component.scss']
})

export class DonateHistoryComponent implements OnInit{
  paymentData: any
  username = sessionStorage.getItem('username')
  user_id = sessionStorage.getItem('id')
  displayedColumns: string[] = ['paymentcardid','donatetopicid.cardid','donatetopicid','contribution', 'date', 'status','action']
  dataSource!: MatTableDataSource<any>

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  constructor(
    private _dialog: MatDialog,
    private _donateService: DonateService,
  ) {

  }

  ngOnInit() {
    this.donateHistory()
  } 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  donateHistory(){
    this._donateService.donateHistory(Number(this.user_id)).subscribe({
      next: res =>{
        if(res){
          console.log(res)
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      }
    })
  }

  openEdit(enterAnimationDuration: string, exitAnimationDuration: string,id: number): void {
    this._donateService.getPayment(id).subscribe({
      next: res =>{
        const dialog = this._dialog.open(donateEditDialog, {
          data: res,
          width:'25%',
          height: '50%',
          enterAnimationDuration,
          exitAnimationDuration,
        });
        dialog.afterClosed().subscribe({
          next: (res) =>{
            this.donateHistory()
          }
        })
      }
    })
  }

}

@Component({
  selector: 'donate-edit',
  templateUrl: './donate-edit.component.html',
  styleUrls: ['./donate-edit.component.scss'],
})
export class donateEditDialog{
  paymentData: FormGroup
  imgMessage = "Upload Images"
  files: File[] = [];

  constructor(
    public _dialogRef: MatDialogRef<donateEditDialog>,
    private _fb : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _donateService: DonateService,
    private _toastr: ToastrService,
    ) {
      this.paymentData = this._fb.group({
        contribution: this._fb.control({value: this.data.contribution, disabled: true}),
        status: this._fb.control('waiting'),
        paymentcardimg: ['', Validators.required],
      })
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
        this._donateService.updatePayment(this.data.paymentcardid,this.paymentData.value).subscribe({
          next: (res) =>{
            if(res){
              this._dialogRef.close()
              this._toastr.success("sent successfully")
            }
            else{
              this._toastr.error("error !, something wrong")
            }
          }
        })
      }
      else{
        this.imgMessage = "Images Require"
      }
    }

}

