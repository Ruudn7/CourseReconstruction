import { Input, Component, OnInit } from '@angular/core';
import { Courses } from '../courses';
import { User } from '../../users/user';
import { Router, ActivatedRoute } from '@angular/router';

import { CoursesService } from '../courses.service'
import { UsersService } from '../../users/users.service'


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {


  //for Edit Users
  id: any;
  errorMessage: string;
  course: Courses;
  users: User[];
  isEditAble: Boolean = false;

  constructor(
    private coursesService: CoursesService,
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.route               //z jakiego adresu wwww przechodzę do wykonania tej funkcji, spisuje to co jest po głównym adresie strony
        .params              // robija wszystkie elementy po głównym adresie do postaci nodeList
        .map( params => params['id'])  // zazacz id w url
        .do(id => this.id = id)   //dla pobranej wartości id => stwórz zmienną id (this mówi że jest tylko w tym pliku) i przypisz pobraną wartość id
        .subscribe(id => {     // dla pobranego id
          this.getUsers()     //pobieramy useres i przechodzimy do funkcji (linijka 61)
          if(this.id !== undefined) {      // jeżeli id zostało pobrane (wchodzimy ze strony istniejącego kursu) to
            this.coursesService       //dla CoursesServices
              .getCourse(this.id)   //pobierz id z tego kursu (mapowane w linijce 36)
              .subscribe(             //przechodzi dalej   (subscribe to takie rozwiązanie obietnicy)
                course => this.course = course,   
                error => this.errorMessage = <any>error
              )
              this.isEditAble = true;       //czy zmienna ma być widoczna w widoku
          } else {
            this.course = {     //dla kursu w witrynie z której otwieramy stronę (a z ifa wynika że nie ma tam id)
              type: ''          //daj wszstkie pola puste
            }
          }
        }
        );




  }

  getUsers(){                                                          //funkcja wywołana w linijce 39 
    this.usersService.getUsers()                                      // pobieramy z backendu funkcję getUsets z usersService 
     .subscribe(                                                        //blokada promise, ale jeżeli przejdzie
       users => this.users = users,                                     // dla zmiennej users pobranej z usersService  robimy zmienną users i przypisujemy pobraną wartość
       error => this.errorMessage = <any>error              // jeżei występuje błąd to wyświetlamy błąd
     )
  }
  getCourse() {
    
      this.coursesService                 // dla pobrango przez funkcję coursesService  
        .getCourse(this.id)               //pobierz id
        .subscribe(                         // przejdź dalej
          course => this.course = course,       //zmienna course = pobrane course
          error => this.errorMessage = <any>error     //jak nie to wyświetl błąd
        )
  }

  add(course: Courses) {          //
    if(this.isEditAble){

      //check is zatwierdzony==status
      if(course.status == 'zatwierdzony' && !course.number)       //jeżeli jest zatwierdzony po raz pierwszy (nie ma jeszcze numeru)
        this.addNumberCourse(course)
      else
        this.updateCourse(course)


  } else {

    course.status = 'Roboczy';
      this.coursesService                          //odwołuje się do backendu ale jeszcze nie pobiera
        .addCourse(course)                         // wywołuje funkcje z html add i dodaje kurs
        .subscribe(
          resUser => this.router.navigateByUrl('/courses'),     //obojętna prawa strona, przekierowanie użytkowanika na listę kursów
          error => this.errorMessage = <any>error
        )
    }

  }


  updateCourse(course: Courses) {
    this.coursesService
      .updateCourse(course, this.id)
      .subscribe(
        resCourse => this.router.navigateByUrl('/course'),
        error => this.errorMessage = <any>error
      )
  }



  addNumberCourse(course: Courses) {
    this.coursesService.getCourse(course.type)
      .subscribe(
        number => {
          course.number = number.Is +1;
          course.numberYear = new Date().getFullYear();
          this.updateCourse(course);
        }
      )
  }


    isCorrectStatus() {                                             // czy możliwe jest rozwijanie pierwszej częsci listy
      if(this.course.status == 'zatwierdzony'
        || this.course.status == 'zmieniony'
        || this.course.status == 'zakończony'
        || this.course.status == 'odwołany')
        return false;
      else
        return true;
    }



}

