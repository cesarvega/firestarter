import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TutorialsComponent } from './tutorials.component';
import { VideoComponent } from './video/video.component';


const routes: Routes = [
  { path: '', component: TutorialsComponent },
  { path: 'video', component: VideoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TutorialRoutingModule { }
