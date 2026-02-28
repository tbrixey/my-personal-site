export type ThemeName = 'xerox';

export type ProjectStatus = 'shipped' | 'wip' | 'experiment' | 'abandoned';

export interface Project {
  id: string;
  title: string;
  year: number;
  description: string;
  status: ProjectStatus;
  tags: string[];
  url?: string;
}
