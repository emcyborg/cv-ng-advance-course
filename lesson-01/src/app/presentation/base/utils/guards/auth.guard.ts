import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngxs/store";
import { MasterLocationsGlobalState } from "../../../state/master-locations-global.state";
import { Authorize } from "../../../../core/domain/models";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Login } from "../../../state/master-locations-global.actions";

export const authGuard = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const store = inject(Store);
  const router = inject(Router);
  const jwtHelper = new JwtHelperService();
  const authorize = store.selectSnapshot<Authorize | undefined>(MasterLocationsGlobalState.Authorize);
  const isAuthenticated = authorize && authorize.token && !jwtHelper.isTokenExpired(authorize.token);
  if (isAuthenticated) {
    return true;
  }
  store.dispatch(new Login(undefined));
  router.navigate(["/", "accounts", "login"], { queryParams: { returnUrl: state.url } }).then();
  return false;
};
