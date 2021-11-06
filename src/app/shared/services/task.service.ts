import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  constructor(private http: HttpClient) { }

  findAllTasks(empId: number): Observable<any> {

    return this.http.get('/api/employees/' + empId + '/tasks');
  }

  createTask(empId: number, task: string): Observable<any> {

    return this.http.post('/api/employees/' + empId + '/tasks', {

      text: task
    })
}
}
