import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AstreaComponent } from './astrea.component';

describe('AstreaComponent', () => {
  let component: AstreaComponent;
  let fixture: ComponentFixture<AstreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AstreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AstreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
