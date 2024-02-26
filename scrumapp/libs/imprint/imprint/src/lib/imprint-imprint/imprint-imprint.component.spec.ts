import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImprintImprintComponent } from './imprint-imprint.component';

describe('ImprintImprintComponent', () => {
  let component: ImprintImprintComponent;
  let fixture: ComponentFixture<ImprintImprintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImprintImprintComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImprintImprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
