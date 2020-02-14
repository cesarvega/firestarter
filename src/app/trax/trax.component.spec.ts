import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraxComponent } from './trax.component';

describe('TraxComponent', () => {
  let component: TraxComponent;
  let fixture: ComponentFixture<TraxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
