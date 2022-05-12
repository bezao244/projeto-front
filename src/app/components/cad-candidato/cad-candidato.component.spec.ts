import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadCandidatoComponent } from './cad-candidato.component';

describe('CadCandidatoComponent', () => {
  let component: CadCandidatoComponent;
  let fixture: ComponentFixture<CadCandidatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadCandidatoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadCandidatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
