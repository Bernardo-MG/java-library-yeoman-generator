import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const root = path.resolve('generators/app/templates');
const out = path.resolve('validation-output/sample-library');
const ctx = {
  groupId: 'com.sample',
  artifactId: 'sample-library',
  version: '0.0.1-SNAPSHOT',
  releaseVersion: '0.0.1',
  package: 'com.sample.library',
  projectName: 'Sample Library',
  projectDescription: 'A generated sample library.',
  currentYear: '2026',
  developerId: 'dev',
  developerName: 'Developer',
  developerMail: 'dev@somewhere.sample',
  developerUrl: 'https://github.com/dev',
  repoUserId: 'dev',
  javaVersion: '11',
  packagePath: 'com/sample/library'
};

function render(template) {
  return template.replaceAll(/<%=\s*([A-Za-z0-9_.]+)\s*%>/g, (_, key) => {
    const value = key.split('.').reduce((acc, part) => acc?.[part], ctx);
    if (value === undefined) throw new Error(`Missing template value: ${key}`);
    return String(value);
  });
}

function copyTree(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dst, entry.name);
    if (entry.isDirectory()) copyTree(s, d);
    else fs.writeFileSync(d, render(fs.readFileSync(s, 'utf8')));
  }
}

fs.rmSync(out, { recursive: true, force: true });
copyTree(root, out);

for (const [from, to] of [
  ['_pom.xml', 'pom.xml'],
  ['_readme.md', 'readme.md'],
  ['_gitignore', '.gitignore'],
  ['_gitattributes', '.gitattributes'],
  ['_github', '.github'],
  ['src/main/java/__package__', `src/main/java/${ctx.packagePath}`],
  ['src/test/java/__package__', `src/test/java/${ctx.packagePath}`]
]) {
  fs.mkdirSync(path.dirname(path.join(out, to)), { recursive: true });
  fs.renameSync(path.join(out, from), path.join(out, to));
}

for (const p of ['_github', 'src/main/java/__package__', 'src/test/java/__package__']) {
  fs.rmSync(path.join(out, p), { recursive: true, force: true });
}

const required = [
  'pom.xml',
  'readme.md',
  'LICENSE',
  '.gitignore',
  '.gitattributes',
  '.github/workflows/ci.yml',
  '.github/workflows/release.yml',
  'src/main/java/com/sample/library/MainClass.java',
  'src/test/java/com/sample/library/test/unit/MainClassTest.java',
  'src/test/java/com/sample/library/test/integration/MainClassIT.java',
  'src/site/site.xml',
  'src/site/markdown/index.md',
  'src/changes.xml',
  'src/config/checkstyle/checkstyle-rules.xml',
   'src/config/pmd/pmd-rules.xml',
   'src/config/spotbugs/spotbugs-exclude.xml',
   'src/changes/changes.xml'
];

for (const p of required) {
  assert.ok(fs.existsSync(path.join(out, p)), `Missing ${p}`);
}

const pom = fs.readFileSync(path.join(out, 'pom.xml'), 'utf8');
assert.ok(pom.includes('<groupId>com.sample</groupId>'));
assert.ok(pom.includes('<artifactId>sample-library</artifactId>'));
assert.ok(pom.includes('https://github.com/dev/sample-library'));
assert.ok(!pom.includes('<%='), 'Unrendered EJS marker in pom.xml');

const java = fs.readFileSync(path.join(out, 'src/main/java/com/sample/library/MainClass.java'), 'utf8');
assert.ok(java.includes('package com.sample.library;'));
assert.ok(java.includes('public final class MainClass'));

console.log(`Validated generated sample at ${out}`);
