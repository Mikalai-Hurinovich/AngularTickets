import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '../core/services/auth.service';
import { IUser } from '../pages/user/user.model';
import { RouterTestingModule } from '@angular/router/testing';


describe('AuthService', () => {
  let mockHttp: HttpTestingController;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService],
    });

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    mockHttp = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    mockHttp.verify();
  });

  describe('createUser', () => {
    it('should create user', () => {
      const user: IUser = {
        id: 7,
        userName: 'Name',
        userPassword: 'pass',
        isAdmin: false,
        userEmail: 'email',
      };
      authService.createUser(user)
        .subscribe((data: IUser) => {
          expect(data.userName).toEqual('Name');
          expect(data.isAdmin).toEqual(false);
          expect(data.userPassword).toEqual('pass');
        });

      const req = mockHttp.expectOne('/api/register');
      expect(req.request.method).toEqual('POST');

      req.flush(user);
    });
  });

  describe('createAdmin', () => {
    it('should create admin', () => {
      const user: IUser = {
        id: 7,
        userName: 'Admin',
        userPassword: 'admin',
        isAdmin: true,
        userEmail: 'email',
      };
      authService.createAdmin(user)
        .subscribe((data: IUser) => {
          expect(data.userName).toEqual('Admin');
          expect(data.isAdmin).toEqual(true);
          expect(data.userPassword).toEqual('admin');
        });

      const req = mockHttp.expectOne('/api/users');
      expect(req.request.method).toEqual('POST');

      req.flush(user);
    });
  });

  describe('loginUser', () => {
    it('should login user', () => {
      const userName = 'Username';
      const userPassword = 'UserPassword';
      authService.loginUser(userName, userPassword)
        .subscribe((data: IUser) => {
          expect(data.userName).toEqual('Username');
          expect(data.userPassword).toEqual('UserPassword');
        });
      const req = mockHttp.expectOne('/api/login');
      expect(req.request.method).toEqual('POST');

      req.flush({ userName, userPassword });
    });
  });

  describe('checkAuthStatus', () => {
    it('should check that user is authenticated', () => {
      authService.checkAuthStatus();
      const req = mockHttp.expectOne('/api/currentIdentity');
      expect(req.request.method).toEqual('GET');

      req.flush({});
    });
  });
});
