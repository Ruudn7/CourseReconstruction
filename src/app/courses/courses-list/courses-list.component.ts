import { Component, OnInit } from '@angular/core';

import {Courses} from '../courses';
import {User} from '../../users/user';

import { CoursesService } from '../courses.service';
import { UsersService } from '../../users/users.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

  private courses: Courses[];
  private users: User[];
  private errorMessage: string;
  constructor(
    private coursesService: CoursesService,
    private usersService: UsersService,
  ){}

  ngOnInit() {                                     //funkcja która odpala się jako pierwsza
    this.usersService.getUsers()                    //wywołanie z backendu UsersService i funkcji getUser która zwraca adres konta jakiegoś użytkownika
    .subscribe(
      users => this.users = users,
      error => this.errorMessage = <any>error
    )

    this.coursesService.getCourses()            //wywołanie z backendu UsersService i funkcji getCourses która zwraca dane konkretnego kursu
      .subscribe(
        courses => this.courses = courses,
        error => this.errorMessage = <any>error
      )
  }



  checkSomethink(id) {                                                              //pobiera id użytkownika chef

    for(let i=0; i < this.users.length; i++) {                                      // iteruje po liście prowadzących kurs
      if(this.users[i]._id === id) {                                                //jeżeli id danego użytkownika się zgadza wyświetla jego imię i nazwisko
        return this.users[i].name + ' ' + this.users[i].surname;
      }
    }
    return 'Nie znaleziono użytkownika';
  }
}
