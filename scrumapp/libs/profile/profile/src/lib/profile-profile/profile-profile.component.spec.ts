import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileProfileComponent } from './profile-profile.component';

describe('ProfileProfileComponent', () => {
  let component: ProfileProfileComponent;
  let fixture: ComponentFixture<ProfileProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
