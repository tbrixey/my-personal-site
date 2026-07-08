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
    id: 'GOMI-BAKO',
    title: 'GOMI-BAKO',
    year: 2026,
    description: 'A not so garbage, garbage API client.',
    status: 'live',
    tags: [
      'electron',
      'Like a lot of AI code',
      'I tried to not look at the code',
    ],
    url: 'https://gomibakorest.com',
  },
  {
    id: 'Riftbound Assistant',
    title: 'Riftbound Assistant',
    year: 2026,
    description:
      'Riftbound Assistant is an iOS app that is an AI assistant for the Riftbound TCG. I build context using the rules and cards of the game to help users learn the game and make decisions.',
    status: 'live',
    tags: [
      'typescript',
      'React',
      'React Native',
      'Expo',
      'Cloudflare',
      'OpenRouter',
      'Learned what RAG and Vectorization is for AI Agents',
    ],
    url: 'https://riftboundassistant.com',
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
