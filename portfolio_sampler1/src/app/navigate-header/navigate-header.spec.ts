import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigateHeader } from './navigate-header';

describe('NavigateHeader', () => {
  let component: NavigateHeader;
  let fixture: ComponentFixture<NavigateHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigateHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigateHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
