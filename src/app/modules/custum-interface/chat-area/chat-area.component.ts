import { Component } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatStepperModule,
    MatSelectModule,
    MatOptionModule,
  ]
})export class ChatAreaComponent {
    items: { text: string, color: string }[] = [
      { text: 'Item 1', color: 'white' },
      { text: 'Item 2', color: 'white' },
      { text: 'Item 3', color: 'white' },
    ];
    messages: { text: string, color: string }[] = [];

    drop(event: CdkDragDrop<string[]>): void {
      const draggedItemText = event.item.element.nativeElement.innerText;
      const item = this.items.find(i => i.text === draggedItemText);
      if (item) {
        this.messages.push({ text: draggedItemText, color: item.color });
      }
    }

    setColor(itemText: string, color: string): void {
      const item = this.items.find(i => i.text === itemText);
      if (item) {
        item.color = color;
      }
    }
  }
