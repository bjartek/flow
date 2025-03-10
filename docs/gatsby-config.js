const path = require("path");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({
    path: `.env.local`
  });
}

const navConfig = {
  "Getting Started": {
    url: "/",
    icon: null,
    omitLandingPage: true,
    description:
      "New to Flow? Start here. Read about Flow's architecture, and important concepts for a deeper understanding of the Flow platform and how it works."
  },
  Cadence: {
    url: "/cadence",
    icon: "cadence",
    description:
      "Resource-Oriented programming language for smart contracts that helps developers ensure that their code is safe, secure, clear, and approachable.",
    linkText: "Cadence Documentation"
  },
  "Flow Playground": {
    url: "https://play.onflow.org",
    icon: "playground",
    description:
      "Learn the basics of Flow and Cadence using our browser-based playground.",
    linkText: "Launch the Flow Playground"
  },
  "FCL (Flow Client Library)": {
    url: "/fcl",
    icon: "js-sdk",
    description:
      "Interact with the Flow Blockchain, and user's wallets from browser based apps, and React Native.",
    linkText: "FCL Documentation"
  },
  "Testing Library": {
    url: "/flow-js-testing",
    icon: "js-testing",
    description:
      "Simplify testing your Cadence code using our JS testing library.",
    linkText: "Flow JS Testing"
  },
  "Go SDK": {
    url: "/flow-go-sdk",
    icon: "go-sdk",
    description:
      "Build apps that interact with Flow using our full-featured Go SDK.",
    linkText: "Go SDK Documentation"
  },
  "Flow CLI": {
    url: "/flow-cli",
    icon: "cli",
    description:
      "The Flow CLI is a command-line interface that provides useful utilities for building Flow applications.",
    linkText: "CLI Documentation"
  },
  "Flow Emulator": {
    url: "/emulator",
    icon: "emulator",
    description:
      "Develop and test your applications locally using the Flow emulator.",
    linkText: "Emulator Documentation"
  },
  "VS Code Extension": {
    url: "/vscode-extension",
    icon: "vscode",
    description:
      "Cadence syntax highlighting and an integrated Flow emulator for VSCode users.",
    linkText: "VSCode Extension Documentation"
  },
  "Flow Port": {
    url: "/flow-port",
    icon: "port",
    description:
      "Flow Port, your portal to the decentralized world of Flow. Access your Flow account, interact with the blockchain, manage your assets and more.",
    linkText: "Flow Port"
  }
};

// sourceGithubRepos maps a sourceInstanceName to a GitHub repo name
const sourceGithubRepos = {
  docs: {
    githubRepo: "onflow/flow",
    // NOTE: path is non-empty, because only content in this path is sourced
    path: "docs/content"
  },
  "cadence-github": {
    githubRepo: "onflow/cadence",
    // NOTE: path is empty, whole repo is sourced
    path: "docs"
  },
  "flow-cli-github": {
    githubRepo: "onflow/flow-cli",
    // NOTE: path is empty, whole repo is sourced
    path: "docs"
  },
  "flow-js-testing-github": {
    githubRepo: "onflow/flow-js-testing",
    // NOTE: path is empty, whole repo is sourced
    path: "docs"
  },
  "flow-go-sdk-github": {
    githubRepo: "onflow/flow-go-sdk",
    // NOTE: path is empty, whole repo is sourced
    path: ""
  },
  "fcl-github": {
    githubRepo: "onflow/fcl-js",
    // NOTE: path is empty, whole repo is sourced
    path: "docs"
  },
  "flow-emulator-github": {
    githubRepo: "onflow/flow-emulator",
    path: ""
  }
};

// sourceSlugTransformers maps a sourceInstanceName to slug transformation functions
const sourceSlugTransformers = {
  "cadence-github": (slug) => slug.replace(/^\/docs\//, "/cadence/"),
  "fcl-github": (slug) =>
    slug
      .replace(/^\/docs\//, "/fcl/")
      .replace(/^\/packages\//, "/fcl/packages/"),

  "flow-go-sdk-github": (slug) =>
    slug
      .replace(/^\/docs\//, "/flow-go-sdk/")
      .replace(/^\/examples\//, "/flow-go-sdk/examples/"),

  "flow-cli-github": (slug) => slug.replace(/^\/docs\//, "/flow-cli/"),
  "flow-js-testing-github": (slug) =>
    slug.replace(/^\/docs\//, "/flow-js-testing/"),
  "sdk-guidelines-github": (slug) =>
    slug
      .replace(/^\/README\//, "/sdk-guidelines/")
      .replace(
        /^\/ubiquitous-language\//,
        "/sdk-guidelines/ubiquitous-language/"
      ),
  "flow-emulator-github": (slug) => slug.replace(/^\/README\//, "/emulator/")
};

const sources = [
  {
    resolve: "gatsby-source-filesystem",
    options: {
      path: path.join(__dirname, "content"),
      name: "docs"
    }
  },
  {
    resolve: "gatsby-source-git",
    options: {
      name: "sdk-guidelines-github",
      remote: "https://github.com/onflow/sdks",
      patterns: "**/*"
    }
  },
  {
    resolve: "gatsby-source-git",
    options: {
      name: "flow-emulator-github",
      remote: "https://github.com/onflow/flow-emulator",
      patterns: ["README.md", "emulator-banner.svg"]
    }
  },
  {
    resolve: "gatsby-source-git",
    options: {
      name: "cadence-github",
      remote: "https://github.com/onflow/cadence.git",
      patterns: "docs/**/*"
    }
  },
  {
    resolve: "gatsby-source-git",
    options: {
      name: "flow-go-sdk-github",
      branch: "master",
      remote: "https://github.com/onflow/flow-go-sdk.git",
      patterns: ["docs/**/*", "examples/**/*"]
    }
  },
  {
    resolve: "gatsby-source-git",
    options: {
      name: "flow-js-testing-github",
      branch: "master",
      remote: "https://github.com/onflow/flow-js-testing.git",
      patterns: ["docs/**/*", "examples/**/*"]
    }
  },
  {
    resolve: "gatsby-source-git",
    options: {
      name: "fcl-github",
      branch: "master",
      remote: "https://github.com/onflow/fcl-js.git",
      patterns: [
        "docs/**/*",
        "packages/fcl/**/*",
        "packages/types/**/*",
        "packages/sdk/**/*"
      ]
    }
  },
  {
    resolve: "gatsby-source-git",
    options: {
      name: "flow-cli-github",
      branch: "master",
      remote: "https://github.com/onflow/flow-cli.git",
      patterns: [
        "docs/index.md",
        "docs/install.md",
        "docs/configuration.md",
        "docs/initialize-configuration.md",
        "docs/generate-keys.md",
        "docs/create-accounts.md",
        "docs/execute-scripts.md",
        "docs/send-transactions.md",
        "docs/get-transactions.md",
        "docs/build-transactions.md",
        "docs/sign-transaction.md",
        "docs/send-signed-transactions.md",
        "docs/get-transactions.md",
        "docs/account-add-contract.md",
        "docs/account-update-contract.md",
        "docs/account-remove-contract.md",
        "docs/project-contracts.md",
        "docs/deploy-project-contracts.md",
        "docs/account-staking-info.md",
        "docs/get-blocks.md",
        "docs/get-events.md",
        "docs/get-accounts.md",
        "docs/get-collections.md",
        "docs/get-status.md",
        "docs/security.md",
        "docs/start-emulator.md"
      ]
    }
  }
];

const sections = [
  {
    sourceInstanceName: "docs",
    patterns: [
      "*",
      "intro/*",
      "faq/*",
      "community-updates/*",
      "flow-port/**/*",
      "bounties/*"
    ],
    sidebarShowMainNav: true,
    sidebarAlwaysExpanded: false,
    sidebar: {
      Tutorials: [
        "[Flow App Quickstart](/fcl/tutorials/flow-app-quickstart)",
        "[Introduction to Cadence](/cadence/tutorial/01-first-steps)",
        "[Create Non-Fungible Tokens (NFTs)](/cadence/tutorial/04-non-fungible-tokens/)",
        "[CryptoDappy Online Course!](https://www.cryptodappy.com)"
      ],
      "Guides & Walkthroughs": [
        "[Flow Concepts](/concepts)",
        "[Cadence Best Practices](/cadence)",
        "[Dapp Development Guide](/dapp-development)",
        "[Using the Testing Library](/flow-js-testing/install/)",
        "[Building Flow SDKs (Guidelines)](/sdk-guidelines)",
        "[Operate a Flow Node](/node-operation)",
        "[Flow Port Staking Walkthrough](/flow-port/staking-guide)",
        "[Staking Technical Guides](/staking/staking-options)"
      ],
      Reference: [
        "[Available Flow SDKs](/sdks)",
        "[Flow Access API](/access-api)",
        "[Cadence Language Reference](/cadence/language/)",
        "[Testing Library Reference](/flow-js-testing)",
        "[Core Protocol Smart Contracts](/core-contracts)",
        "[Other Important Smart Contracts](/core-contracts)",
        "[Epochs, Staking & Delegating](/staking)",
        "[FUSD Transactions & Scripts](/fusd/transactions)",
        "[Upcoming Sporks](/node-operation/upcoming-sporks)",
        "[Past Sporks](/node-operation/past-sporks)"
      ],
      Ecosystem: [
        "[Flow Wallets](/flow-token/available-wallets)",
        "[Block Explorer](https://flowscan.org)",
        "[Testnet Faucet](https://flow-faucet.vercel.app/)",
        "[Flow Port](https://port.onflow.org/)",
        "[Bug Bounty Program](/bounties)"
      ],
      Tokens: ["[FLOW Token](/flow-token)", "[FUSD](/fusd)"],
      FAQ: [
        "[Builders/Developers](/faq/developers)",
        "[Backers/Users](/faq/backers)",
        "[Operators](/faq/operators)"
      ]
    }
  },
  {
    sourceInstanceName: "sdk-guidelines-github",
    patterns: ["README.md", "ubiquitous-language.md"],
    sidebarAlwaysExpanded: true,
    sidebar: {
      null: ["[Home](/)"],
      Overview: ["[SDK Guidelines](/sdk-guidelines)"],
      Glossary: ["[Ubiquitous Language](/sdk-guidelines/ubiquitous-language)"]
    }
  },
  {
    sourceInstanceName: "cadence-github",
    patterns: ["docs/*.(md|mdx|png)", "docs/tutorial/**/*.(md|mdx|png)"],
    sidebarAlwaysExpanded: true,
    sidebar: {
      null: ["[Home](/)"],
      Overview: ["[Cadence Language Reference](/cadence/language/)"],
      "Developer Guides": [
        "[Introduction to Cadence](/cadence)",
        "docs/design-patterns",
        "docs/contract-upgrades",
        "docs/anti-patterns",
        "docs/msg-sender",
        "docs/measuring-time",
        "docs/subtyping",
        "docs/migration-guide",
        "docs/json-cadence-spec",
        "docs/syntax-highlighting"
      ],
      Tutorial: [
        "docs/tutorial/01-first-steps",
        "docs/tutorial/02-hello-world",
        "docs/tutorial/03-fungible-tokens",
        "docs/tutorial/04-non-fungible-tokens",
        "docs/tutorial/05-marketplace-setup",
        "docs/tutorial/06-marketplace-compose",
        "docs/tutorial/07-resources-compose",
        "docs/tutorial/08-voting"
      ]
    }
  },
  {
    sourceInstanceName: "flow-cli-github",
    patterns: ["docs/**/*"],
    sidebarAlwaysExpanded: true,
    sidebar: {
      null: ["[Home](/)"],
      "Flow CLI": [
        "docs/index",
        "docs/install",
        "docs/initialize-configuration",
        "docs/configuration",
        "docs/security"
      ],
      Keys: ["docs/generate-keys"],
      Accounts: [
        "docs/get-accounts",
        "docs/create-accounts",
        "docs/account-add-contract",
        "docs/account-update-contract",
        "docs/account-remove-contract",
        "docs/account-staking-info"
      ],
      "Project Deployment": [
        "docs/start-emulator",
        "docs/project-contracts",
        "docs/deploy-project-contracts"
      ],
      Scripts: ["docs/execute-scripts"],
      Transactions: [
        "docs/send-transactions",
        "docs/get-transactions",
        "docs/build-transactions",
        "docs/sign-transaction",
        "docs/send-signed-transactions"
      ],
      "Get Flow data": [
        "docs/get-blocks",
        "docs/get-events",
        "docs/get-collections",
        "docs/get-status"
      ]
    }
  },
  {
    sourceInstanceName: "docs",
    patterns: ["concepts/*"],
    sidebarAlwaysExpanded: true,
    sidebar: {
      null: ["[Home](/)"],
      Concepts: [
        "concepts/accounts-and-keys",
        "concepts/transaction-signing",
        "concepts/storage"
      ],
      FAQ: [
        "[Builders/Developers](/faq/developers)",
        "[Backers/Users](/faq/backers)",
        "[Operators](/faq/operators)"
      ]
    }
  },
  {
    sourceInstanceName: "docs",
    patterns: ["dapp-development/*"],
    sidebarAlwaysExpanded: true,
    sidebar: {
      null: ["[Home](/)", "dapp-development/index"],
      "Building Your Dapp": [
        "dapp-development/flow-dapp-anatomy",
        "dapp-development/user-accounts-and-wallets",
        "dapp-development/in-dapp-payments",
        "dapp-development/smart-contracts",
        "dapp-development/dapp-infrastructure"
      ],
      "Deploying Your Dapp": [
        "dapp-development/deployment",
        "dapp-development/contract-testing",
        "dapp-development/testnet-deployment",
        "dapp-development/testnet-testing",
        "dapp-development/mainnet-deployment"
      ]
    }
  },
  {
    sourceInstanceName: "docs",
    patterns: ["fusd/*"],
    sidebarAlwaysExpanded: true,
    sidebar: {
      null: ["[Home](/)"],
      FUSD: ["fusd/index", "fusd/transactions", "fusd/providers"]
    }
  },
  {
    sourceInstanceName: "flow-go-sdk-github",
    patterns: ["docs/**/*"],
    sidebarAlwaysExpanded: true,
    sidebar: {
      null: ["[Home](/)"],
      Overview: ["[Introduction](/flow-go-sdk)"]
    }
  },
  {
    sourceInstanceName: "fcl-github",
    patterns: ["docs/**/*", "packages/**/*"],
    sidebarAlwaysExpanded: true,
    sidebar: {
      null: ["[Home](/)"],
      "API Documentation": [
        "[Quick Reference](/fcl/reference/api)",
        "[Configuration](/fcl/reference/configure-fcl)",
        "[Authentication](/fcl/reference/authentication)",
        "[Proving Account Ownership](/fcl/reference/proving-authentication)",
        "[Scripts](/fcl/reference/scripts)",
        "[Transactions](/fcl/reference/transactions)",
        "[User Signatures](/fcl/reference/user-signatures)"
      ],
      Changelogs: [
        "[@onflow/fcl](/fcl/packages/fcl/CHANGELOG)",
        "[@onflow/types](/fcl/packages/types/CHANGELOG)"
      ],
      "Guides and Tutorials": [
        "[Introducing @onflow/fcl](/fcl)",
        "docs/tutorials/flow-app-quickstart"
      ]
    }
  },
  {
    sourceInstanceName: "flow-js-testing-github",
    patterns: ["docs/**/*"],
    sidebarAlwaysExpanded: true,
    sidebar: {
      null: ["[Home](/)"],
      Overview: ["docs/api", "docs/examples"],
      Guides: [
        "docs/install",
        "docs/init",
        "docs/accounts",
        "docs/contracts",
        "docs/emulator",
        "docs/execute-scripts",
        "docs/flow-token",
        "docs/generator",
        "docs/jest-helpers",
        "docs/send-transactions",
        "docs/structure",
        "docs/templates",
        "docs/type"
      ]
    }
  },
  {
    sourceInstanceName: "docs",
    patterns: ["core-contracts/**/*"],
    sidebarAlwaysExpanded: true,
    sidebar: {
      null: ["[Home](/)"],
      "Core Contracts": [
        "core-contracts/fungible-token",
        "core-contracts/flow-token",
        "core-contracts/flow-fees",
        "core-contracts/staking-contract-reference",
        "core-contracts/epoch-contract-reference"
      ],
      "Other Important Contracts": [
        "core-contracts/locked-tokens",
        "core-contracts/staking-collection",
        "core-contracts/non-fungible-token"
      ]
    }
  },
  {
    sourceInstanceName: "docs",
    patterns: ["flow-token/**/*"],
    sidebarAlwaysExpanded: true,
    sidebar: {
      null: ["[Home](/)"],
      Overview: [
        "flow-token/index",
        "flow-token/available-wallets",
        "flow-token/earn",
        "flow-token/concepts",
        "flow-token/delivery",
        "flow-token/faq"
      ],
      "Token Delivery": ["flow-token/locked-account-setup"]
    }
  },
  {
    sourceInstanceName: "docs",
    patterns: ["staking/**/*"],
    sidebarAlwaysExpanded: true,
    sidebar: {
      null: ["[Home](/)"],
      Overview: [
        "staking/index",
        "staking/schedule",
        "staking/stake-slashing",
        "staking/faq"
      ],
      "Technical Docs": [
        "staking/epoch-terminology",
        "staking/epoch-preparation",
        "staking/epoch-scripts-events",
        "staking/technical-overview",
        "staking/staking-scripts-events",
        "staking/qc-dkg",
        "staking/qc-dkg-scripts-events",
        "staking/machine-account"
      ],
      "Technical Guides": [
        "staking/staking-options",
        "staking/staking-collection",
        "staking/unlocked-staking-guide",
        "staking/locked-staking-guide"
      ],
      "Custody Providers": ["staking/custody-providers"],
      FAQ: [
        "[Builders/Developers](/faq/developers)",
        "[Backers/Users](/faq/backers)",
        "[Operators](/faq/operators)"
      ]
    }
  },
  {
    sourceInstanceName: "docs",
    patterns: ["node-operation/**/*"],
    sidebarAlwaysExpanded: true,
    sidebar: {
      null: ["[Home](/)"],
      Overview: [
        "node-operation/index",
        "node-operation/node-setup",
        "node-operation/node-roles",
        "node-operation/faq"
      ],
      "Operator Guides": [
        "node-operation/node-bootstrap",
        "node-operation/machine-existing-operator",
        "node-operation/db-encryption-existing-operator",
        "node-operation/monitoring-nodes",
        "node-operation/full-observer-node",
        "node-operation/spork",
        "node-operation/past-sporks",
        "node-operation/upcoming-sporks"
      ]
    }
  },
  {
    sourceInstanceName: "flow-emulator-github",
    patterns: ["README.md"],
    sidebarAlwaysExpanded: true,
    sidebar: {
      null: ["[Home](/)"],
      Overview: ["emulator/"]
    }
  },
  {
    sourceInstanceName: "docs",
    patterns: ["vscode-extension/**/*"],
    sidebarAlwaysExpanded: true,
    sidebar: {
      null: ["[Home](/)"],
      Overview: ["vscode-extension/index"]
    }
  },
  {
    sourceInstanceName: "cadence-github",
    patterns: ["docs/language/**/*"],
    sidebarAlwaysExpanded: true,
    sidebar: {
      null: ["[Home](/)"],
      "Language Reference": [
        "docs/language/index",
        "docs/language/syntax",
        "docs/language/constants-and-variables",
        "docs/language/type-annotations",
        "docs/language/values-and-types",
        "docs/language/operators",
        "docs/language/functions",
        "docs/language/control-flow",
        "docs/language/scope",
        "docs/language/type-safety",
        "docs/language/type-inference",
        "docs/language/composite-types",
        "docs/language/resources",
        "docs/language/access-control",
        "docs/language/interfaces",
        "docs/language/enumerations",
        "docs/language/restricted-types",
        "docs/language/references",
        "docs/language/imports",
        "docs/language/accounts",
        "docs/language/capability-based-access-control",
        "docs/language/contracts",
        "docs/language/contract-updatability",
        "docs/language/events",
        "docs/language/core-events",
        "docs/language/transactions",
        "docs/language/run-time-types",
        "docs/language/built-in-functions",
        "docs/language/environment-information",
        "docs/language/crypto",
        "docs/language/type-hierarchy"
      ]
    }
  },
  {
    sourceInstanceName: "docs",
    patterns: ["faq/**/*"],
    sidebarAlwaysExpanded: true,
    sidebar: {
      null: ["[Home](/)"],
      FAQ: ["faq/developers", "faq/backers", "faq/operators"]
    }
  }
];

module.exports = {
  siteMetadata: {
    title: "Flow Documentation",
    siteUrl: `https://docs.onflow.org`
  },
  plugins: [
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://docs.onflow.org",
        sitemap: "https://docs.onflow.org/sitemap/sitemap-0.xml",
        env: {
          development: {
            policy: [{ userAgent: "*", disallow: ["/"] }]
          },
          production: {
            policy: [{ userAgent: "*", allow: "/" }]
          }
        }
      }
    },
    {
      resolve: "gatsby-plugin-breadcrumb",
      options: {
        title: "Navigation: ",
        useAutoGen: true,
        autoGenHomeLabel: "Home",
        crumbLabelUpdates: [
          {
            pathname: "/node-operation/faq",
            crumbLabel: "FAQ"
          },
          {
            pathname: "/sdks",
            crumbLabel: "SDKs"
          },
          {
            pathname: "/faq",
            crumbLabel: "FAQ"
          },
          {
            pathname: "/access-api",
            crumbLabel: "Access API"
          },
          {
            pathname: "/sdk-guidelines",
            crumbLabel: "SDK Guidelines"
          },

          {
            pathname: "/fcl/packages/fcl",
            crumbLabel: "FCL"
          },
          {
            pathname: "/fcl/packages/fcl-react",
            crumbLabel: "FCL + React"
          },
          {
            pathname: "/flow-token/faq",
            crumblabel: "FAQ"
          },
          {
            pathname: "/core-contracts/access-api",
            crumbLabel: "Access API"
          },
          {
            pathname: "/fcl",
            crumbLabel: "FCL"
          },
          {
            pathname: "/fcl",
            crumbLabel: "API Reference"
          },
          {
            pathname: "/flow-cli",
            crumbLabel: "Flow CLI"
          },
          {
            pathname: "/flow-go-sdk",
            crumbLabel: "Flow GO SDK"
          }
        ]
      }
    },
    {
      resolve: "gatsby-plugin-mixpanel",
      options: {
        apiToken: "3fae49de272be1ceb8cf34119f747073",
        enableOnDevMode: false
      }
    },
    {
      resolve: "gatsby-theme-flow",
      options: {
        navConfig,
        sources,
        siteName: "Flow Documentation",
        description: "Start Building in the Open",
        pageTitle: "Flow Docs",
        menuTitle: "Flow Ecosystem",
        gaTrackingId: "UA-156047066-4",
        algoliaApiKey: process.env.ALGOLIA_API_KEY,
        algoliaIndexName: "onflow",
        baseUrl: "https://docs.onflow.org",
        twitterUrl: "https://twitter.com/flow_blockchain",
        discordUrl: "https://discord.gg/flow",
        discourseUrl: "https://forum.onflow.org",
        logoLink: "/",
        root: __dirname,
        githubAccessToken: process.env.GITHUB_ACCESS_TOKEN, // https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token
        repositories: [{ owner: "onflow", name: "flow-go-sdk" }],
        sections,
        sourceGithubRepos,
        sourceSlugTransformers
      }
    }
  ]
};
