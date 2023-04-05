import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MemberAddEditComponent } from './Memberr/member-add-edit/member-add-edit.component';
import { MemberService } from './Memberr/Memberservice/member.service';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { EditMemberComponent } from './Memberr/edit-member/edit-member.component';


@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
    
  displayedColumns: string[] = [
    'id', 
    'userName', 
    'displayName',
    'email',
    'role', 
    'action'
  ];
    dataSource!: MatTableDataSource<any>;
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  
    constructor(
      private _dialog: MatDialog, 
      private _memberService: MemberService,
      private _authService:AuthService
      ) {}
    
    ngOnInit(): void {
      this.getMemberList();
    }
  
    logout(){
      this._authService.logout(null).subscribe({})
    }

    openAddEditMemberForm() {
      const dialogRef = this._dialog.open(MemberAddEditComponent,{});
      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if(val) {
            this.getMemberList();
          }
        },
      });
    }
  
    getMemberList() {
      this._memberService.getMemberList().subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error: console.log,
        });
      }
  
      applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }
  
      deleteMember(id: number) {

        this._memberService.deleteMember(id).subscribe({
          next: (res) => {
            alert('Member deleted')
            this.getMemberList();
          },
          error: console.log,
        });
      }
  
      openEditMemberForm(data: any) {
        const dialogRef = this._dialog.open(EditMemberComponent, {
          data,
          width: '35%',
        });
  
        dialogRef.afterClosed().subscribe({
          next: (val) => {
            if(val) {
              this.getMemberList();
            }
          },
        });
      }
  
}
