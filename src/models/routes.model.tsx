import { RoutePath } from '@/common/values';

export interface SidemenuRoute {
  to: string;
  name: string;
  description?: string;
}

export const sidemenuRoutes: SidemenuRoute[] = [
  { to: RoutePath.DASHBOARD, name: 'Dashboard' },
];
