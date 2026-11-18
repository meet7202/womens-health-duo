/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  /** Set to `1` only for `npm run dev:blogs`. Never enable in a production build. */
  readonly VITE_PREVIEW_BLOG_DRAFTS?: string;
  readonly VITE_GTM_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
