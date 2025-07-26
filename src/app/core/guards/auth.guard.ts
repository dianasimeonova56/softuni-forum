import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services";
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if(authService.isLoggedIn()) {
        return true;
    } else {
        return router.createUrlTree(['/login']);
        // replaces current url address to redirect user
        // const redirectTo = route.split('localhost:4200/')[1]
        // return router.createUrlTree(['/login?redirectUrl=redirectTo']);
    }
}