# Project v0.0.0

## Overview

**Structs:** [`HashSet`](#HashSet) · [`Stack`](#Stack) · [`Node`](#Node) · [`LinkedList`](#LinkedList) · [`Entry`](#Entry) · [`HashMap`](#HashMap) · [`Queue`](#Queue) · [`PriorityQueue`](#PriorityQueue)

**Functions:** [`getHash`](#getHash) · [`getEq`](#getEq)

## Structs

### <a id="HashSet"></a>`HashSet` `🔓 export`

&gt; 📄 `hashset.vx` L7-10

```vex
export struct HashSet<H>
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `map` | `HashMap&lt;H, bool&gt;` | 🔓 public |  |

**Type Parameters:**

- `H`

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `HashSet.new`[↗](#HashSet.new) | `export fn HashSet.new(): HashSet&lt;H&gt;` | Creates a new, empty HashSet. |

---

### <a id="Stack"></a>`Stack` `🔓 export`

&gt; 📄 `stack.vx` L5-8

```vex
export struct Stack<S>
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `buf` | `Vec&lt;S&gt;` | 🔓 public |  |

**Type Parameters:**

- `S`

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Stack.new`[↗](#Stack.new) | `export fn Stack.new(): Stack&lt;S&gt;` | Creates a new, empty Stack. |

---

### <a id="Node"></a>`Node` `🔓 export`

&gt; 📄 `linked.vx` L5-10

```vex
export struct Node<N>
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `value` | `N` | 🔓 public |  |
| `prev` | `i32` | 🔓 public |  |
| `next` | `i32` | 🔓 public |  |

**Type Parameters:**

- `N`

---

### <a id="LinkedList"></a>`LinkedList` `🔓 export`

&gt; 📄 `linked.vx` L12-19

```vex
export struct LinkedList<L>
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `nodes` | `Vec&lt;Node&lt;L&gt;&gt;` | 🔓 public |  |
| `free_nodes` | `Vec&lt;i32&gt;` | 🔓 public |  |
| `head` | `i32` | 🔓 public |  |
| `tail` | `i32` | 🔓 public |  |
| `count` | `i32` | 🔓 public |  |

**Type Parameters:**

- `L`

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `LinkedList.new`[↗](#LinkedList.new) | `export fn LinkedList.new(): LinkedList&lt;L&gt;` | Creates a new, empty LinkedList. |

---

### <a id="Entry"></a>`Entry` `🔓 export`

&gt; 📄 `hashmap.vx` L7-11

```vex
export struct Entry<K, V>
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `key` | `K` | 🔓 public |  |
| `value` | `V` | 🔓 public |  |

**Type Parameters:**

- `K`
- `V`

---

### <a id="HashMap"></a>`HashMap` `🔓 export`

&gt; 📄 `hashmap.vx` L13-18

```vex
export struct HashMap<K, V>
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `buckets` | `Vec&lt;Vec&lt;Entry&lt;K, V&gt;&gt;&gt;` | 🔓 public |  |
| `capacity` | `usize` | 🔓 public |  |
| `occupied_count` | `usize` | 🔓 public |  |

**Type Parameters:**

- `K`
- `V`

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `HashMap.new`[↗](#HashMap.new) | `export fn HashMap.new(): HashMap&lt;K, V&gt;` | Creates a new HashMap with default capacity of 16. |
| `HashMap.withCapacity`[↗](#HashMap.withCapacity) | `export fn HashMap.withCapacity(cap: i32): HashMap&lt;` | Creates a new HashMap with the specified initial capacity. |

---

### <a id="Queue"></a>`Queue` `🔓 export`

&gt; 📄 `queue.vx` L7-10

```vex
export struct Queue<Q>
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `list` | `LinkedList&lt;Q&gt;` | 🔓 public |  |

**Type Parameters:**

- `Q`

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Queue.new`[↗](#Queue.new) | `export fn Queue.new(): Queue&lt;Q&gt;` | Creates a new, empty Queue. |

---

### <a id="PriorityQueue"></a>`PriorityQueue` `🔓 export`

&gt; 📄 `priority.vx` L5-8

```vex
export struct PriorityQueue<P>
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `buf` | `Vec&lt;P&gt;` | 🔓 public |  |

**Type Parameters:**

- `P`

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `PriorityQueue.new`[↗](#PriorityQueue.new) | `export fn PriorityQueue.new(): PriorityQueue&lt;P&gt;` | Creates a new, empty PriorityQueue. |

---

## Functions

### <a id="getHash"></a>`getHash` `🔓 export`

&gt; 📄 `hash.vx` L9-23

```vex
export fn getHash(val: &T): u64
```

Returns the 64-bit hash of a value of type T.

**Type Parameters:**

- `T`

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `val` | `&T` |  |

**Returns:** `u64`

---

### <a id="getEq"></a>`getEq` `🔓 export`

&gt; 📄 `hash.vx` L26-40

```vex
export fn getEq(a: &T, b: &T): bool
```

Returns true if two values of type T are equal.

**Type Parameters:**

- `T`

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `a` | `&T` |  |
| `b` | `&T` |  |

**Returns:** `bool`

---

---

*Generated by vex-doc v2.0 • 2026-07-06*
