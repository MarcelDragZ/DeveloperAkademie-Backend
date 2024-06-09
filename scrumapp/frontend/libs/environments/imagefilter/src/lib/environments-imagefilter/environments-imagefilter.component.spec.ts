import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnvironmentsImagefilterComponent } from './environments-imagefilter.component';

describe('EnvironmentsImagefilterComponent', () => {
  let component: EnvironmentsImagefilterComponent;
  let fixture: ComponentFixture<EnvironmentsImagefilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnvironmentsImagefilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EnvironmentsImagefilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
