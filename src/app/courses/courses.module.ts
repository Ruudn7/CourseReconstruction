import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from './course/course.component';
import { ChefPipe } from './chef.pipe';
import { CoursesListComponent } from './courses-list/courses-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CourseComponent, ChefPipe, CoursesListComponent]
})
export class CoursesModule { }
