import { Input, Component, OnInit } from '@angular/core';
import { Courses } from '../courses';
import { User } from '../../users/user';
import { Router, ActivatedRoute } from '@angular/router';

import { CoursesService } from '../courses.service';
import { UsersService } from '../../users/users.service';


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

  add(course: Courses) {
    
    //Step 1
    // Date Validation
    let dateValidation = this.dateValidation(course);                           //sprawdza odpowiednie daty kursu
    if(this.isEditAble){
      if(course.numberUser) {
        let isValid = this.checkValidationNumberUser(course.numberUser, course.instructors);     // sprawdza odpowiednią ilość uczestników/instruktorów
        if(isValid.status === true) {                                                             //jeżeli tak
          if(this.isEditAble) {
            //check is zatwierdzony == status
            if(course.status == 'zatwierdzony' && !course.number)         //czy edytowany czy nowy?
              this.addNumberCourse(course)                                                //jeżeli był nowy
            else
              this.updateCourse(course)                                                    //jeżeli był edutowany
          } else {
            course.status = 'Roboczy';
              this.coursesService
                .addCourse(course)
                .subscribe(
                  resUser => this.router.navigateByUrl('/courses'),
                  error => this.errorMessage = <any>error
                )
          }
        } else 
          alert( 'Za mało instruktorów na taką liczbę uczestników');
        }
      } else {
        alert( 'Uzupełnij prawidłowo datę');

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


  dateValidation(course: Courses) {
    if(course.type == '16h') {
      if(new Date(course.dateFirstEnd) > new Date(course.dateFirstStart))
        return true;
      else
        return false;
    } else if(course.type == 'WKPP') {
        let dateStart = new Date(course.dateFirstStart);
        let newStartDate = new Date(course.dateFirstStart);
        newStartDate.setDate(newStartDate.getDate() + 3);     //czemu + 3?
        let dateEnd = new Date(course.dateFirstEnd);

        let dateTwoStart = new Date(course.dateSecondEnd);
        let newStartTwoDate = new Date(course.dateSecondEnd);
        newStartTwoDate.setDate(newStartTwoDate.getDate() + 3);
        let dateTwoEnd = new Date(course.dateSecondEnd);

        if(newStartDate >= dateEnd && newStartTwoDate >= dateTwoEnd)
          return true;
        else
          return false;
    } else if(course.type == '')
      return false; 
    else 
      return true;
  }


    checkValidationNumberUser(usersNumber: number,  instructors: string[]): any {
    let howManyInstructor = Math.ceil(usersNumber / 6);
    if(instructors !== undefined) {
      
      if(instructors.length >= howManyInstructor)
        return {'status': true};
      else
        return {'status': false, 'number': howManyInstructor};
      
    } else {
      return {'status': false, 'number': howManyInstructor};
    }

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

