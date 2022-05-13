import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudCandidatoComponent } from './crud-candidato.component';

describe('CrudCandidatoComponent', () => {
  let component: CrudCandidatoComponent;
  let fixture: ComponentFixture<CrudCandidatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudCandidatoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudCandidatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
