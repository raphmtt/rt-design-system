# Changesets

This folder contains changesets for version management.

## Usage

```bash
# Add a changeset for your changes
pnpm changeset

# Version packages (CI usually does this)
pnpm changeset version

# Publish packages (CI usually does this)
pnpm changeset publish
```

## Configuration

See `config.json` for settings. Key notes:

- `access: "restricted"` - Change to `"public"` when publishing to npm
- `ignore` - Demo and Storybook apps are not published
- `baseBranch: "main"` - PRs should target main

## TODO: Registry Setup

Before publishing, configure your npm registry:

1. **Private npm registry**: Update `.npmrc` with registry URL and auth
2. **GitHub Packages**: Set `publishConfig.registry` in package.json files
3. **Public npm**: Change `access` to `"public"` in config.json

See `.github/workflows/release.yml` for the publish workflow (currently uses placeholders).
