const fs = require('fs');
const path = require('path');

// Read desktop-story-ch6-invitation-beacon-gap.png file stats
const p = path.resolve(__dirname, '../docs/screenshots/desktop-story-ch6-invitation-beacon-gap.png');
const stats = fs.statSync(p);
console.log('File size:', stats.size, 'bytes');
