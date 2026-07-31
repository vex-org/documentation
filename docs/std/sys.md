# sys — System Information

OS environment, process arguments, platform detection, and process control.

## Environment Variables

```vex
import { getEnv, setEnv } from "sys";

let home = getEnv("HOME");         // "/Users/vex"
setEnv("APP_MODE", "production");
```

## Command-Line Arguments

```vex
import { args } from "sys";

let argv = args();     // Vec<string> of CLI arguments
```

## Platform Detection

```vex
import { os, arch } from "sys";

let osName = os();       // "darwin", "linux", "windows"
let archName = arch();   // "amd64", "arm64"
```

## Process Control

```vex
import { exit } from "sys";

exit(0);    // Exit with status code 0
exit(1);    // Exit with failure
```
