# NucleDoom

The real Doom (1993) running inside Minecraft 1.21.4: shoot through the shareware episode or Freedoom on a giant map screen, with sound.

**NucleDoom is made by [Patbox](https://github.com/Patbox).** All credit for the mod goes to them.

- Original project: https://github.com/Patbox/nucledoom
- Report bugs and ask questions there: https://github.com/Patbox/nucledoom/issues
- Upstream version packaged here: 1.1.0 (commit [`1d7683e`](https://github.com/Patbox/nucledoom/tree/1d7683ee4763a70542013d405ad2e01b6c64d411))

> **Beta.** Nobody at SIGF has played this build yet. Back up your saves.
> Bugs in the mod itself go to the author's issue tracker above; problems with the one-click install go to this repository's issues.

## What you need

- **Minecraft**: Java Edition 1.21.4.
- **Doom (1993)** (bundled Doom shareware episode and Freedoom 1/2 (redistributable); your own DOOM.WAD is not needed).
- Windows and the [SIGF app](https://sigf.ai). The app installs fabric-loader 0.19.5, fabric-api 0.119.4+1.21.4, plasmid 0.6.3+1.21.4, polymer 0.11.8+1.21.4 for you.

## Install

In the SIGF app, open **NucleDoom** in the catalog, press **Install**, then **Play**. **Restore** puts your game folders back exactly as they were.
The app follows `mashup.json` in this repository: every download is pinned by sha256. The files come from the release [`v1.1.0`](../../releases/tag/v1.1.0).

### Good to know

- Minecraft: Java Edition only. Press Play: Minecraft 1.21.4 starts as the app's own Prism instance "sigf-nucledoom" (Fabric Loader 0.19.5, Fabric API 0.119.4+1.21.4, Plasmid 0.6.3+1.21.4, Polymer 0.11.8+1.21.4, NucleDoom 1.1.0, Java 21).
- Create a single-player world with cheats on, then type /game open nucledoom:doom_shareware (or nucledoom:freedoom1, nucledoom:freedoom2) and join the game it opens.
- Controls: WASD move, Shift run, mouse look, left click shoot, right click use, 1-7 weapons, F pause, Space select, E accept, Q back.
- Doom shareware (Episode 1) and Freedoom come with the mod; no Doom purchase needed. Sound is approximate.
- Beta: report bugs to the author on the upstream issue tracker. The author's public servers (playdoom.pb4.eu) are a separate way to play, not part of this install.

## What this repository holds

NucleDoom (LGPL-3.0) is released on Modrinth, and the app downloads it from there. This repository holds **only SIGF's own files**, never the author's:

1. This README, `sigf/` (the script that built the recipe, for reference) and `mashup.json` (the SIGF app recipe).
2. The release `v1.1.0`:

| Asset | Size | sha256 | What it is |
|---|---|---|---|
| `nucledoom.mrpack` | 3997 B | `71c8f352e02438317ad894d054488c0cc1721fb32c675bb928fc2f7d421d4aba` | a Minecraft 1.21.4 pack (Fabric Loader 0.19.5) of Modrinth download links pinned by sha1/sha512: NucleDoom 1.1.0, Plasmid 0.6.3+1.21.4, Polymer 0.11.8+1.21.4, Fabric API 0.119.4+1.21.4; plus NucleDoom's LICENSE. No jar is stored here. |

## Licenses

| Part | License | Where |
|---|---|---|
| NucleDoom (downloaded from Modrinth by the app) | LGPL-3.0 (code); bundled Doom shareware WAD (id Software shareware terms) and Freedoom (BSD-3-Clause) | https://github.com/Patbox/nucledoom |
| Plasmid, Polymer, Fabric API (downloaded from Modrinth by the app) | LGPL-3.0, LGPL-3.0, Apache-2.0 | https://modrinth.com/mod/plasmid, https://modrinth.com/mod/polymer, https://modrinth.com/mod/fabric-api |

## Why this repository exists

The SIGF app (https://sigf.ai) installs mods from recipes (`mashup.json`) whose downloads are pinned release files. This repository makes NucleDoom installable in one click, credited to Patbox. If you are the author and want anything changed or taken down, open an issue here.
