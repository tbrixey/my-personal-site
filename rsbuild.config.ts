import { defineConfig } from '@rsbuild/core';
import { pluginPreact } from '@rsbuild/plugin-preact';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [pluginPreact()],
  html: (() => {
    const siteName = 'Trevor Brixey';
    const title = `${siteName} — Software Developer`;
    const description =
      'Staff software engineer with 10+ years building scalable web and mobile systems. React, TypeScript, AWS serverless, and Node.js.';

    const siteUrl = 'https://trevorbrixey.com';

    return {
      title,
      favicon: './public/favicon.png',
      meta: {
        description,
        author: siteName,
        robots: 'index,follow',
        'theme-color': '#f2f0e8',
        'color-scheme': 'light',

        'og:title': { property: 'og:title', content: title },
        'og:description': { property: 'og:description', content: description },
        'og:type': { property: 'og:type', content: 'website' },
        ...(siteUrl
          ? { 'og:url': { property: 'og:url', content: siteUrl } }
          : {}),

        'twitter:card': 'summary',
        'twitter:title': title,
        'twitter:description': description,
      },
      tags: siteUrl
        ? [
            {
              tag: 'link',
              publicPath: false,
              attrs: { rel: 'canonical', href: siteUrl },
            },
          ]
        : [],
    };
  })(),
});
