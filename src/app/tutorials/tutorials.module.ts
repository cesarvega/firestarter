import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorialsComponent } from './tutorials.component';
import { TutorialRoutingModule } from './tutorial-routing.module';
import { VideoComponent } from './video/video.component';
import { AstreaComponent } from './astrea/astrea.component';



@NgModule({
  declarations: [TutorialsComponent, VideoComponent, AstreaComponent],
  imports: [
    CommonModule,
    TutorialRoutingModule
  ]
})
export class TutorialsModule { }
