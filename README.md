# Journey
Journey is a toolkit for building, testing and publishing typescript libraries with monorepo support.

## Quick Start
Instal `journey` as global binary:
```bash
yarn global add @haystackjs/journey
```

Create project directory and execute:
```bash
journey init my-awesome-project
```

#### Add Package
```bash
yarn journey add my-awesome-library
```

#### Remove Package
WARNING: This will delete all sources of this package.
```bash
yarn journey remove my-awesome-library
```

### Start Dev Server
```bash
yarn journey dev my-awesome-sample
```

### Export static server
```bash
yarn journey dev my-awesome-sample
```

### Build
```bash
yarn journey build
```

### Clean
```bash
yarn journey clean
```
