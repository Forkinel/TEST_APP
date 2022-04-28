import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardDetailsComponent } from './standard-details.component';

describe('StandardDetailsComponent', () => {
  let component: StandardDetailsComponent;
  let fixture: ComponentFixture<StandardDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
