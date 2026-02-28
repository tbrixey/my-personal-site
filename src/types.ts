export type ThemeName = 'xerox';

export type ProjectStatus = 'live' | 'wip' | 'experiment' | 'dead';

export interface Project {
  id: string;
  title: string;
  year: number;
  description: string;
  status: ProjectStatus;
  tags: string[];
  url?: string;
}
