import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; // Import Router and ActivatedRoute
import { Category } from 'app/modules/admin/pages/docs/category.types';

@Component({
    selector: 'app-add-category',
    templateUrl: './add-category.component.html',
    styleUrls: ['./add-category.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Default,
    imports: [FormsModule],
})
export class AddCategoryComponent {
    categoryName: string = '';
    isEditMode: boolean = false;
    panels: any;
    categoryId: string | null = null;
    _changeDetectorRef: any;

  
    constructor(
      private _matDialogRef: MatDialogRef<AddCategoryComponent>,
      private http: HttpClient,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      if (this.data && this.data.categoryId) {
        this.isEditMode = true;
        this.categoryId = this.data.categoryId;
        this.http.get<any>(`http://127.0.0.1:9090/category/${this.categoryId}`).subscribe(
          (response) => {
            this.categoryName = response.name;
          },
          (error) => {
            console.error('Error fetching category data:', error);
          }
        );
      }
    }
  
    onSubmit(): void {
      if (this.isEditMode) {
        this.updateCategory();
      } else {
        this.addNewCategory();
      }
    }
  
    addNewCategory(): void {
      const newCategory = { name: this.categoryName, sections: [] };
      this.http.post<any>('http://127.0.0.1:9090/category', newCategory).subscribe(
        (response) => {
          console.log('New category created:', response);
          this._matDialogRef.close(true);
        },
        (error) => {
          console.error('Error creating new category:', error);
        }
      );
    }
  
    updateCategory(): void {
      if (!this.categoryId) {
        console.error('No category ID provided for update');
        return;
      }
      const updatedCategory = { name: this.categoryName };
      this.http.patch<any>(`http://127.0.0.1:9090/category/${this.categoryId}`, updatedCategory).subscribe(
        (response) => {
          console.log('Category updated:', response);
          this._matDialogRef.close(true);
        },
        (error) => {
          console.error('Error updating category:', error);
        }
      );
    }
  
    closeDialogAndRefresh(): void {
      this._matDialogRef.close();
    }
  }
  
