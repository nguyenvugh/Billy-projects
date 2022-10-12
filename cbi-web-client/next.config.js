// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// module.exports = nextConfig;


const path = require('path');

module.exports = {
  poweredByHeader: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'assets/styles')],
  },
};
