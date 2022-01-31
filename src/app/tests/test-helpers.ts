import { defer } from 'rxjs';

export function asyncError(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}
