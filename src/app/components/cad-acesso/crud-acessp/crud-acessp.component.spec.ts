import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudAcesspComponent } from './crud-acessp.component';

describe('CrudAcesspComponent', () => {
  let component: CrudAcesspComponent;
  let fixture: ComponentFixture<CrudAcesspComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudAcesspComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudAcesspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
