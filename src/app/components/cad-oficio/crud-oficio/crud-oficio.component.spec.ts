import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudOficioComponent } from './crud-oficio.component';

describe('CrudOficioComponent', () => {
  let component: CrudOficioComponent;
  let fixture: ComponentFixture<CrudOficioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudOficioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudOficioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
