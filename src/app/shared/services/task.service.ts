/*
 * Author: Alex Haefner
 * Date: 11.10.2021
 * Description: Service file for tasks
 * Sources:
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/item.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  findAllTasks(empId: number): Observable<any> {
    return this.http.get('/api/employees/' + empId + '/tasks');
  }

  createTask(empId: number, task: string): Observable<any> {
    return this.http.post('/api/employees/' + empId + '/tasks', {
      text: task,
    });
  }

  updateTask(
    empId: number,
    todo: Item[],
    done: Item[],
    current: Item[]
  ): Observable<any> {
    return this.http.put('/api/employees/' + empId + '/tasks', {
      todo,
      done,
      current,
    });
  }

  deleteTask(empId: number, taskId: string): Observable<any> {
    return this.http.delete('/api/employees/' + empId + '/tasks/' + taskId);
  }
}
