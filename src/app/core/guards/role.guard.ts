import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Role } from '../models';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const allowed = (route.data['roles'] as Role[]) ?? [];

  if (!auth.userValue) {
    return router.createUrlTree(['/login']);
  }

  if (allowed.length === 0 || allowed.includes(auth.userValue.role)) {
    return true;
  }

  return router.createUrlTree(['/dashboard']);
};
