import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCategoryConfirmationComponent } from './delete-category-confirmation.component';

describe('DeleteCategoryConfirmationComponent', () => {
  let component: DeleteCategoryConfirmationComponent;
  let fixture: ComponentFixture<DeleteCategoryConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteCategoryConfirmationComponent]
    });
    fixture = TestBed.createComponent(DeleteCategoryConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
