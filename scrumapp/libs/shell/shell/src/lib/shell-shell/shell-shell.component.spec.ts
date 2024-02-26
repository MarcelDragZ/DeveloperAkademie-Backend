import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShellShellComponent } from './shell-shell.component';

describe('ShellShellComponent', () => {
  let component: ShellShellComponent;
  let fixture: ComponentFixture<ShellShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShellShellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShellShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
