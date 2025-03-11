import { serveDir } from "https://deno.land/std/http/file_server.ts";

// För loggning med stacktrace
const originalLog = console.log;
console.log = (...args) => {
  const stack = new Error().stack?.split("\n")[2] || "Unknown location";
  const location = stack.trim().replace(/^at\s+/, "");
  originalLog(`[${location}]`, ...args);
};

// Starta en server som serverar filer från public/
await Deno.serve(
  {
    hostname: "0.0.0.0",  // Också användbart för Deno Deploy
    port: 8888            // Deno Deploy kommer att hantera HTTPS åt dig
  },
  (req) => {
    // Servera filer från public/
    return serveDir(req, { fsRoot: "./public/", quiet: true });
  }
);

console.log("Server running");