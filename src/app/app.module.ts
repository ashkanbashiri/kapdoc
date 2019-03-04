import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule,MatIconModule} from '@angular/material';
import {AppRoutingModule, routingComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactDetailsComponent } from './contacts/contact-details/contact-details.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { DoctorsComponent } from './kapdoc/doctors/doctors.component';
import { MainpageComponent } from './kapdoc/mainpage/mainpage.component';
import {MaterialModule} from './material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { WelcomeComponent } from './welcome/welcome.component';
import { KapdocnavbarComponent } from './kapdoc/kapdocnavbar/kapdocnavbar.component';
import {DataService} from './data/data.service';
import { PostDialogComponent } from './post-dialog/post-dialog.component';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { AdminComponent } from './admin';
import { LoginComponent } from './login';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchpageComponent, SearchService } from './search/searchpage/searchpage.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import {MatAutocompleteModule,MatOptionModule,MatInputModule,MatFormFieldModule} from '@angular/material/';
import { MylogincomponentComponent } from './mylogincomponent/mylogincomponent.component';
import { InfiniteScrollerDirective } from './infinite-scroller.directive';
import { HackerNewsService } from './hacker-news.service';
import { FunpageComponent } from './funpage/funpage.component';
import { MysearchComponent } from './mysearch/mysearch.component';


//import {fakeBackendProvider} from './_helpers';




@NgModule({
  declarations: [
    AppComponent,
    ContactDetailsComponent,
    ContactListComponent,
    DoctorsComponent,
    routingComponents,
    MainpageComponent,
    WelcomeComponent,
    KapdocnavbarComponent,
    PostDialogComponent,
    AppComponent,
    HomeComponent,
    AdminComponent,
    LoginComponent,
    FooterComponent,
    ProfileComponent,
    SearchpageComponent,
    MainNavComponent,
    MylogincomponentComponent,
    InfiniteScrollerDirective,
    FunpageComponent,
    MysearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatFormFieldModule
  ],
  exports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule
  ],
  providers: [
    SearchService,
    HackerNewsService,
    DataService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    //fakeBackendProvider
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    PostDialogComponent
  ],

})
export class AppModule { }
