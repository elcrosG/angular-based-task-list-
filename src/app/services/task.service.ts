import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Task } from '../Task';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private apiUrl = "http://localhost:5000/tasks?userid=";
  private api = "http://localhost:5000/tasks";
  id!: number;
  constructor(private http:HttpClient) { }
  setID(id:number){
    this.apiUrl = "http://localhost:5000/tasks?userid=" + id;
    this.id = id;
  }
  getID(){
    return this.id;
  }
  getTasks(): Observable<Task[]>{
    return this.http.get<Task[]>(this.apiUrl);
  }
  updateTask(task: Task): Observable<Task>{
    const uri = `${this.api}/${task.id} `;
    return this.http.put<Task>(uri, task, httpOptions);
  }
  deleteTask(task: Task): Observable<Task>{
    const uri = `${this.api}/${task.id} `;
    return this.http.delete<Task>(uri);
  }
  addTask(task: Task): Observable<Task>{
    return this.http.post<Task>(this.api, task, httpOptions);
  }
  
}
