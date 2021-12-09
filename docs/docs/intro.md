---
sidebar_position: 1
sidebar_label: Introduction
slug: /
---

# Introduction to SyncedStore

SyncedStore is a library for building distributed, real-time collaborative web applications that sync automatically. This used to be quite complex, but with SyncedStore it's as easy as sharing a pie!

It adds an easy-to-use API on top of modern CRDT technology (see below) to make developing _multiplayer_ (or multi-device) experiences just as simple as developing regular applications.

<div>
    <a href="https://badge.fury.io/js/%40syncedstore%2Fcore" target="_blank" rel="noopener noreferrer"><img src="https://badge.fury.io/js/%40syncedstore%2Fcore.svg" alt="npm version" /></a>&nbsp;
    <iframe
        src="https://ghbtns.com/github-btn.html?user=yousefed&amp;repo=syncedstore&amp;type=star&amp;count=true&amp;size=small"
        width={160}
        height={20}
        title="GitHub Stars"
    />
</div>

## TL;DR

Create apps like this:

![SyncedStore CRDT screencapture](https://raw.githubusercontent.com/YousefED/syncedstore/main/syncedstore-2.gif)

_[Play with this example](/docs/react)_

Using an API as simple as this:

```typescript
// add a todo
store.todos.push({ completed: false, title: "Get groceries" });

// set todo to completed
store.todos[0].completed = true;
```

:::tip Tip: jump straight into the examples
You can walk through the documentation page-by-page, but if you're curious, you might want to jump straight into the live examples:

- [React example](/docs/react)
- [Vue example](/docs/vue)
- [Collaborative text editing](/docs/advanced/richtext)

:::

## Why?

SyncedStore makes it easy to develop applications that:

- 👨‍👩‍👧‍👦 **Are collaborative**: create multi-user and multi-device experiences without the need to handle complex conflict resolution management yourself.
- 🚀 **Are fast**: operations are handled locally, and data synchronization with other users and devices happens quietly in the background. 0 Latency!
- 🔗 **Work offline**: cloud apps typically don’t work while offline. Supporting both data sync and offline used to be difficult, SyncedStore aims to simplify this.

Perhaps most importantly, it makes it easy to build **decentralized applications**. This has a lot of security & privacy benefits compared to always relying on central (expensive) servers to keep track of all our data.

> Read more about [the benefits of Local-first software in this essay](https://www.inkandswitch.com/local-first.html)

In short, with some technological magic of so-called [CRDTs](https://crdt.tech/) (_Conflict-free Replicated Data Types_), we can build _cross-device_ apps that are _more collaborative_, _faster_, _work offline_ AND put the user _back in control of their data_.

Sounds great? Let's get started!

## Credits ❤️

SyncedStore builds directly on [Yjs](https://github.com/yjs/yjs) (a proven, high performance CRDT implementation) and [Reactive](https://www.github.com/yousefed/reactive). It's also inspired by and builds upon the amazing work by [MobX](https://mobx.js.org/) and [NX Observe](https://github.com/nx-js/observer-util).

<a href="https://nlnet.nl"><img src="https://nlnet.nl/image/logos/NGIAssure_tag.svg" alt="NLNet" width="100" /></a>

SyncedStore is proudly sponsored by [NLNet](https://nlnet.nl), be sure to check them out!
