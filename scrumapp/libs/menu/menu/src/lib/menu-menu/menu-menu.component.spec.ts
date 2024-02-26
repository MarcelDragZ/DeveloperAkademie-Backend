import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuMenuComponent } from './menu-menu.component';

describe('MenuMenuComponent', () => {
  let component: MenuMenuComponent;
  let fixture: ComponentFixture<MenuMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
