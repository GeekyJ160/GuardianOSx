/**
 * Container entry. Nitro's node server reads HOST and PORT at import time.
 * Bind every interface on the platform's PORT. Do not default the port.
 */
process.env.HOST = "0.0.0.0";
process.env.NITRO_HOST = "0.0.0.0";

const port = Number.parseInt(process.env.PORT ?? "", 10);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error("PORT is required and must be a valid TCP port");
  process.exit(1);
}

await import("../.output/server/index.mjs");
