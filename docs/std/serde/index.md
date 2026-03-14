# Serde — Serialization & Deserialization

The current serde tree exposes format-specific parser/serializer types plus helper functions. The exact surface depends on the format module.

## JSON Surface

Current JSON exports include:

- `JsonSerializer`
- `JsonParser`
- `JsonValue`
- `jsonParseDynamic`, `jsonParseDynamicSafe`
- `jsonStringifyDynamic`, `jsonStringifyDynamicPretty`

## Current Guidance

If you are documenting user code today, prefer format-module-specific APIs over a fictional universal `encode` / `decode` surface.

```vex
// Example shape — consult the specific serde/json submodule page
// for the exact helper you want to use.
```

## Notes

- The serde tree is real and substantial, but the surface varies by format module.
- This index intentionally avoids promising a single `encode/decode` API that is not the current exported JSON surface.
