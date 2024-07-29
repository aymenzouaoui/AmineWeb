import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

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
  selector: 'app-delete-section-confirmation',
  templateUrl: './delete-section-confirmation.component.html',
  styleUrls: ['./delete-section-confirmation.component.scss'],
  standalone: true,
  imports: [FormsModule],
})
export class DeleteSectionConfirmationComponent {
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
  panels: any;
  _changeDetectorRef: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private dialogRef: MatDialogRef<DeleteSectionConfirmationComponent>,
    private dialog: MatDialog, // Inject MatDialog
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
     
  }



  deleteSection(sectionId: string): void {
    this.http.delete(`http://127.0.0.1:9090/section/${sectionId}`).subscribe(
      () => {
        // Close the dialog and pass true to indicate successful deletion
        this.dialogRef.close(true);
      },
      (error) => {
        console.error('Error deleting section:', error);
        // Close the dialog and pass false to indicate deletion failure
        this.dialogRef.close(false);
      }
    );
  }
  onCancel(): void {
    // Close the dialog without performing any action
    this.dialogRef.close();
  }
}
