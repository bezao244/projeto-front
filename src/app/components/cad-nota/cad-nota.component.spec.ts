import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadNotaComponent } from './cad-nota.component';

describe('CadNotaComponent', () => {
  let component: CadNotaComponent;
  let fixture: ComponentFixture<CadNotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadNotaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadNotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
