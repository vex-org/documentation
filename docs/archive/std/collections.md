# Standard Library: Collections

Vex provides a set of common collection types backed by the standard library.

## `Vec<T>`

A contiguous growable array type, written as `Vec<T>`.

### Methods

#### `new`
```vex
fn new(): Vec<T>
```
Creates a new, empty vector.

#### `push`
```vex
fn (v: &Vec<T>!) push(value: T)
```
Appends an element to the back of the collection.

#### `pop`
```vex
fn (v: &Vec<T>!) pop(): Option<T>
```
Removes the last element from a vector and returns it, or `None` if it is empty.

#### `len`
```vex
fn (v: &Vec<T>) len(): usize
```
Returns the number of elements in the vector.

#### `get`
```vex
fn (v: &Vec<T>) get(index: usize): Option<&T>
```
Returns a reference to an element or subslice depending on the type of index.

---

## `HashMap<K, V>`

A hash map implemented with linear probing and Robin Hood hashing.

### Methods

#### `new`
```vex
fn new(): HashMap<K, V>
```
Creates an empty hash map.

#### `insert`
```vex
fn (m: &HashMap<K, V>!) insert(k: K, v: V): Option<V>
```
Inserts a key-value pair into the map.

#### `get`
```vex
fn (m: &HashMap<K, V>) get(k: K): Option<&V>
```
Returns a reference to the value corresponding to the key.

#### `remove`
```vex
fn (m: &HashMap<K, V>!) remove(k: K): Option<V>
```
Removes a key from the map, returning the value at the key if the key was previously in the map.

---

## `Box<T>`

A pointer type for heap allocation.

### Usage

```vex
let b = Box.new(5);
```
