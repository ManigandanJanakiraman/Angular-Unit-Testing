import { ComponentFixture, flushMicrotasks, TestBed } from "@angular/core/testing"
import { MainComponent } from "./main.component"
import { HttpClientTestingModule } from "@angular/common/http/testing"
import { TodosService } from "../../services/todos.service";
import { By } from "@angular/platform-browser";

describe('MainComponent', () => {
    let component: MainComponent;
    let fixture: ComponentFixture<MainComponent>;
    let todosService: TodosService
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MainComponent, HttpClientTestingModule]
        }).compileComponents();

        fixture = TestBed.createComponent(MainComponent);
        component = fixture.componentInstance;
        todosService = TestBed.inject(TodosService);
        fixture.detectChanges();
    })


    it('Creates component', () => {
        expect(component).toBeTruthy();
    })

    describe('Component Visibility', () => {

        it('should be hidden with no todos', () => {
            const elemet = fixture.debugElement.query(By.css('[data-testid="main"]'))
            expect(elemet.classes['hidden']).toBe(true);
        })

        it('shoud be visible with todos', () => {
            todosService.todosSig.set([{ id: '1', text: 'mani', isCompleted: true }])
            fixture.detectChanges();
            const elemet = fixture.debugElement.query(By.css('[data-testid="main"]'))
            expect(elemet.classes['hidden']).not.toBeDefined();
        })

    })
})