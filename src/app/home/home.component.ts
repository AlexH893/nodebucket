import { Component, OnInit } from '@angular/core';
import { Employee } from '../shared/models/employee.interface';
import { Item } from '../shared/models/item.interface';
import { TaskService } from '../shared/services/task.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from '../create-task-dialog/create-task-dialog.component';

import {
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
  CdkDragDrop,
} from '@angular/cdk/drag-drop';

import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  //setMode = false;
  employee: Employee;
  todo: Item[];
  done: Item[];
  current: Item[];
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

        this.todo = this.employee.todo;
        this.done = this.employee.done;
        this.current = this.employee.current;

        console.log('--Todo tasks--');
        console.log(this.todo);

        console.log('--Current tasks--');
        console.log(this.current);

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
            this.current = this.employee.current;
          }
        );
      }
    });
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      alert(`Reordered the existing list of task items`);
      console.log(`Reordered the existing list of task items`);

      this.updateTaskList(this.empId, this.todo, this.done, this.current);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      console.log('Moved task item to the container');

      this.updateTaskList(this.empId, this.todo, this.done, this.current);
    }
  }

  updateTaskList(
    empId: number,
    todo: Item[],
    done: Item[],
    current: Item[]
  ): void {
    this.taskService.updateTask(empId, todo, done, current).subscribe(
      (res) => {
        this.employee = res.data;
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.todo = this.employee.todo;
        this.done = this.employee.done;
        this.current = this.employee.current;
      }
    );
  }

  deleteTask(taskId: string) {
    if (confirm('Are you sure you want to delete this task?')) {
      if (taskId) {
        console.log(`Task item: ${taskId} was deleted`);

        this.taskService.deleteTask(this.empId, taskId).subscribe(
          (res) => {
            this.employee = res.data;
          },
          (err) => {
            console.log(err);
          },
          () => {
            this.todo = this.employee.todo;
            this.done = this.employee.done;
            this.current = this.employee.current;
          }
        );
      }
    }
  }
}
