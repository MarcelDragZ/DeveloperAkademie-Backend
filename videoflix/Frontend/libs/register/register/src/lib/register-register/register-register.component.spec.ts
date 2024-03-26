import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterRegisterComponent } from './register-register.component';

describe('RegisterRegisterComponent', () => {
  let component: RegisterRegisterComponent;
  let fixture: ComponentFixture<RegisterRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterRegisterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
