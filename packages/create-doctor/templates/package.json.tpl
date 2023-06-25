{
  "name": "{{{ name }}}",
  "version": "0.1.0",
  "description": "{{{ description }}}",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "bin": {
    "doctor": "./bin/doctor.js"
  },
  "scripts": {
    "dev": "father dev",
    "build": "father build",
    "build:deps": "father prebundle",
    "prepublishOnly": "father doctor && npm run build"
  },
  "keywords": [],
  "authors": [{{#author}}
    "{{{ author }}}"
  {{/author}}],
  "license": "MIT",
  "files": [
    "./dist",
  ],
  "peerDependencies": {
    "@doctors/core": "latest"
  },
  "dependencies": {
    "@umijs/core": "^4.0.71",
    "@umijs/utils": "^4.0.71"
  }
}
