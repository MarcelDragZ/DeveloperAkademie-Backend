import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnvironmentsServicesAuthIntercepterComponent } from './environments-services-auth-intercepter.component';

describe('EnvironmentsServicesAuthIntercepterComponent', () => {
  let component: EnvironmentsServicesAuthIntercepterComponent;
  let fixture: ComponentFixture<EnvironmentsServicesAuthIntercepterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnvironmentsServicesAuthIntercepterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      EnvironmentsServicesAuthIntercepterComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
