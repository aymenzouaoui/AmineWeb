import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryComponent } from './modules/admin/pages/docs/add-category/add-category.component';

@Injectable({
    providedIn: 'root'
})
export class DialogService {
    constructor(private dialog: MatDialog) {}

    openAddCategoryDialog(): void {
        this.dialog.open(AddCategoryComponent, {
            width: '400px', // Adjust width as needed
            // Other dialog configuration options
        });
    }
}
