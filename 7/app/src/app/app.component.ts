import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddingdetailsComponent } from "./addingdetails/addingdetails.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AddingdetailsComponent,FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app';
}
