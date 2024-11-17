import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PaginationComponent } from "./pagination.component"
import { UtilsService } from "../../services/utils.service";
import { By } from "@angular/platform-browser";
import { first } from "rxjs";

describe('paginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  const mockUtilseService = {
    range: () => [1, 2, 3, 4, 5]
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PaginationComponent],
      providers: [{ provide: UtilsService, useValue: mockUtilseService }]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    component.total = 100;
    component.limit = 20;
    fixture.detectChanges();
  })

  it('Creates components', () => {
    expect(component).toBeTruthy();
  })

  it('renders correct pagination', () => {
    const pageContainers = fixture.debugElement.queryAll(
      By.css('[data-testid="page-container"]')
    );

    expect(pageContainers.length).toBe(5);
    expect(pageContainers[4].nativeElement.textContent).toContain('5');
  })

  it('should emit a clicked page', () => {
    const pageContainers = fixture.debugElement.queryAll(
      By.css('[data-testid="page-container"]')
    );
    let clickedPage: number | undefined
    component.pageChangeEvent.pipe(first()).subscribe((page) => {
      clickedPage = page;
    });
    pageContainers[0].triggerEventHandler('click');
    expect(clickedPage).toEqual(1);
  })

})