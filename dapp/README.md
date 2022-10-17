## Test the workspace

Execute following commands

```
truffle migrate --reset
```

## Test on Ganache Console

1. Open Ganache Console like so:

```
node ➜ /workspace/dapp/src $ truffle console
```

2. Once console appears, run following JavaScript code to test Ganache commands:

```
truffle(development)> contract = await Greeter.deployed()
undefined
truffle(development)> contract.address
'0xF16C4bd499DfcE1D3FA9641d8e99fd9Ed2121517'
truffle(development)> name = await contract.name()
undefined
truffle(development)> name
'Greeter Instant Exchange'
truffle(development)>
truffle(development)> accounts
[
  '0xe233aB5AB361C345e6AB17Aaf91ED4a02c463142',
  '0x2931369Ce9220F10fBD50F790f43e0E190bCD27c',
  '0x2e607312bf567284805B9cc39aEab13Ef2eF977c',
  '0xc534A1862Dc2f2a2ba84CAaf022C6B155fDE77C5',
  '0x80e99daf65d699820D89A4ADb87b7ea446120644',
  '0xa8E583e4a2c00035fBac91dd6e629bc9C3d443D7',
  '0xc5336c198B6dE62B96c7d0490FC7b01a8E851d8a',
  '0xD3944F1cEEaC39D49a720561F8CE734C6E7345BF',
  '0x8cAdc000eC5B3118C38055F6f1CE831b407989EC',
  '0x894E10985D5Eb8f05A6580273551b358d84D5caA'
]

```

3. Test Greeter.sol

```
truffle(development)> Greeter = await Greeter.deployed()
undefined
truffle(development)> balance = await Greeter.balanceOf('0xe233aB5AB361C345e6AB17Aaf91ED4a02c463142')
undefined
truffle(development)> balance
BN {
  negative: 0,
  words: [ 16777216, 62077800, 20718012, 3, <1 empty item> ],
  length: 4,
  red: null
}
truffle(development)> balance.toString()
'1000000000000000000000000'
```

# Running the Unit Test

When you run the test for the first time it will fail like so:

```
node ➜ /workspace/dapp $ truffle test
Using network 'development'.


Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.

Error: Cannot find module 'react-bootstrap/lib/Breadcrumb'
Require stack:
```

`Problem:` Apparently the truffle automatically adds following lines in Greeter.test.js.

```
const { assert } = require('chai');
const { Item } = require('react-bootstrap/lib/Breadcrumb');
```

`Solution:` Follow these steps to fix this issue.
1. Remove the 2 lines that were added by truffle.
2. Rename the variable *Item* back to *it*.
3. Rerun the test.