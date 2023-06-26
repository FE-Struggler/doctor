{
  "name": "{{{ packageName }}}",
  "version": "0.1.0",
  "description": "{{{ description }}}",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "dev": "father dev",
    "build": "father build",
    "build:deps": "father prebundle",
    "prepublishOnly": "father doctor && npm run build"
  },
  "repository": "https://github.com/FE-Struggler/doctor",
  "keywords": [],
  "author": "{{{ author }}}",
  "license": "MIT",
  "files": [
    "./dist",
    "./bin"
  ],
  "publishConfig": {
    "access": "public"
  },
  "peerDependencies": {
    "@doctors/core": "workspace:^"
  },
  "dependencies": {
    "@doctors/utils": "workspace:^",
    "@umijs/core": "^4.0.71",
    "@umijs/utils": "^4.0.71"
  },
  "devDependencies": {
    "father": "^4.1.8",
    "@types/node": "^18.15.11",
    "typescript": "^5.0.3"
  }
}
