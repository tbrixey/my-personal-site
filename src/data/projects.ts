import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'raytracer',
    title: 'Tiny Raytracer',
    year: 2025,
    description:
      'A weekend raytracer that got out of hand. Renders spheres, reflections, and soft shadows in pure Rust. Accidentally learned linear algebra.',
    status: 'shipped',
    tags: ['rust', 'graphics', 'math'],
    url: '#',
  },
  {
    id: 'budgetron',
    title: 'Budgetron 3000',
    year: 2025,
    description:
      'Personal finance tracker that guilt-trips you with passive-aggressive charts. "You spent HOW much on coffee?"',
    status: 'shipped',
    tags: ['typescript', 'preact', 'sqlite'],
    url: '#',
  },
  {
    id: 'socketpong',
    title: 'Socket Pong',
    year: 2024,
    description:
      'Multiplayer pong over WebSockets. Latency is the real opponent. Surprisingly competitive at 3am.',
    status: 'shipped',
    tags: ['websockets', 'canvas', 'node'],
  },
  {
    id: 'gpt-dungeon',
    title: 'GPT Dungeon Master',
    year: 2024,
    description:
      'Text adventure powered by LLMs. The AI keeps trying to kill the player. Working as intended.',
    status: 'wip',
    tags: ['ai', 'python', 'flask'],
  },
  {
    id: 'css-crimes',
    title: 'CSS Crimes',
    year: 2023,
    description:
      'A collection of cursed CSS experiments. Pure CSS accordion that works in IE6. Single-div Mona Lisa. The police have been notified.',
    status: 'experiment',
    tags: ['css', 'art', 'cursed'],
    url: '#',
  },
  {
    id: 'startup-namer',
    title: 'Startup Name Generator',
    year: 2023,
    description:
      'Markov chain trained on YC companies. Generated "Uber for Uber" and I knew it was perfect. Abandoned after achieving peak comedy.',
    status: 'abandoned',
    tags: ['python', 'ml', 'comedy'],
  },
];
