export interface SidemenuRoute {
  to: string;
  name: string;
  description: string;
}

export const sidemenuRoutes: SidemenuRoute[] = [
  { to: '', name: 'Dashboard', description: 'Data Overview' },
];
