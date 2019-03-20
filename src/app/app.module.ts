import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import { IntroComponent } from './intro/intro.component';
import { ItemFeedComponent } from './item-feed/item-feed.component';
import { ItemComponent } from './item/item.component';
import { ChatComponent } from './chat/chat.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { UploadItemComponent } from './upload-item/upload-item.component';
import { AdminHeatmapComponent } from './admin-heatmap/admin-heatmap.component';
import { AdminProbabilityComponent } from './admin-probability/admin-probability.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    ItemFeedComponent,
    ItemComponent,
    ChatComponent,
    AdminDashboardComponent,
    UploadItemComponent,
    AdminHeatmapComponent,
    AdminProbabilityComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
