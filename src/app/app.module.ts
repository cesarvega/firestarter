import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// App Modules
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent, DialogOverviewExampleDialog } from './home-page/home-page.component';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';

// Firebase imports
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ServiceWorkerModule } from '@angular/service-worker';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AppGalleryComponent } from './app-gallery/app-gallery.component';
import { OwlModule } from 'ngx-owl-carousel';
import { TraxComponent } from './trax/trax.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { GridComponent } from './grid/grid.component';
import { DesktopComponent } from './home-page/desktop/desktop.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    DialogOverviewExampleDialog,
    DetailPageComponent,
    GalleryComponent,
    AppGalleryComponent,
    TraxComponent,
    CheckoutComponent,
    GridComponent,
    DesktopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    UserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FlexLayoutModule,
    MatRippleModule,
    MatDialogModule,
    ScrollingModule,
    FormsModule,
    NgbModule,
    OwlModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  entryComponents: [DialogOverviewExampleDialog],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
