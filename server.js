import { serveTls } from "https://deno.land/std@0.120.0/http/server.ts";
import { serveFile } from "https://deno.land/std@0.120.0/http/file_server.ts";
import { serveDir } from "jsr:@std/http";

const originalLog = console.log;

console.log = (...args) => {
  const stack = new Error().stack?.split("\n")[2] || "Unknown location";
  const location = stack.trim().replace(/^at\s+/, "");
  originalLog(`[${location}]`, ...args);
};

const certPath =  await Deno.readTextFile("./certs/cert.pem");
const keyPath =  await Deno.readTextFile("./certs/private.pem");


Deno.serve({
  hostname: "0.0.0.0",
  port: 8888,
  cert: certPath,
  key: keyPath },
(req) => {
  return serveDir(req, {fsRoot: "./public/", quiet: true})
});