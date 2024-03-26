import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SmallPreviewComponent } from './small-preview.component';

describe('SmallPreviewComponent', () => {
  let component: SmallPreviewComponent;
  let fixture: ComponentFixture<SmallPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmallPreviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SmallPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
