import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardBoardComponent } from './board-board.component';

describe('BoardBoardComponent', () => {
  let component: BoardBoardComponent;
  let fixture: ComponentFixture<BoardBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardBoardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
