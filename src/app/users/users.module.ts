import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { InspektoratComponent } from './inspektorat/inspektorat.component';
import { UsersListComponent } from './users-list/users-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AddUserComponent, EditUserComponent, InspektoratComponent, UsersListComponent]
})
export class UsersModule { }
