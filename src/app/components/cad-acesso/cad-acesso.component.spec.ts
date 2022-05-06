import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadAcessoComponent } from './cad-acesso.component';

describe('CadAcessoComponent', () => {
  let component: CadAcessoComponent;
  let fixture: ComponentFixture<CadAcessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadAcessoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadAcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
