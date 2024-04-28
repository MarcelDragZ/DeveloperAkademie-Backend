import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnvironmentsDbComponent } from './environments-db.component';

describe('EnvironmentsDbComponent', () => {
  let component: EnvironmentsDbComponent;
  let fixture: ComponentFixture<EnvironmentsDbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnvironmentsDbComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EnvironmentsDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
