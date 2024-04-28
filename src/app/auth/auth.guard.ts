import { CanMatchFn, Router } from '@angular/router';
import { take, skipWhile, map, tap } from 'rxjs';
import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

 
// export const authGuard: CanMatchFn = (route, segments) => {
//   const router: Router = new Router;
 
//   //This map converts the value to type boolean or UrlTree which satisfies the return 
//   //of the for the function. We had an issue because our signedin$ took nulls or booleans
//   return inject(AuthService).signedin$.pipe(
//     skipWhile(value => value === null),
//     map((value) => !!value),                    
//     take(1),
//     tap((authenticated) => {
//       if (!authenticated) {
//        router.navigate(['/']);
//       }
//     })
//   );
// };



// export function authGuard(authService: AuthService, router: Router): CanActivateFn {
//   // Console.log the current value of authService.signedin$
//   console.log('Signed in: ', authService.test); // returns undefined
//   return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
//     return authService.signedin$.pipe(

//       map(value => value === null ? false : value), // map null to false

//       // skipWhile(value => value === null),
//       // // Convert value to boolean
//       //     map((value) => !!value), 
//       //     take(1),
//       //     tap((authenticated) => {
//       //       console.log('Authentication status:', authenticated);
//       //       if (authenticated === false) {
//       //       console.log('User is not authenticated. Navigating to /');
//       //        router.navigateByUrl('/');
//       //       }
//       //     }),
//       tap(authenticated => {
//         console.log('Authentication status:', authenticated);
//         if (!authenticated) {
//           console.log('User is not authenticated. Navigating to /');
//           router.navigateByUrl('/');
//         }
//       }),
//       take(1)
//     );
//   };
// }


export function authGuard(authService: AuthService, router: Router): CanActivateFn {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> => {
    return authService.signedin$.pipe(
      tap(authenticated => {
        console.log('Authentication status:', authenticated);
        if (!authenticated) {
          console.log('User is not authenticated. Navigating to /');
          router.navigateByUrl('/');
        }
      }),
      take(1)
    );
  };
}
