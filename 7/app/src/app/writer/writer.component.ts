import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-writer',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './writer.component.html',
  styleUrls: ['./writer.component.css']
})
export class WriterComponent {
  typing = '';
  typingarr: string[] = [];

  add() {
    if (this.typing.trim()) {
      this.typingarr.push(this.typing.trim());
    }
  }
}
