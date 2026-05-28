import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBreadcrumb } from './app-breadcrumb';

describe('AppBreadcrumb', () => {
  let component: AppBreadcrumb;
  let fixture: ComponentFixture<AppBreadcrumb>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppBreadcrumb]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppBreadcrumb);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
