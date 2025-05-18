import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-addingdetails',
  imports: [FormsModule,CommonModule],
  standalone: true,
  templateUrl: './addingdetails.component.html',
  styleUrl: './addingdetails.component.css'
})
export class AddingdetailsComponent {
name=''
age=''
students: {name: string , age: string}[]=[];
addstudents(){
  if (this.name && this.age){
    this.students.push({name: this.name, age: this.age});
    this.name='';
    this.age='';
  }
}
}
