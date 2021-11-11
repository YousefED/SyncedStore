---
sidebar_position: 1
sidebar_label: Introduction
---

# Introduction to SyncedStore

SyncedStore is a library for building distributed, real-time collaborative web applications. This used to be extremely complex, but with SyncedStore it's as easy as sharing a pie!

Let's make developing _multiplayer_ (or multi-device) experiences just as simple as developing regular applications.

## Why?

SyncedStore makes it easy to develop applications that:

- 👨‍👩‍👧‍👦 **Are collaborative**: create multi-user and multi-device experiences without the need to handle complex conflict resolution management yourself.
- 🚀 **Are fast**: operations are handled locally, and data synchronization with other users and devices happens quietly in the background. 0 Latency!
- 🔗 **Work offline**: cloud apps typically don’t work while offline. Supporting both data sync and offline used to be difficult, not anymore with SyncedStore.

Perhaps most importantly, it makes it easy to build **decentralized applications**. This has a lot of security & privacy benefits compared to always relying on central (expensive) servers to keep track of all our data.

> Read more about [the benefits of Local-first software in this excellent essay](https://www.inkandswitch.com/local-first.html)

In short, with some technological magic of so-called [CRDTs](https://crdt.tech/), we can build _cross-device_ apps that are _more collaborative_, _faster_, _work offline_ AND put the user _back in control of their data_.

Sounds great? Let's get started!
