import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadOficioComponent } from './cad-oficio.component';

describe('CadOficioComponent', () => {
  let component: CadOficioComponent;
  let fixture: ComponentFixture<CadOficioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadOficioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadOficioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
