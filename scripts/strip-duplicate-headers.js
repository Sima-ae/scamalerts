const http = require("http");
const https = require("https");

const headerNames = new Set(["origin", "host", "x-forwarded-host", "x-forwarded-proto"]);

function firstValue(value) {
  const raw = Array.isArray(value) ? value[0] : value;
  if (typeof raw !== "string") return raw;
  return raw.split(",")[0].trim();
}

function normalize(req) {
  if (!req) return;
  if (Array.isArray(req.rawHeaders)) {
    const kept = [];
    const seen = new Set();
    for (let i = 0; i < req.rawHeaders.length; i += 2) {
      const name = req.rawHeaders[i];
      const value = req.rawHeaders[i + 1];
      const key = String(name).toLowerCase();
      if (!headerNames.has(key)) {
        kept.push(name, value);
        continue;
      }
      if (seen.has(key)) continue;
      seen.add(key);
      kept.push(name, firstValue(value));
    }
    req.rawHeaders = kept;
  }
  if (req.headers) {
    for (const name of headerNames) {
      if (!(name in req.headers)) continue;
      req.headers[name] = firstValue(req.headers[name]);
    }
    if (req.method === "POST" && req.url && req.url.includes("/admin/meldingen/")) {
      console.error(
        "normalized-origin",
        JSON.stringify(req.headers.origin),
        "host",
        JSON.stringify(req.headers.host),
        "xfh",
        JSON.stringify(req.headers["x-forwarded-host"]),
      );
    }
  }
}

function patch(mod) {
  const emit = mod.Server.prototype.emit;
  mod.Server.prototype.emit = function (event, req, res, ...args) {
    if (event === "request") normalize(req);
    return emit.call(this, event, req, res, ...args);
  };
  const createServer = mod.createServer;
  mod.createServer = function (...args) {
    const server = createServer.apply(this, args);
    const serverEmit = server.emit;
    server.emit = function (event, req, res, ...rest) {
      if (event === "request") normalize(req);
      return serverEmit.call(this, event, req, res, ...rest);
    };
    return server;
  };
}

patch(http);
patch(https);
