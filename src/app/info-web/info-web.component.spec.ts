import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoWebComponent } from './info-web.component';

describe('InfoWebComponent', () => {
  let component: InfoWebComponent;
  let fixture: ComponentFixture<InfoWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoWebComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
