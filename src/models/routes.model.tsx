import { RoutePath } from './enum/routePath';

export interface SidemenuRoute {
  to: string;
  name: string;
  description?: string;
}

export const sidemenuRoutes: SidemenuRoute[] = [
  { to: RoutePath.DASHBOARD, name: 'Dashboard' },
];
