import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettinsComponent } from './settins.component';

describe('SettinsComponent', () => {
  let component: SettinsComponent;
  let fixture: ComponentFixture<SettinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettinsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
