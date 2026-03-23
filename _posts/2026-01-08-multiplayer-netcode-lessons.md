---
layout: post
title: "What Multiplayer Netcode Taught Me About Systems Design"
subtitle: "Building networked games forces you to confront assumptions every other discipline gets to ignore"
date: 2026-01-08
tags: [Unity, Multiplayer, Architecture]
image: /img/blog/multiplayer-hero.svg
---

Multiplayer game development is one of the best educations in distributed systems you can get without working at a cloud company. The constraints are brutal and the feedback is immediate: if your netcode is wrong, players feel it.

Here are the lessons that stuck.

## Assume nothing arrives

In single-player, your game state is authoritative. You set `player.position = newPos` and it's done. In multiplayer, that update has to travel across a network with variable latency, packet loss, and reordering. By the time it arrives at another client, 80ms might have passed. The game world has moved on.

The first instinct is to just send everything and wait. This works fine on a LAN. On the internet it looks like your game is running underwater.

The solution that actually ships: **client-side prediction with server reconciliation**. The client applies input immediately (so it feels responsive) and sends that input to the server. The server runs the same simulation, responds with the authoritative result, and the client corrects any divergence. The correction needs to be smooth — hard snapping is jarring; blending over a few frames is invisible.

![Client prediction diagram: input is applied locally, sent to server, and reconciled against authoritative state](/img/blog/client-prediction.svg)

Valve's GoldSrc/Source engine popularized this model. Unity's Netcode for GameObjects and Photon both implement variants of it. The conceptual model is what matters more than any specific library.

## Latency vs. bandwidth are different problems

New networked game developers often conflate them. Compressing your packets helps bandwidth. It does nothing for latency. Running your server tick at 128Hz helps latency-sensitive games (shooters). It tanks your bandwidth.

The tradeoff matrix depends entirely on genre:
- **Turn-based / strategy**: latency doesn't matter much, bandwidth matters a lot at scale
- **Action/shooter**: latency is everything, you'll pay for bandwidth
- **MMO**: both matter and you'll need zone servers, interest management, and spatial partitioning to solve them

Understanding which axis your game lives on determines your entire network architecture.

## The server is the source of truth — always

The single worst decision in a networked game is trusting the client. Clients cheat. Not all of them, but enough that if cheating is possible, it will happen. The patterns are always the same: send fake positions (teleporting), send fake inputs (auto-aim), suppress sends (lag exploitation).

Server-authoritative simulation means the server runs the real game simulation. Clients send inputs; they receive state. They render what the server tells them, with prediction layered on top for feel. Anything that matters — scoring, collision, hit detection — runs on the server.

This constraint also improves your architecture in non-multiplayer ways. When the server is the source of truth, your game state becomes clean and testable. You can replay a session by replaying its inputs. You can run headless simulations for AI training. You naturally separate rendering (client concern) from simulation (server concern).

## Interpolation is your best friend

Even with good netcode, remote players will have choppy movement if you render them at the exact position reported in the last state packet. Network updates arrive at irregular intervals; rendering runs at 60+ fps.

Interpolation holds the remote player slightly in the past (by one or two packet intervals) and smoothly moves them between received positions. The cost is a small constant delay in how you perceive remote players — usually 50-100ms. The benefit is smooth, predictable movement that players read as "good netcode" even when the network itself isn't great.

The subtlety is that interpolation and prediction apply to different entities: **local player** uses prediction (so your own input feels instant), **remote players** use interpolation (so their movement looks smooth).

Get this distinction wrong and your game either feels laggy or jittery. Get it right and players describe the netcode as "tight."
