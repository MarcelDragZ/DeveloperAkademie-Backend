import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserUserComponent } from './user-user.component';

describe('UserUserComponent', () => {
  let component: UserUserComponent;
  let fixture: ComponentFixture<UserUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserUserComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
