// Loads the unit files. In the browser the build concatenates app/src/units/*.js (each pushes to
// the global CARPE_UNITS) and app.js reads that array. In Node (tests, site build) `loadUnits`
// requires every unit file in src/units/ and returns them sorted in course order.
(function () {
  if (typeof module === "undefined") return; // browser: nothing to do, app.js reads CARPE_UNITS
  const fs = require("node:fs");
  const path = require("node:path");
  const DIR = path.join(__dirname, "units");
  const EXAMPLE = "u0_example.js";

  /** Unit files in the order the build concatenates them (numeric by id; the example last and only on request). */
  function unitFiles({ example = false } = {}) {
    const files = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((f) => /^u\d+.*\.js$/.test(f)) : [];
    const num = (f) => parseInt(f.replace(/^u/, ""), 10);
    return files
      .filter((f) => (f === EXAMPLE ? example : true))
      .sort((a, b) => num(a) - num(b) || a.localeCompare(b))
      .map((f) => path.join(DIR, f));
  }
  /** Load every unit (fresh, no require cache) as plain objects. */
  function loadUnits(opts) {
    return unitFiles(opts).map((f) => {
      delete require.cache[require.resolve(f)];
      const u = require(f);
      return u && u.default ? u.default : u;
    });
  }
  module.exports = { unitFiles, loadUnits, UNITS_DIR: DIR, EXAMPLE };
})();
