# ens-blocksmith-demo

1. `bun i`
1. `forge install`
1. `bun test/test.ts`

### Workflow

1. edit [contracts](./src/)
1. use `forge build` to iterate and debug
1. deploy and test using [blocksmith](./test/test.ts)

#### List of Forge Installs

```sh
forge install foundry-rs/forge-std
forge install ensdomains/ens-contracts
forge install openzeppelin/openzeppelin-contracts@release-v4.9
```

