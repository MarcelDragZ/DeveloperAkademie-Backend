import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginLoginComponent } from './login-login.component';

describe('LoginLoginComponent', () => {
  let component: LoginLoginComponent;
  let fixture: ComponentFixture<LoginLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginLoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
