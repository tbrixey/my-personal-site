import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'Clientelity Scheduling',
    title: 'Clientelity Scheduling',
    year: 2026,
    description:
      'Clientelity Scheduling. A tool for target for small business owners with little friction on the client side.',
    status: 'live',
    tags: [
      'typescript',
      'React',
      'PostgreSQL',
      'Tailwind',
      'React-Native',
      'Hono.js',
    ],
    url: 'https://scheduling.clientelity.com',
    company: 'Clientelity',
  },
  {
    id: 'Clientelity CRM',
    title: 'Clientelity Loop (CRM)',
    year: 2026,
    description:
      'Loop is a CRM tool for small business owners with little friction on the client side.',
    status: 'live',
    tags: ['typescript', 'React', 'PostgreSQL', 'Tailwind', 'Hono.js'],
    url: 'https://loop.clientelity.com',
    company: 'Clientelity',
  },
  {
    id: 'The Temporary Plane',
    title: 'The Temporary Plane',
    year: 2025,
    description: 'The Temporary Plane is a text/api based game.',
    status: 'wip',
    tags: ['typescript', 'React', 'MongoDB', 'Tailwind', 'Hono.js'],
    url: '#',
  },
  {
    id: 'Receipt Printer to-do app',
    title: 'Receipt Printer to-do app',
    year: 2024,
    description:
      'I hosted a Raspberry Pi with a receipt printer and a to-do app. Add a to-do and it printed it to a printer I had in my office.',
    status: 'experiment',
    tags: ['typescript', 'Next.js', 'PostgreSQL', 'Tailwind', 'Raspberry Pi'],
    url: 'https://github.com/tbrixey/todo-receipt-printer',
  },
  {
    id: 'Pokemon Card Reader',
    title: 'Pokemon Card Reader',
    year: 2023,
    description:
      'I built a Pokemon Card Reader using OpenCV and a Raspberry Pi. It reads the card and displays the information on a screen.',
    status: 'dead',
    tags: ['python', 'OpenCV', 'Raspberry Pi'],
    url: 'https://github.com/tbrixey/PokemonCardReader-OpenCV',
  },
];
