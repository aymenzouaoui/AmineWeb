import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface Section {
  title: string;
  descriptionF: string;
  descriptionK: string;
  descriptionS: string;
  colorLine: boolean;
  codeBox: boolean;
  formatOptions?: {
    colorLine: boolean;
    codeBox: boolean;
  };
}

@Component({
  selector: 'app-add-section',
  templateUrl: './add-section.component.html',
  styleUrls: ['./add-section.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [FormsModule],
})
export class AddSectionComponent {
  _changeDetectorRef: any;
  panels: any;
  isEditMode: boolean = false;
  categoryId: string;
  sectionId: string;
  section: Section = {
    title: '',
    descriptionF: '',
    descriptionK: '',
    descriptionS: '',
    colorLine: false,
    codeBox: false,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private dialogRef: MatDialogRef<AddSectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.categoryId = data.categoryId;
    this.sectionId = data.sectionId;
    if (this.sectionId) {
      this.isEditMode = true; // Set isEditMode to true if editing
      this.http
        .get<any>(`http://127.0.0.1:9090/section/${this.sectionId}`)
        .subscribe(
          (response) => {
            this.section = response;
          },
          (error) => {
            console.error('Error fetching section data:', error);
          }
        );
    }
  }

  onSubmit(): void {
    const dataToSend = { ...this.section };


    if (this.categoryId) {
      if (this.sectionId && this.isEditMode) { // Check if in edit mode
        this.http
          .patch<any>(
            `http://127.0.0.1:9090/category/${this.categoryId}/sections/${this.sectionId}`,
            dataToSend
          )
          .subscribe(
            (response) => {
              console.log('Section updated:', response);
              this.dialogRef.close(true);
            },
            (error) => {
              console.error('Error updating section:', error);
            }
          );
      } else {
        console.log(dataToSend);
        this.http
          .post<any>(
            `http://127.0.0.1:9090/category/${this.categoryId}/sections`,
            dataToSend,
           
            
          )
          .subscribe(
            (response) => {
              console.log('New section added:', response);
              this.dialogRef.close(true);
            },
            (error) => {
              console.error('Error adding new section:', error);
            }
          );
      }
    } else {
      console.error('Category ID is undefined.');
    }
}


  closeDialog(): void {
    this.dialogRef.close();
  }

  resetForm(): void {
    this.section = {
      title: '',
      descriptionF: '',
      descriptionK: '',
      descriptionS: '',
      colorLine: false,
      codeBox: false,
    };
  }
  // Function to make selected text bold
makeTextBold() {
  this.wrapTextWithTag('b');
}
// Function to wrap selected text with specified tag
wrapTextWithTag(tag: string) {
  const textarea = document.getElementById('descriptionF') as HTMLTextAreaElement;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = textarea.value.substring(start, end);
  const newText = `<${tag}>${selectedText}</${tag}>`;
  // Update the model property directly
  this.section.descriptionF = textarea.value.substring(0, start) + newText + textarea.value.substring(end);
}

wrapTextWithTagK(tag: string) {
  const textarea = document.getElementById('descriptionK') as HTMLTextAreaElement;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = textarea.value.substring(start, end);
  const newText = ` <${tag}> ${selectedText} </${tag}> `;
  // Update the model property directly
  this.section.descriptionK = textarea.value.substring(0, start) + newText + textarea.value.substring(end);
}

wrapTextWithTagS(tag: string) {
  const textarea = document.getElementById('descriptionS') as HTMLTextAreaElement;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = textarea.value.substring(start, end);
  const newText = `<${tag}>${selectedText}</${tag}>`;
  // Update the model property directly
  this.section.descriptionS = textarea.value.substring(0, start) + newText + textarea.value.substring(end);
}


// Function to make selected text bold
makeTextBoldK() {
  this.wrapTextWithTagK('b');
}


// Function to make selected text bold
makeTextBoldS() {
  this.wrapTextWithTagS('b');
}
// Function to insert code box
insertCodeBox() {
  const textarea = document.getElementById('descriptionF') as HTMLTextAreaElement;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = textarea.value.substring(start, end);
  const newText = `<codebox>${selectedText}</codebox>`;
  this.section.descriptionF = textarea.value.substring(0, start) + newText + textarea.value.substring(end);
}

insertCodeBoxK() {
  const textarea = document.getElementById('descriptionK') as HTMLTextAreaElement;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = textarea.value.substring(start, end);
  const newText = `<codebox>${selectedText}</codebox>`;
  this.section.descriptionK = textarea.value.substring(0, start) + newText + textarea.value.substring(end);
}

insertCodeBoxS() {
  const textarea = document.getElementById('descriptionS') as HTMLTextAreaElement;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = textarea.value.substring(start, end);
  const newText = `<codebox>${selectedText}</codebox>`;
  this.section.descriptionS = textarea.value.substring(0, start) + newText + textarea.value.substring(end);
}

  // Function to wrap specific parts of descriptionF in <code> tags
  processDescriptionF(description: string): string {
    // Split the descriptionF string into lines
    const lines = description.split('\n');

    // Process each line to wrap code blocks within <code> tags
    const processedLines = lines.map((line) => {
      // Check if the line contains <codebox> and </codebox> tags
      const startTagIndex = line.indexOf('<codebox>');
      const endTagIndex = line.indexOf('</codebox>');

      if (startTagIndex !== -1 && endTagIndex !== -1) {
        // Extract the code block content
        const codeBlockContent = line.substring(startTagIndex + 9, endTagIndex);
        // Wrap the code block content within <code> tags
        const processedLine = line.replace(
          codeBlockContent,
          `<code>${codeBlockContent}</code>`
        );
        return processedLine;
      } else {
        return line;
      }
    });

    // Join the processed lines back into a single string
    return processedLines.join('\n');
  }
}
