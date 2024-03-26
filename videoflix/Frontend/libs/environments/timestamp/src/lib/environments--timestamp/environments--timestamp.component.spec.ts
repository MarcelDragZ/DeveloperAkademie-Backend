import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnvironmentsTimestampComponent } from './environments--timestamp.component';

describe('EnvironmentsTimestampComponent', () => {
  let component: EnvironmentsTimestampComponent;
  let fixture: ComponentFixture<EnvironmentsTimestampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnvironmentsTimestampComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EnvironmentsTimestampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
