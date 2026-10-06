/**
 * Shared LIVE-PREVIEW OAuth client (server-only — NEVER import from the client).
 *
 * The sandbox serves each live preview on a dynamic `https://*.grok-sandbox.com`
 * URL, which can't be pre-registered per app. The broker instead exposes ONE
 * shared "preview" client that accepts any
 * `https://*.grok-sandbox.com/api/auth/oauth2/callback/*`
 * (broker: `app-builder-deployer/auth/src/preview-oauth.ts`). When deployed the
 * deployer injects a per-app `GROK_AUTH_*` that overrides these (see `server.ts`).
 *
 * The client id is public. The client secret is NOT stored in source — a
 * previous value was committed and is retired. Set `GROK_PREVIEW_CLIENT_SECRET`
 * for the sandbox (it must match the broker's rotated
 * `GROK_PREVIEW_CLIENT_SECRET`) or `GROK_AUTH_CLIENT_SECRET` when deployed.
 * Rotate the broker env var; do not paste the new secret back into this file.
 */
export const PREVIEW_CLIENT_ID = "grok_preview";

/** Empty when unset. Never fall back to a secret checked into the repo. */
export const PREVIEW_CLIENT_SECRET = (
  process.env.GROK_PREVIEW_CLIENT_SECRET ?? ""
).trim();

/** The shared auth broker issuer (OIDC discovery lives under it). */
export const GROK_ISSUER_DEFAULT = "https://auth.grok.me";

/**
 * Host patterns whose callbacks the preview client accepts. Better Auth derives
 * the live preview's real origin from the request host and validates it against
 * this list (wildcard-matched), so the OAuth `redirect_uri` becomes the concrete
 * `https://<preview-host>/api/auth/oauth2/callback/...` the broker allows.
 */
export const PREVIEW_ALLOWED_HOSTS = ["*.grok-sandbox.com"] as const;
