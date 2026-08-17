import { useEffect, useMemo, useRef } from 'preact/hooks';
import type { Project } from '../types';

/* ============================================================
   EDIT ME — the only content you need to touch here.
   Projects live in src/data/projects.ts.
   ============================================================ */
const NAME = 'TREVOR BRIXEY';
const TAGLINE = 'Making things for screens.';

const TOOLS = [
  'React',
  'Next.js',
  'Module Federation',
  'TypeScript',
  'AWS',
  'Node.js',
  'Tailwind',
  'PostgreSQL',
  'MongoDB',
  'Rust',
];
/* ============================================================ */

const GLYPHS = '!<>-_/[]{}—=+*^?#ABCDEFGHJKMNPQRSTUVWXYZ';

const esc = (s: string) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const pad = (n: number, l: number) =>
  String(Math.max(0, Math.floor(n))).padStart(l, '0');

/* ---------- Text scramble ---------- */
function scramble(el: HTMLElement, finalText: string, speed = 1) {
  const chars = Array.from(finalText);
  const frames = chars.map((c, i) => {
    const start = i * 2;
    return { c, start, end: start + Math.floor(10 + Math.random() * 21) };
  });
  let frame = 0;
  const timer = window.setInterval(() => {
    frame++;
    let out = '';
    let done = true;
    for (const f of frames) {
      if (frame >= f.end) {
        out += `<span class="sc">${esc(f.c)}</span>`;
      } else {
        done = false;
        const g = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        out +=
          frame >= f.start
            ? `<span class="sc">${esc(g)}</span>`
            : '<span class="sc">&nbsp;</span>';
      }
    }
    el.innerHTML = out;
    if (done) {
      window.clearInterval(timer);
      el.textContent = finalText; // settle to clean text
    }
  }, 28 / speed);
  return () => window.clearInterval(timer);
}

const STATUS_LABEL: Record<Project['status'], string> = {
  live: 'LIVE',
  wip: 'WIP',
  experiment: 'EXPERIMENT',
  dead: 'DEAD',
};

const STATUS_CLASS: Record<Project['status'], string> = {
  live: 'st-live',
  wip: 'st-exp',
  experiment: 'st-exp',
  dead: 'st-dead',
};

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export function XeroxLayout({ projects }: { projects: Project[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const typedRef = useRef<HTMLSpanElement>(null);
  const filedDate = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${pad(d.getMonth() + 1, 2)}-${pad(d.getDate(), 2)}`;
  }, []);
  const mxRef = useRef<HTMLSpanElement>(null);
  const myRef = useRef<HTMLSpanElement>(null);
  const scrollRef = useRef<HTMLSpanElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  /* ---------- Generated barcode (~60 bars, ~62% filled) ---------- */
  const barcode = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => {
        if (Math.random() < 0.62) {
          return {
            key: i,
            width: [1, 1, 2, 2, 3, 4][Math.floor(Math.random() * 6)],
            filled: true,
          };
        }
        return {
          key: i,
          width: [1, 1, 2][Math.floor(Math.random() * 3)],
          filled: false,
        };
      }),
    [],
  );

  /* ---------- Hero name scramble-in + tagline typing ---------- */
  useEffect(() => {
    const cancelScramble = nameRef.current
      ? scramble(nameRef.current, NAME, 1)
      : undefined;

    const timeouts: number[] = [];
    const start = window.setTimeout(() => {
      let i = 0;
      const step = () => {
        if (typedRef.current && i <= TAGLINE.length) {
          typedRef.current.textContent = TAGLINE.slice(0, i);
          i++;
          timeouts.push(window.setTimeout(step, 40 + Math.random() * 71));
        }
      };
      step();
    }, 900);
    timeouts.push(start);

    return () => {
      cancelScramble?.();
      timeouts.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reveals = Array.from(root.querySelectorAll('.reveal'));
    if (!('IntersectionObserver' in window)) {
      reveals.forEach((r) => r.classList.add('on'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('on');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    reveals.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  /* ---------- Fixed HUD: mouse X/Y + scroll % ---------- */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (mxRef.current) mxRef.current.textContent = pad(e.clientX, 4);
      if (myRef.current) myRef.current.textContent = pad(e.clientY, 4);
    };
    const onScroll = () => {
      if (!scrollRef.current) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current.textContent = pad(
        max > 0 ? (window.scrollY / max) * 100 : 0,
        3,
      );
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  /* ---------- Konami code -> REDACTED mode + console egg ---------- */
  useEffect(() => {
    let kpos = 0;
    const flashRedacted = () => {
      const f = flashRef.current;
      if (!f) return;
      f.classList.remove('go');
      void f.offsetWidth; // force reflow so the animation can replay
      f.classList.add('go');
    };
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === KONAMI[kpos]) {
        kpos++;
        if (kpos === KONAMI.length) {
          kpos = 0;
          document.body.classList.toggle('redacted');
          flashRedacted();
        }
      } else {
        kpos = key === 'ArrowUp' ? 1 : 0; // wrong ArrowUp restarts at position 1
      }
    };
    window.addEventListener('keydown', onKey);

    console.log(
      '%c FILE OPENED ',
      'background:#191713;color:#f2efe6;font-family:monospace;font-weight:bold;padding:4px 8px;letter-spacing:2px;',
    );
    console.log(
      "curious, aren't you. ↑↑↓↓←→←→BA",
      'color:#b3231a;font-family:monospace;font-size:14px;letter-spacing:1px;',
    );

    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* ---------- Visitor counter ---------- */
  const visitRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let cancelled = false;

    async function recordVisit() {
      try {
        const res = await fetch(
          'https://api.clientelity.com/personal-site-visit',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          },
        );
        if (!res.ok) throw new Error(`Bad status: ${res.status}`);
        const data = (await res.json()) as { count: number };
        if (!cancelled && visitRef.current) {
          visitRef.current.textContent = `VISITOR LOG / VISIT #${String(
            data.count,
          ).padStart(4, '0')} (GLOBAL)`;
        }
      } catch {
        if (!cancelled && visitRef.current) {
          visitRef.current.textContent = 'VISITOR LOG / COUNTER OFFLINE';
        }
      }
    }

    recordVisit();
    return () => {
      cancelled = true;
    };
  }, []);

  const marqueeChunk = TOOLS.map((t, i) => (
    <span key={i}>
      <span class="mq-item">{t.toUpperCase()}</span>
      <span class="mq-x" aria-hidden="true">
        ✕
      </span>
    </span>
  ));

  return (
    <div ref={rootRef}>
      <main class="col">
        {/* ---------- FILE STRIP ---------- */}
        <header class="filestrip">
          <span>FILE NO. 2026-001 // PERSONAL RECORD</span>
          <span>
            FILED: {filedDate}
            <span class="blink">_</span>
          </span>
        </header>

        {/* ---------- HERO ---------- */}
        <section class="hero" id="top">
          <h1 class="name" ref={nameRef} data-text={NAME}>
            {NAME}
          </h1>
          <p class="tagline">
            <span ref={typedRef}></span>
            <span class="cursor" aria-hidden="true"></span>
          </p>
          <p class="subline">
            FOUNDER OF{' '}
            <a
              class="studio-link"
              href="https://clientelity.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              CLIENTELITY LLC
            </a>{' '}
            — MAKING THINGS FOR SCREENS
          </p>
        </section>

        {/* ---------- BIO ---------- */}
        <section class="reveal" id="bio">
          <h2 class="sec-head">RE: WHO IS THIS</h2>
          <div class="body">
            <p class="bio">
              Trevor Brixey, founder of Clientelity LLC. Staff software engineer
              with 10+ years building scalable web and mobile systems. Bridges
              technical strategy with business outcomes. Currently learning how
              to handle AI tools without going insane.
            </p>
          </div>
        </section>

        {/* ---------- KNOWN TOOLS (marquee) ---------- */}
        <section class="reveal" id="tools">
          <h2 class="sec-head">KNOWN TOOLS</h2>
          <div class="body">
            <div class="marquee-wrap">
              <div class="mq-track">
                <div class="mq-chunk">{marqueeChunk}</div>
                <div class="mq-chunk" aria-hidden="true">
                  {marqueeChunk}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- PROJECT LEDGER ---------- */}
        <section class="reveal ledger" id="ledger">
          <h2 class="sec-head">PROJECT LEDGER</h2>
          <div class="body">
            <div class="lg-header">
              <span>YEAR</span>
              <span>TITLE</span>
              <span>STATUS</span>
            </div>
            <div class="ledger-rows">
              {projects.map((p, i) => (
                <div class="p-row" key={p.id} style={`--i:${i}`}>
                  <span class="p-year">{p.year}</span>
                  <div class="p-main">
                    {p.url ? (
                      <a
                        class="p-title"
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {p.title.toUpperCase()}
                      </a>
                    ) : (
                      <span class="p-title">{p.title.toUpperCase()}</span>
                    )}
                    {p.company && (
                      <span class="p-company">{p.company.toUpperCase()}</span>
                    )}
                    <p class="p-desc">{p.description}</p>
                    <p class="p-tags">{p.tags.join(', ')}</p>
                  </div>
                  <span class={`stamp ${STATUS_CLASS[p.status]}`}>
                    [ {STATUS_LABEL[p.status]} ]
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- SIGNAL ME ---------- */}
        <section class="reveal" id="signal">
          <h2 class="sec-head">SIGNAL ME</h2>
          <div class="body">
            <div class="links">
              <a
                class="sig-link"
                href="https://github.com/tbrixey"
                target="_blank"
                rel="noopener noreferrer"
                data-text="GITHUB"
                onMouseEnter={(e) => scramble(e.currentTarget, 'GITHUB', 2)}
              >
                GITHUB
              </a>
              <a
                class="sig-link"
                href="https://www.linkedin.com/in/trevor-brixey"
                target="_blank"
                rel="noopener noreferrer"
                data-text="LINKEDIN"
                onMouseEnter={(e) => scramble(e.currentTarget, 'LINKEDIN', 2)}
              >
                LINKEDIN
              </a>
            </div>
          </div>
        </section>

        {/* ---------- FOOTER ---------- */}
        <footer class="reveal" id="end">
          <h2 class="sec-head">END OF FILE</h2>
          <div class="body">
            <div class="barcode" aria-hidden="true">
              {barcode.map((b) => (
                <span
                  key={b.key}
                  style={`width:${b.width}px;${
                    b.filled ? 'background:var(--ink)' : ''
                  }`}
                />
              ))}
            </div>
            <div class="meta">
              <span>TREVOR BRIXEY — ALL RIGHTS RESERVED-ISH</span>
              <span ref={visitRef}>VISITOR LOG / BOOTING COUNTER…</span>
              <span>↑↑↓↓←→←→BA = ?</span>
            </div>
          </div>
        </footer>
      </main>

      {/* Fixed HUD (decorative) */}
      <div class="hud" aria-hidden="true">
        <div>
          X:<span ref={mxRef}>0000</span> Y:<span ref={myRef}>0000</span>
        </div>
        <div>
          SCROLL:<span ref={scrollRef}>000</span>%
        </div>
      </div>
      <div class="konami-hint" aria-hidden="true">
        // KONAMI ACCEPTED
      </div>

      {/* REDACTED flash stamp (Konami) */}
      <div class="flash" ref={flashRef} aria-hidden="true">
        <span>REDACTED</span>
      </div>
    </div>
  );
}
