import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SessionService } from '../core/services/session.service';
import { ISession } from '../models/sessions';
import { SESSIONS_DATA } from '../../assets/data/sessions';


describe('sessionService', () => {
  let mockHttp: HttpTestingController;
  let sessionService: jasmine.SpyObj<SessionService>;
  let sessions: ISession[];

  beforeEach(() => {
    sessions = SESSIONS_DATA;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SessionService],
    });

    sessionService = TestBed.inject(SessionService) as jasmine.SpyObj<SessionService>;
    mockHttp = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    mockHttp.verify();
  });

  describe('getSessions', () => {
    it('should return expected sessions ', () => {
      sessionService.getSessions()
        .subscribe((data: ISession[]) => {
          expect(data.length).toEqual(7);
          expect(data).toEqual(sessions);
        });

      const req = mockHttp.expectOne('/api/sessions');
      expect(req.request.method).toEqual('GET');

      req.flush(sessions);
    });
  });

  describe('getSessionByCinemaId', () => {
    let sessionId = 1;
    let key = 'movie';
    it('should return expected session ', () => {
      sessionService.getSessionsByCinemaId(sessionId, key)
        .subscribe(data => expect(data).toEqual([sessions[0], sessions[1]]),
        );
      const req = mockHttp.expectOne('/api/sessions/movie/1');
      expect(req.request.method).toEqual('GET');

      req.flush([sessions[0], sessions[1]]);
    });
  });
});
