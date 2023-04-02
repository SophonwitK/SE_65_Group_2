import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { HomeComponent,AboutComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MatCardModule } from '@angular/material/card';
import { ToastrModule } from 'ngx-toastr';
import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { HospitalCoordinatorComponent } from './components/hospital-coordinator/hospital-coordinator.component';
import { UserProfileComponent,UpdateUserDialog,UpdatePasswordDialog } from './components/user-profile/user-profile.component';
import { MatCommonModule } from '@angular/material/core';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UploaderModule } from "angular-uploader";
import { DonateHistoryComponent,donateEditDialog } from './components/donate-history/donate-history.component';
import { ThaidatePipe } from './pipe/thaidate.pipe';
import { CardAllComponent } from './components/card-all/card-all.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { MatRadioModule } from '@angular/material/radio';
import { PostCardHistoryComponent,RejectCardDialog } from './components/post-card-history/post-card-history.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { CardComponent,DonarComponent,ReportComponent,DeleteDonarComponent,ViewSlipComponent,PaymentComponent,CloseCardComponent } from './components/card/card.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { TrasnferComponent } from './components/trasnfer/trasnfer.component';
import { TrasnferpopupComponent } from './components/trasnferpopup/trasnferpopup.component';
import { PopupComponent } from './components/popup/popup.component';
import { CheckDonatePaymentListComponent } from './components/check-donate-payment-list/check-donate-payment-list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CompleteCardComponent } from './components/complete-card/complete-card.component';

@NgModule({
  declarations: [
    CheckDonatePaymentListComponent,
    AppComponent,
    HomeComponent,
    PopupComponent,
    AdminComponent,
    LoginComponent,
    RegisterComponent,
    HospitalCoordinatorComponent,
    UserProfileComponent,
    UpdateUserDialog,
    AuthenticationComponent,
    UpdatePasswordDialog,
    DonateHistoryComponent,
    ThaidatePipe,
    donateEditDialog,
    CardAllComponent,
    PostCardComponent,
    PostCardHistoryComponent,
    AboutComponent,
    RejectCardDialog,
    CardComponent,
    DonarComponent,
    ReportComponent,
    DeleteDonarComponent,
    ViewSlipComponent,
    PaymentComponent,
    TrasnferComponent,
    TrasnferpopupComponent,
    CloseCardComponent,
    CompleteCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatSnackBarModule,
    MatListModule,
    MatCommonModule,
    NgxDropzoneModule,
    MatProgressSpinnerModule,
    UploaderModule,
    MatRadioModule,
    MatCardModule,
    MatGridListModule,
    NgImageSliderModule,
    MatTabsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      timeOut: 2000,
    }),
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule { }
