// checkRoutes.js
// Put this in your project root and run: node checkRoutes.js
// It will inspect every .js file in src/routes and report what it exports.

const fs = require('fs');
const path = require('path');

const routeDir = path.join(__dirname, 'src', 'routes'); // change if your routes folder is elsewhere

if (!fs.existsSync(routeDir)) {
  console.error('ERROR: route directory not found:', routeDir);
  process.exit(1);
}

const files = fs.readdirSync(routeDir).filter(f => f.endsWith('.js'));
if (files.length === 0) {
  console.log('No route .js files found in', routeDir);
  process.exit(0);
}

console.log('Checking route files in:', routeDir);
console.log('---------------------------------------');

files.forEach(file => {
  const full = path.join(routeDir, file);
  try {
    // require the module (may run initialization code; run locally if you prefer)
    const mod = require(full);

    const t = typeof mod;
    const keys = mod && (typeof mod === 'object' || typeof mod === 'function') ? Object.keys(mod) : [];

    // Heuristics to detect router:
    // - express.Router() instances are functions with `.use` or `.stack` properties often
    // - sometimes modules export an object { router: router } which is WRONG for app.use(...)
    const looksLikeRouter =
      (typeof mod === 'function') ||
      (mod && (typeof mod.use === 'function' || Array.isArray(mod.stack)));

    console.log(`${file} -> typeof: ${t}${keys.length ? ' ; keys: ' + keys.join(',') : ''}`);
    if (!looksLikeRouter) {
      console.log(`  -> PROBLEM: This does NOT look like an Express router. Check its export (module.exports).`);
      console.log(`     Common wrong exports: "module.exports = { router }" or "export default router" (ESM).`);
      console.log(`     Correct export should be: module.exports = router`);
    } else {
      console.log('  -> OK: looks like a router (or function).');
    }
  } catch (err) {
    console.log(`${file} -> ERROR requiring file: ${err.message}`);
    console.log('  -> If this file connects to DB or depends on env vars, run locally or set required env before requiring.');
  }

  console.log('---------------------------------------');
});

