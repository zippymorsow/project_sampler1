import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditUsers } from './add-edit-users';

describe('AddEditUsers', () => {
  let component: AddEditUsers;
  let fixture: ComponentFixture<AddEditUsers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditUsers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditUsers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
