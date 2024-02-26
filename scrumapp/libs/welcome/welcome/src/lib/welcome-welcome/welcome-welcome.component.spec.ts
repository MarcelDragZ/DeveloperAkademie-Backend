import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WelcomeWelcomeComponent } from './welcome-welcome.component';

describe('WelcomeWelcomeComponent', () => {
  let component: WelcomeWelcomeComponent;
  let fixture: ComponentFixture<WelcomeWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomeWelcomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomeWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
