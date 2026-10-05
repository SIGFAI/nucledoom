// NucleDoom (Patbox, LGPL-3.0): the real Doom engine (Mocha Doom) running inside Minecraft 1.21.4, a Plasmid
// minigame drawn on map screens, with the Doom shareware episode and Freedoom 1/2 bundled (both freely
// redistributable). Released on Modrinth only (1.1.0, no GitHub release). SIGFAI/nucledoom hosts only the .mrpack:
// every jar in it is a Modrinth download pinned by sha1/sha512, nothing is rehosted.
// Server-side mod (Polymer): in single-player the integrated server runs it, so it works in a client instance.
//   node library/nucledoom/build.mjs       (outputs: library/lib.mjs)
import { mrpack, resolveFabricApi } from '../../orchestrator/src/recipe.js';
import { instanceName } from '../../orchestrator/scripts/package-fusion.mjs';
import { asset, card, dl, emit, rawAt } from '../lib.mjs';

const UP = {
  repo: 'https://github.com/Patbox/nucledoom', authors: ['Patbox'], license: 'LGPL-3.0',
  // No git tag: Modrinth 1.1.0 (2025-04-03 20:55:12) is commit 1d7683e (pushed 5 s later; jars/mochadoom.jar blob
  // edfe25d1 identical to the one inside the Modrinth jar).
  version: '1.1.0', commit: '1d7683ee4763a70542013d405ad2e01b6c64d411', modrinth: 'https://modrinth.com/mod/nucledoom',
};
// gradle.properties at 1d7683e: MC 1.21.4, loader 0.16.9, Fabric API 0.112.0+1.21.4, Plasmid 0.6.2+1.21.4 (beta).
// fabric.mod.json: plasmid >= 0.6.0, java >= 21. Pinned to the release builds of each for 1.21.4.
const MC = { mc: '1.21.4', loader: '0.19.5', fabricApi: '0.119.4+1.21.4', java: '21' };
const MODS = [
  { project: 'nucledoom', version: '1.1.0', why: 'NucleDoom (Patbox, LGPL-3.0)' },
  { project: 'plasmid', version: '0.6.3+1.21.4', why: 'minigame framework (LGPL-3.0)' },
  { project: 'polymer', version: '0.11.8+1.21.4', why: 'server-side content library, required by Plasmid (LGPL-3.0)' },
];
const ID = 'nucledoom', VERSION = '1.1.0', NAME = 'NucleDoom';
const TAGLINE = 'The real Doom (1993) running inside Minecraft 1.21.4: shoot through the shareware episode or Freedoom on a giant map screen, with sound.';
const UA = { 'User-Agent': 'SIGFAI/mod-orchestrator (sigf.ai)' };

/** One Modrinth file as an mrpack download entry (hashes from Modrinth; Prism checks them). */
async function modrinth({ project, version }) {
  const q = `loaders=${encodeURIComponent('["fabric"]')}&game_versions=${encodeURIComponent(JSON.stringify([MC.mc]))}`;
  const res = await fetch(`https://api.modrinth.com/v2/project/${project}/version?${q}`, { headers: UA });
  if (!res.ok) throw new Error(`Modrinth ${project}: HTTP ${res.status}`);
  const v = (await res.json()).find(x => x.version_number === version);
  const f = v && (v.files.find(x => x.primary) ?? v.files[0]);
  if (!f) throw new Error(`Modrinth ${project} ${version} for ${MC.mc}: not found`);
  return { path: `mods/${f.filename}`, hashes: { sha1: f.hashes.sha1, sha512: f.hashes.sha512 }, env: { client: 'required', server: 'required' }, downloads: [f.url], fileSize: f.size };
}

const downloads = [];
for (const m of MODS) downloads.push(await modrinth(m));
if (downloads[0].hashes.sha1 !== '283485d6a01b530fe52aea93c1616885f9981b91') throw new Error('nucledoom-1.1.0.jar on Modrinth is not the QC-reviewed file');
const fabricApi = await resolveFabricApi(MC.fabricApi, MC.mc);
if (!fabricApi?.download) throw new Error(`Fabric API ${MC.fabricApi} not resolved on Modrinth`);
const pack = asset(`${ID}.mrpack`, mrpack({ name: NAME, summary: TAGLINE, versions: MC, versionId: VERSION, fabricApi, downloads, jars: [],
  extra: [{ name: `overrides/licenses/${NAME}-LICENSE.txt`, data: await rawAt(UP.repo, UP.commit, 'LICENSE') }] }));
const assets = [pack];

const make = (urls) => ({
  id: `sigf/${ID}`,
  version: VERSION,
  name: NAME,
  tagline: TAGLINE,
  kind: 'mashup', // Doom is re-run inside Minecraft from the bundled shareware/Freedoom WADs: no Doom install needed
  games: [
    { game: 'minecraft', role: 'host', label: 'Minecraft', engine: 'Minecraft Java 1.21.4 + Fabric, Plasmid minigame (server-side, Polymer)', mc: MC.mc, loader: `fabric@${MC.loader}`, java: MC.java },
    { game: 'doom', role: 'guest', label: 'Doom (1993)', uses: 'bundled Doom shareware episode and Freedoom 1/2 (redistributable); your own DOOM.WAD is not needed' },
  ],
  requires: [
    { id: 'fabric-loader', version: MC.loader },
    { id: 'fabric-api', version: MC.fabricApi, note: 'in the Minecraft pack (downloaded from Modrinth)' },
    { id: 'plasmid', version: MODS[1].version, page: 'https://modrinth.com/mod/plasmid', license: 'LGPL-3.0', note: 'in the Minecraft pack (downloaded from Modrinth)' },
    { id: 'polymer', version: MODS[2].version, page: 'https://modrinth.com/mod/polymer', license: 'LGPL-3.0', note: 'in the Minecraft pack (downloaded from Modrinth)' },
  ],
  install: [{ game: 'minecraft', strategy: 'mrpack', pack: { src: pack.name, ...dl(pack, urls) } }],
  launch: [{ game: 'minecraft' }],
  files: assets.map(a => ({ name: a.name, ...dl(a, urls) })),
  source: {
    repo: UP.repo, license: 'LGPL-3.0', upstream_license: 'LGPL-3.0 (code); Doom shareware WAD (id Software); Freedoom BSD-3-Clause',
    commit: UP.commit, release: `Modrinth ${UP.version}`, modrinth: UP.modrinth, hosted: `https://github.com/SIGFAI/${ID}`,
  },
  media: {},
  built_by: { author: UP.authors[0], authors: UP.authors, packaged_by: 'SIGF' },
  idea_by: UP.authors[0],
  built_at: '2026-10-05T00:00:00.000Z',
  ...card(UP.repo),
  notes: [
    `Minecraft: Java Edition only. Press Play: Minecraft ${MC.mc} starts as the app's own Prism instance "${instanceName(`sigf/${ID}`)}" (Fabric Loader ${MC.loader}, Fabric API ${MC.fabricApi}, Plasmid ${MODS[1].version}, Polymer ${MODS[2].version}, NucleDoom ${UP.version}, Java ${MC.java}).`,
    'Create a single-player world with cheats on, then type /game open nucledoom:doom_shareware (or nucledoom:freedoom1, nucledoom:freedoom2) and join the game it opens.',
    'Controls: WASD move, Shift run, mouse look, left click shoot, right click use, 1-7 weapons, F pause, Space select, E accept, Q back.',
    'Doom shareware (Episode 1) and Freedoom come with the mod; no Doom purchase needed. Sound is approximate.',
    'Beta: report bugs to the author on the upstream issue tracker. The author\'s public servers (playdoom.pb4.eu) are a separate way to play, not part of this install.',
  ],
});

emit({ slug: ID, version: VERSION, assets, fixtureAssets: null, make });
