import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from './course.component';
import { ChefPipe } from './chef.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ChefPipe]
})
export class CourseModule { }
