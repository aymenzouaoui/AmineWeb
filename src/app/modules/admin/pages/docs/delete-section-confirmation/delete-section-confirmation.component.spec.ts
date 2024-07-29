import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSectionConfirmationComponent } from './delete-section-confirmation.component';

describe('DeleteSectionConfirmationComponent', () => {
  let component: DeleteSectionConfirmationComponent;
  let fixture: ComponentFixture<DeleteSectionConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteSectionConfirmationComponent]
    });
    fixture = TestBed.createComponent(DeleteSectionConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
