import type { Project } from '../types';

const STAMP_TILTS = [-3, -1, 1, 2];

function StatusStamp({
  status,
  tiltIndex = 0,
}: {
  status: Project['status'];
  tiltIndex?: number;
}) {
  const map: Record<Project['status'], string> = {
    live: 'LIVE',
    wip: 'WIP',
    experiment: 'EXPERIMENT',
    dead: 'DEAD',
  };
  const rotation = STAMP_TILTS[tiltIndex % STAMP_TILTS.length];
  return (
    <span
      class={`xerox-stamp xerox-stamp--${status}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      [{map[status]}]
    </span>
  );
}

export function XeroxLayout({ projects }: { projects: Project[] }) {
  return (
    <div class="xerox">
      <header class="xerox__header">
        <h1 class="xerox__name">TREVOR BRIXEY</h1>
        <p class="xerox__tagline">MAKING THINGS FOR SCREENS</p>
      </header>

      <main class="xerox__main">
        <section class="xerox__about">
          <h2 class="xerox__section-title">RE: WHO IS THIS</h2>
          <p class="xerox__body">
            Staff software engineer. 10+ years building scalable web and mobile
            systems. React, TypeScript, AWS serverless, Node.js. Bridges
            technical strategy with business outcomes. Learning how to handle AI
            tools without going insane.
          </p>
        </section>

        <section class="xerox__skills">
          <h2 class="xerox__section-title">KNOWN TOOLS</h2>
          <p class="xerox__body">
            REACT — NEXT.JS - MODULE FEDERATION (MICRO FRONTENDS) - TYPESCRIPT —
            AWS — NODE.JS - TAILWIND - POSTGRESQL - MONGODB
          </p>
        </section>

        <section class="xerox__projects">
          <h2 class="xerox__section-title">PROJECT LEDGER</h2>
          <div class="xerox__ledger">
            <div class="xerox__ledger-header">
              <span>YEAR</span>
              <span>TITLE</span>
              <span>STATUS</span>
              <span>TAGS</span>
            </div>
            {projects.map((p, index) => (
              <div key={p.id} class="xerox__ledger-row">
                <span class="xerox__year">{p.year}</span>
                <span class="xerox__title">
                  {p.url ? (
                    <a href={p.url} target="_blank" rel="noopener noreferrer">
                      {p.title.toUpperCase()}
                    </a>
                  ) : (
                    p.title.toUpperCase()
                  )}
                  <span class="xerox__desc">{p.description}</span>
                </span>
                <span>
                  <StatusStamp status={p.status} tiltIndex={index} />
                </span>
                <span class="xerox__tags">
                  {p.tags.join(', ').toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section class="xerox__contact">
          <h2 class="xerox__section-title">SIGNAL ME</h2>
          <p class="xerox__body">
            <a href="https://github.com/tbrixey">GITHUB</a> —{' '}
            <a href="https://www.linkedin.com/in/trevor-brixey">LINKEDIN</a>
          </p>
        </section>
      </main>
    </div>
  );
}
