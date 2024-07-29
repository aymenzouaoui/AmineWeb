import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

interface Category {
  name: string;
}

@Component({
  selector: 'app-delete-category-confirmation',
  templateUrl: './delete-category-confirmation.component.html',
  styleUrls: ['./delete-category-confirmation.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [FormsModule],
})
export class DeleteCategoryConfirmationComponent {
  isEditMode: boolean = false;
  categoryId: string;
  panels: any;
  _changeDetectorRef: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private dialogRef: MatDialogRef<DeleteCategoryConfirmationComponent>,
    private dialog: MatDialog, // Inject MatDialog
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
     
  }



  deleteCategory(categoryId: string): void {
    this.http.delete(`http://127.0.0.1:9090/category/${categoryId}`).subscribe(
      () => {
        // Close the dialog and pass true to indicate successful deletion
        this.dialogRef.close(true);
      },
      (error) => {
        console.error('Error deleting category:', error);
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
