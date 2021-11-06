import { Component, OnInit } from '@angular/core';
import { Employee } from '../shared/models/employee.interface';
import { Item } from '../shared/models/item.interface';
import { TaskService } from '../shared/services/task.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from '../create-task-dialog/create-task-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  employee: Employee;
  todo: Item[];
  done: Item[];
  empId: number;

  constructor(
    private taskService: TaskService,
    private cookieService: CookieService,
    private dialog: MatDialog
  ) {
    this.empId = parseInt(this.cookieService.get('session_user'), 10);

    this.taskService.findAllTasks(this.empId).subscribe(
      (res) => {
        console.log('--Server respons from findAllTasks--');
        console.log(res);

        this.employee = res;
        console.log('--Employee object--');
        console.log(this.employee);
      },
      (err) => {
        console.log('--Server error--');
        console.log(err);
      },
      () => {
        console.log('Inside the complete function of findAllTasks API');

        console.log('--Todo tasks--');
        console.log(this.todo);

        console.log('--Done tasks--');
        console.log(this.done);
      }
    );
  }

  ngOnInit(): void {}

  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.taskService.createTask(this.empId, data.text).subscribe(
          (res) => {
            this.employee = res;
          },
          (err) => {
            console.log('--Server Error!--');
            console.log(err);
          },
          () => {
            this.todo = this.employee.todo;
            this.done = this.employee.done;
          }
        );
      }
    });
  }
}
