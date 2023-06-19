import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Store } from "@ngxs/store";
import { catchError } from "rxjs";
import {
  MasterLocationsGlobalState
} from "../../../state/master-locations-global.state";
import { Authorize } from "../../../../core/domain/models";
import { ActivatedRoute, Router } from "@angular/router";
import { Login } from "../../../state/master-locations-global.actions";
import { JwtHelperService } from "@auth0/angular-jwt";

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  const router = inject(Router);
  const authorize = store.selectSnapshot<Authorize | undefined>(
    MasterLocationsGlobalState.Authorize
  );
  const jwtHelper = new JwtHelperService();
  const isAuthenticated = authorize && authorize.token && !jwtHelper.isTokenExpired(authorize.token);
  if (isAuthenticated) {
    const request = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authorize.token}`
      }
    });
    return next(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          logout(store, router, router.routerState.snapshot.url);
        }
        throw error;
      })
    );
  } else {
    const activatedRoute = inject(ActivatedRoute);
    const returnUrl = activatedRoute.snapshot.queryParams["returnUrl"];
    logout(store, router, returnUrl);
  }
  return next(req);
};

export function logout(store: Store, router: Router, returnUrl?: string) {
  // Unauthorized error, redirect to login page
  store.dispatch(new Login(undefined));
  router.navigate(["/accounts/login"], { queryParams: { returnUrl: returnUrl } }).then();
}
