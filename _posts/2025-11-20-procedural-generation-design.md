---
layout: post
title: "Procedural Generation Is a Design Problem"
subtitle: "The hard part isn't the algorithm — it's knowing what you actually want to generate"
date: 2025-11-20
tags: [Game Design, Unity, Procedural]
image: /img/blog/procedural-hero.svg
---

Every developer who ships a procedural system reaches the same realization at some point: the algorithm was the easy part.

Noise functions, L-systems, WFC — these are solved problems with good libraries. The hard part is the step before the algorithm: *what does a good level actually look like?* What makes one dungeon corridor interesting and another boring? How do you encode that intuition into constraints a computer can satisfy?

## You're not generating content — you're generating possibility spaces

The useful mental shift is from "I'm making a dungeon generator" to "I'm designing the space of all dungeons this system can produce." Every dungeon in that space gets generated at runtime. Your job is to constrain the space so that the worst possible dungeon is still acceptable, while the best possible dungeon is memorable.

This reframing makes the common failure mode obvious: most procedural systems fail because their possibility space is too large. They can generate anything, which means they frequently generate garbage. A human designer would never ship that room, but the generator doesn't know better.

The fix is constraints — lots of them. Minimum room sizes. Required encounter cadences. Guaranteed rest areas before boss rooms. Adjacency rules. These constraints don't remove variety; they remove the bad tail of the distribution.

## Start with a fixed level

The best way to build a procedural system is to first build a level by hand. One complete, well-designed level. Then ask: what is this level actually made of? What are its components? What are the relationships between them?

Now build a system that could have generated this level — using the handcrafted level as a test case. If your generator can reproduce something close to your reference, it understands the structure. From there, you vary the parameters.

This approach catches abstraction errors early. If you can't describe your handcrafted level in terms your generator understands, your generator is modeling the wrong things.

## Authored vs. generated: a spectrum, not a binary

Pure generation (fully random, no hand authoring) and pure hand-authoring are the ends of a spectrum. Most shipped games live somewhere in the middle:

- **Spelunky**: handcrafted room tiles assembled procedurally — authored at the tile level, generated at the room level
- **Minecraft**: procedurally generated terrain with authored biome rules and structure templates
- **Hades**: authored rooms with procedurally varied encounter compositions

The hybrid approach gives you the best of both: authored content that a designer controls for quality, procedural variation that provides replayability. The question isn't "how random is it?" but "at which granularity do you want authored control vs. generated variety?"

![Spectrum from fully authored to fully generated, with Hades, Spelunky, Minecraft, and No Man's Sky placed along it](/img/blog/procedural-spectrum.svg)

## Feedback loops kill procedural systems

The hardest thing to generate procedurally is balance — the relationship between challenge and player capability. A human designer can playtest and tune. A generator creates hundreds of possible configurations and has no way to know which ones are fair.

The approaches that work:

**Simulation-based evaluation**: run an AI agent through generated content and measure outcomes (completion rate, health remaining, etc.). Filter out content that fails your thresholds.

**Authored difficulty curves**: rather than generating difficulty, author it as a parameter the generation respects. The first third of the run is easier. The last third is harder. The generator serves the curve, not the other way around.

**Player-facing randomness control**: some games (Slay the Spire) let players make the choices that drive difficulty through their card picks and route decisions. The generator only has to ensure the options exist, not that they're balanced — the player's choices create the balance.

Procedural generation rewards designers who understand systems. The algorithm is almost always the last thing you design — after you've answered the harder question of what you actually want it to make.
