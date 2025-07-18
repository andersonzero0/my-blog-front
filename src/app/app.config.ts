import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideTanStackQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { provideHttpClient } from '@angular/common/http';
import { provideMarkdown, MARKED_OPTIONS } from 'ngx-markdown';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { markedHighlight } from 'marked-highlight';
import markedCodePreview from "marked-code-preview"
import hljs from 'highlight.js';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideTanStackQuery(new QueryClient()),
    provideMarkdown({
      markedOptions: {
        provide: MARKED_OPTIONS,
        useValue: {
          gfm: true,
          breaks: true,
          pedantic: false,
        
        }
      },
      markedExtensions: [gfmHeadingId(), markedHighlight({
        emptyLangClass: 'hljs',
        langPrefix: 'hljs language-',
        highlight(code, lang, info) {
          const language = hljs.getLanguage(lang) ? lang : 'plaintext';
          return hljs.highlight(code, { language }).value;
        }
      }), markedCodePreview()]
    })
  ]
};
