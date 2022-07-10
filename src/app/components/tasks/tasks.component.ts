import { Component, OnInit, Inject, Output, EventEmitter, ViewChild} from '@angular/core';
import { Task } from '../../Task';
import { TaskService} from '../../services/task.service'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroupDirective, NgForm, Validators } from '@angular/forms';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  @ViewChild('add') myNgForm!: FormGroupDirective;

  addForm = this.fb.group({
    text: ['', Validators.required],
    day: ['', Validators.required],
    time: ['', Validators.required],
    reminder: [false]
  })

  btnText: string = "Add";
  title = 'Task Tracker';
  showAddTask: boolean = false;
  faTimes = faTimes;
  tasks: Task[] = [];

  constructor(private taskService: TaskService, public dialog: MatDialog, private logService:LoginService, private router: Router, private fb: FormBuilder) {}

  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  formatDate(date: Date) {
    return (
      [
        date.getFullYear(),
        this.padTo2Digits(date.getMonth() + 1),
        this.padTo2Digits(date.getDate()),
      ].join('-')
    )
  }

  currentDate = this.formatDate(new Date());

  addTask(task: Task): void{
    this.taskService.addTask(task).subscribe((task)=>this.tasks.push(task));
  }

  onSubmit(): any{

    const newTask = {
      text: this.addForm.value.text!,
      day: this.addForm.value.day!,
      time: this.addForm.value.time!,
      reminder: this.addForm.value.reminder!,
      userid: this.taskService.getID()!
    }
    if(this.addForm.status === 'VALID'){
      this.addTask(newTask);
      this.addForm.reset();
      this.myNgForm.resetForm();
    }

  }
  upTask(task: Task): void{
    task.reminder = !task.reminder;
    this.taskService.updateTask(task).subscribe();
  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }
  
  toggleAddTask(): void{
    if(this.btnText === "Close"){
      this.btnText = "Add";
    }else{
      this.btnText = "Close";
    }
    this.showAddTask = !this.showAddTask;
  }

  ngDoCheck(){
    if(!this.logService.getLoggedIn()){
      this.router.navigate(['/login']);
    }
  }

  delTask(task: Task): void{
    this.taskService
    .deleteTask(task)
    .subscribe(() => (this.tasks = this.tasks.filter(t => t.id !== task.id)));
  }

  openDialog(task:Task) {

    const dialogRef = this.dialog.open(DialogComponent, {
      data: task
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.delTask(task)
      }
    });
  }

}

@Component({
  selector: 'dialogs.component',
  templateUrl: 'dialog.component.html',
})

export class DialogComponent {
  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Task) {}
  
}