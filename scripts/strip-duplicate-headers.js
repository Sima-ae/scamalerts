const http = require("http");
const https = require("https");

const headerNames = ["origin", "host", "x-forwarded-host", "x-forwarded-proto"];

function firstValue(value) {
  return value.split(",")[0].trim();
}

function normalize(req) {
  if (!req?.headers) return;
  for (const name of headerNames) {
    const value = req.headers[name];
    if (typeof value === "string" && value.includes(",")) {
      req.headers[name] = firstValue(value);
    }
  }
}

for (const mod of [http, https]) {
  const emit = mod.Server.prototype.emit;
  mod.Server.prototype.emit = function (event, req, res, ...args) {
    if (event === "request") normalize(req);
    return emit.call(this, event, req, res, ...args);
  };
}
