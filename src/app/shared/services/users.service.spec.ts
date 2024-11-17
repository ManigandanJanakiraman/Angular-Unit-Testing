import { UsersService } from "./users.service"
import { TestBed } from "@angular/core/testing"
import { UtilsService } from "./utils.service";
describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersService, UtilsService
      ],
    })

    usersService = TestBed.inject(UsersService)
  })

  it('Creates a service', () => {
    expect(usersService).toBeTruthy();
  })

  describe('addUser', () => {
    it('should add a user', () => {
      const user = {
        id: '1', name: "Mani"
      }
      usersService.addUser(user)
      expect(usersService.users$.getValue()).toEqual([{ id: '1', name: "Mani" }])
    })
  })

  describe('removeUser', () => {
    it('should remove a User', () => {
      usersService.users$.next([{ id: '1', name: "Mani" }])
      usersService.removeUser("1")
      expect(usersService.users$.getValue()).toEqual([])
    })
  })


})