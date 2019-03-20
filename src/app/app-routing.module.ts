import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {UploadItemComponent} from './upload-item/upload-item.component';
import {AdminHeatmapComponent} from './admin-heatmap/admin-heatmap.component';
import {AdminProbabilityComponent} from './admin-probability/admin-probability.component';

const routes: Routes = [
  { path: 'admin-upload', component: UploadItemComponent },
  { path: 'admin-heatmap', component: AdminHeatmapComponent},
  { path: 'admin-probability', component: AdminProbabilityComponent},

];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
