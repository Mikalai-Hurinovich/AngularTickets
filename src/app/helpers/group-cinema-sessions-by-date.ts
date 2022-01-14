import { ISession } from '../models/sessions';

export const groupCinemaSessionsByDate = (sessions: ISession[]) => {
  const sortedSessions = sessions.reduce((groups, session) => {
    const date = session.startsAt.split(' ', 4);
    // @ts-ignore
    if (!groups[date]) {
      // @ts-ignore
      groups[date] = [];
    }
    // @ts-ignore
    groups[date].push(session);
    return groups;
  }, {});

  const groupSession = Object.keys(sortedSessions).map((key) => {
    const date = key.replace(/,/g, ' ');
    return {
      date,
      // @ts-ignore
      sessions: sortedSessions[key],
    };
  });
  return groupSession;
};
