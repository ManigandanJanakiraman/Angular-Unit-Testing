import { ComponentFixture, flushMicrotasks, TestBed } from "@angular/core/testing"
import { FooterComponent } from "./footer.component"
import { HttpClientTestingModule } from "@angular/common/http/testing"
import { By } from "@angular/platform-browser"
import { TodosService } from "../../services/todos.service"
import { FilterEnum } from "../../types/filter.enum"

describe('footerComponent', () => {
    let component: FooterComponent
    let fixture: ComponentFixture<FooterComponent>
    let todoService: TodosService
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FooterComponent, HttpClientTestingModule]
        }).compileComponents();

        fixture = TestBed.createComponent(FooterComponent);
        component = fixture.componentInstance;
        todoService = TestBed.inject(TodosService);
        fixture.detectChanges();
    })

    it('creates a component', () => {
        expect(component).toBeTruthy();
    })

    describe('component visibility', () => {
        it('should be hidden with no todos', () => {
            const element = fixture.debugElement.query(By.css('[data-testid="footer"]'));
            expect(element.classes['hidden']).toEqual(true);
        })

        it('should be visible with todos', () => {
            todoService.todosSig.set([{ id: '1', text: 'Mani', isCompleted: false }])
            fixture.detectChanges();
            const element = fixture.debugElement.query(By.css('[data-testid="footer"]'));
            expect(element.classes['hidden']).not.toBeDefined();
        })
    })

    describe('counters', () => {
        it('renders count for 1 todo', () => {
            todoService.todosSig.set([{ id: '1', text: 'Mani', isCompleted: false }])
            fixture.detectChanges();
            const element = fixture.debugElement.query(By.css('[data-testid="todoCount"]'));
            expect(element.nativeElement.textContent).toContain('1 item left');
        })

        it('renders count for 1 todo', () => {
            todoService.todosSig.set(
                [{ id: '1', text: 'Mani', isCompleted: false },
                { id: '1', text: 'Vipin', isCompleted: false }
                ])
            fixture.detectChanges();
            const element = fixture.debugElement.query(By.css('[data-testid="todoCount"]'));
            expect(element.nativeElement.textContent).toContain('2 items left');
        })
    })

    describe('filters', () => {
        it('highlights default filter', () => {
            const filterLinks = fixture.debugElement.queryAll(By.css('[data-testid="filterLink"]'));
            expect(filterLinks[0].classes['selected']).toBeDefined();
        })

        it('highlights changed filter', () => {
            todoService.filterSig.set(FilterEnum.active);
            fixture.detectChanges();
            const filterLinks = fixture.debugElement.queryAll(By.css('[data-testid="filterLink"]'));
            expect(filterLinks[1].classes['selected']).toBeDefined();
        })

        it('changes a filter', () => {
            const filterLinks = fixture.debugElement.queryAll(By.css('[data-testid="filterLink"]'));
            filterLinks[1].triggerEventHandler('click');
            expect(todoService.filterSig()).toEqual(FilterEnum.active);
        })
    })
})