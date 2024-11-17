import { ComponentFixture, TestBed } from "@angular/core/testing"
import { HeaderComponent } from "./header.component"
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TodosService } from "../../services/todos.service";
import { By } from "@angular/platform-browser";
describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let todoService: TodosService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HeaderComponent, HttpClientTestingModule]
        }).compileComponents();

        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        todoService = TestBed.inject(TodosService);
        fixture.detectChanges();
    })

    it('creates a component', () => {
        expect(component).toBeTruthy();
    })

    it('should add a todo', () => {
        jest.spyOn(todoService, 'addTodo').mockImplementation(() => { })
        const input = fixture.debugElement.query(By.css('[data-testid="newTodoInput"]'))
        input.nativeElement.value = 'Mani';
        input.nativeElement.dispatchEvent(
            new KeyboardEvent('keyup', { key: 'Enter' })
        );
        expect(todoService.addTodo).toHaveBeenCalledWith('Mani');
        expect(component.text).toEqual('');
    })
})