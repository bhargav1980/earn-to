
type Question = {
  text: string;
  options: string[];
  correctOption: number;
};

type Quiz = {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  timeLimit: number; // in minutes
  reward: number; // tokens
  questions: Question[];
};

export const quizzes: Quiz[] = [
  {
    id: "blockchain-basics",
    title: "Blockchain Basics",
    description: "Learn the fundamentals of blockchain technology and how it works.",
    difficulty: "beginner",
    timeLimit: 15,
    reward: 5,
    questions: [
      {
        text: "What is a blockchain?",
        options: [
          "A type of cryptocurrency",
          "A distributed database or ledger that is shared among nodes of a computer network",
          "A programming language for smart contracts",
          "A type of cloud storage solution"
        ],
        correctOption: 1
      },
      {
        text: "Which of the following is NOT a characteristic of blockchain technology?",
        options: [
          "Decentralization",
          "Immutability",
          "Centralized control",
          "Transparency"
        ],
        correctOption: 2
      },
      {
        text: "What is a block in a blockchain?",
        options: [
          "A unit of storage that holds a collection of transactions",
          "A type of cryptocurrency wallet",
          "A password to access the blockchain",
          "A software tool for mining cryptocurrencies"
        ],
        correctOption: 0
      },
      {
        text: "What is the purpose of consensus mechanisms in blockchain?",
        options: [
          "To encrypt transactions",
          "To store user data",
          "To agree on the state of the blockchain without a central authority",
          "To create new cryptocurrencies"
        ],
        correctOption: 2
      },
      {
        text: "Which of the following is the first and most well-known blockchain-based cryptocurrency?",
        options: [
          "Ethereum",
          "Bitcoin",
          "Aptos",
          "Ripple"
        ],
        correctOption: 1
      }
    ]
  },
  {
    id: "aptos-introduction",
    title: "Introduction to Aptos",
    description: "Learn about the Aptos blockchain and its unique features.",
    difficulty: "beginner",
    timeLimit: 20,
    reward: 7.5,
    questions: [
      {
        text: "What programming language is used for Aptos smart contracts?",
        options: [
          "Solidity",
          "Python",
          "Move",
          "JavaScript"
        ],
        correctOption: 2
      },
      {
        text: "Which consensus mechanism does Aptos use?",
        options: [
          "Proof of Work (PoW)",
          "Proof of Stake (PoS)",
          "Proof of History (PoH)",
          "Byzantine Fault Tolerance (BFT)"
        ],
        correctOption: 3
      },
      {
        text: "What is a key focus of the Aptos blockchain?",
        options: [
          "Supporting only NFTs",
          "High scalability and security",
          "Mining optimization",
          "Centralized control"
        ],
        correctOption: 1
      },
      {
        text: "What is APT?",
        options: [
          "The programming environment for Aptos",
          "A blockchain explorer for Aptos",
          "The native token of the Aptos blockchain",
          "An Aptos integration testing framework"
        ],
        correctOption: 2
      },
      {
        text: "Which of the following is a key feature of the Move language used in Aptos?",
        options: [
          "It's based on JavaScript",
          "It prioritizes safety and security for digital assets",
          "It only supports simple token transfers",
          "It's identical to Ethereum's Solidity language"
        ],
        correctOption: 1
      },
      {
        text: "What distinguishes Aptos from earlier blockchain platforms?",
        options: [
          "It doesn't support smart contracts",
          "It can only be used for NFTs",
          "It focuses on high performance and developer experience",
          "It uses the same technology as Bitcoin"
        ],
        correctOption: 2
      }
    ]
  },
  {
    id: "crypto-wallets",
    title: "Understanding Crypto Wallets",
    description: "Learn about different types of crypto wallets and how to secure your assets.",
    difficulty: "beginner",
    timeLimit: 15,
    reward: 5,
    questions: [
      {
        text: "What is a cryptocurrency wallet?",
        options: [
          "A physical wallet to store coins",
          "A software or hardware tool that stores private keys to access cryptocurrency",
          "A bank account for digital currencies",
          "An exchange where you can trade cryptocurrencies"
        ],
        correctOption: 1
      },
      {
        text: "Which of the following is NOT a type of cryptocurrency wallet?",
        options: [
          "Hardware wallet",
          "Paper wallet",
          "Mining wallet",
          "Mobile wallet"
        ],
        correctOption: 2
      },
      {
        text: "What is a private key in cryptocurrency?",
        options: [
          "A password to login to an exchange",
          "A special code that allows you to access and manage your cryptocurrency",
          "The wallet address where you receive cryptocurrency",
          "The blockchain explorer that tracks transactions"
        ],
        correctOption: 1
      },
      {
        text: "What is a seed phrase (recovery phrase)?",
        options: [
          "A backup of your private keys, usually in the form of 12-24 words",
          "Your wallet's username",
          "The transaction history of your wallet",
          "A password hint for your wallet"
        ],
        correctOption: 0
      },
      {
        text: "Which is generally considered the most secure type of crypto wallet?",
        options: [
          "Exchange wallet",
          "Mobile wallet",
          "Hardware wallet",
          "Web wallet"
        ],
        correctOption: 2
      }
    ]
  },
  {
    id: "defi-concepts",
    title: "DeFi Fundamentals",
    description: "Understand the basics of Decentralized Finance and its applications.",
    difficulty: "intermediate",
    timeLimit: 25,
    reward: 10,
    questions: [
      {
        text: "What does DeFi stand for?",
        options: [
          "Digital Finance",
          "Decentralized Finance",
          "Distributed Funding",
          "Direct Financial Instruments"
        ],
        correctOption: 1
      },
      {
        text: "Which of the following is NOT a common DeFi application?",
        options: [
          "Lending and borrowing platforms",
          "Decentralized exchanges (DEXs)",
          "Centralized payment processors",
          "Yield farming"
        ],
        correctOption: 2
      },
      {
        text: "What are liquidity pools in DeFi?",
        options: [
          "Pools of water used to cool mining equipment",
          "Banks that provide loans to DeFi projects",
          "Crypto reserves locked in smart contracts that facilitate trading, lending, etc.",
          "Groups of developers working on DeFi projects"
        ],
        correctOption: 2
      },
      {
        text: "What is yield farming?",
        options: [
          "Mining cryptocurrencies with specialized hardware",
          "Providing liquidity to DeFi platforms to earn rewards",
          "Growing physical crops and selling them for cryptocurrency",
          "Creating new DeFi protocols"
        ],
        correctOption: 1
      },
      {
        text: "What is an automated market maker (AMM)?",
        options: [
          "A robot that trades on traditional stock markets",
          "A type of decentralized exchange that uses algorithms and liquidity pools",
          "A person who manages cryptocurrency portfolios",
          "Software that predicts market movements"
        ],
        correctOption: 1
      },
      {
        text: "What are stablecoins?",
        options: [
          "Cryptocurrencies designed to maintain a stable value, often pegged to a fiat currency",
          "Cryptocurrencies with low volatility",
          "Digital currencies issued by central banks",
          "Tokens that can only be used on one specific platform"
        ],
        correctOption: 0
      },
      {
        text: "What is 'impermanent loss' in DeFi?",
        options: [
          "When your private keys are temporarily lost",
          "A temporary ban from using a DeFi platform",
          "The loss of value liquidity providers face when asset prices in a pool change",
          "When a DeFi platform is temporarily offline"
        ],
        correctOption: 2
      }
    ]
  },
  {
    id: "smart-contracts",
    title: "Smart Contracts Deep Dive",
    description: "Learn about smart contracts, their applications, and security considerations.",
    difficulty: "intermediate",
    timeLimit: 30,
    reward: 12.5,
    questions: [
      {
        text: "What is a smart contract?",
        options: [
          "A legal agreement between two cryptocurrency exchanges",
          "Self-executing code with the terms of an agreement directly written into code",
          "A contract to purchase mining equipment",
          "A paper contract verified by blockchain timestamps"
        ],
        correctOption: 1
      },
      {
        text: "Which of the following is a characteristic of smart contracts?",
        options: [
          "They require intermediaries to execute",
          "They cannot be automated",
          "They are immutable once deployed",
          "They can only handle simple transactions"
        ],
        correctOption: 2
      },
      {
        text: "What are oracles in the context of smart contracts?",
        options: [
          "Expert programmers who code smart contracts",
          "Services that provide external data to smart contracts",
          "Testing frameworks for smart contracts",
          "Security auditors for blockchain code"
        ],
        correctOption: 1
      },
      {
        text: "Which of the following is a common security vulnerability in smart contracts?",
        options: [
          "Reentrancy attacks",
          "Firewall bypassing",
          "Database injection",
          "Kernel exploits"
        ],
        correctOption: 0
      },
      {
        text: "What is 'gas' in the context of smart contracts?",
        options: [
          "A cryptocurrency used to power certain blockchains",
          "A fee paid to execute operations on some blockchains",
          "A type of token issued by smart contracts",
          "A measurement of smart contract complexity"
        ],
        correctOption: 1
      },
      {
        text: "What is a key difference between Move (used in Aptos) and other smart contract languages?",
        options: [
          "Move cannot create tokens",
          "Move doesn't support conditionals",
          "Move has a resource-oriented programming model focused on secure asset management",
          "Move can only be written in assembly language"
        ],
        correctOption: 2
      },
      {
        text: "Why is testing important for smart contracts?",
        options: [
          "It's not important; smart contracts are automatically secure",
          "Only to check for speed optimization",
          "Because once deployed, contracts are difficult or impossible to modify",
          "Only to satisfy regulatory requirements"
        ],
        correctOption: 2
      },
      {
        text: "What is a smart contract audit?",
        options: [
          "An automated process to deploy contracts",
          "A comprehensive review of smart contract code to identify bugs and security issues",
          "A government regulation for blockchain developers",
          "A way to measure the performance of smart contracts"
        ],
        correctOption: 1
      }
    ]
  },
  {
    id: "tokenomics",
    title: "Understanding Tokenomics",
    description: "Explore the economic principles behind cryptocurrency token design and distribution.",
    difficulty: "advanced",
    timeLimit: 30,
    reward: 15,
    questions: [
      {
        text: "What is 'tokenomics'?",
        options: [
          "The study of physical cryptocurrency coins",
          "The economic design and principles governing a cryptocurrency token",
          "The process of converting fiat currency to tokens",
          "The marketing strategy for promoting a new token"
        ],
        correctOption: 1
      },
      {
        text: "What is token velocity?",
        options: [
          "How fast a token increases in price",
          "The frequency at which a token changes hands within a given time period",
          "The speed at which new tokens are created",
          "How quickly a token can be converted to fiat currency"
        ],
        correctOption: 1
      },
      {
        text: "What is a token burning mechanism?",
        options: [
          "Permanently removing tokens from circulation to reduce supply",
          "A mining process that uses excessive energy",
          "Converting one token into another",
          "Locking tokens for a specific time period"
        ],
        correctOption: 0
      },
      {
        text: "What is a token emission schedule?",
        options: [
          "The carbon footprint of creating tokens",
          "A plan for how and when new tokens will be released into circulation",
          "The process of listing a token on exchanges",
          "The energy efficiency rating of a token"
        ],
        correctOption: 1
      },
      {
        text: "What is a deflationary token model?",
        options: [
          "A token that loses value over time",
          "A token designed to decrease in total supply over time",
          "A token tied to a country's inflation rate",
          "A token that cannot be used during economic downturns"
        ],
        correctOption: 1
      },
      {
        text: "What is a utility token?",
        options: [
          "A token that represents ownership in a company",
          "A token that gives access to a specific product or service",
          "A token used exclusively for payments",
          "A token backed by physical assets"
        ],
        correctOption: 1
      },
      {
        text: "What is a governance token?",
        options: [
          "A token issued by governments",
          "A token that gives holders voting rights in a protocol's decision-making",
          "A token used exclusively for identity verification",
          "A token that cannot be traded on exchanges"
        ],
        correctOption: 1
      },
      {
        text: "What is a token vesting schedule?",
        options: [
          "A timeline determining when token owners can access and sell their tokens",
          "A plan for burning tokens over time",
          "The schedule for airdropping tokens to new users",
          "A marketing calendar for token promotion"
        ],
        correctOption: 0
      },
      {
        text: "What is meant by 'token distribution'?",
        options: [
          "Only the initial sale of tokens",
          "How tokens are allocated among various stakeholders (team, investors, community, etc.)",
          "The geographic spread of token holders",
          "The process of sending tokens to exchanges"
        ],
        correctOption: 1
      },
      {
        text: "Which of the following best describes a 'fair launch' in tokenomics?",
        options: [
          "When tokens are distributed equally to all participants",
          "When a token launches on multiple exchanges simultaneously",
          "A token distribution with no pre-mine, pre-sale or team allocation",
          "When the token price is determined by market forces only"
        ],
        correctOption: 2
      }
    ]
  },
  {
    id: "nft-fundamentals",
    title: "NFT Fundamentals",
    description: "Learn about Non-Fungible Tokens, their use cases, and the technology behind them.",
    difficulty: "intermediate",
    timeLimit: 20,
    reward: 10,
    questions: [
      {
        text: "What does NFT stand for?",
        options: [
          "New Financial Technology",
          "Non-Fungible Token",
          "Network File Transfer",
          "Normalized Fund Transaction"
        ],
        correctOption: 1
      },
      {
        text: "What makes an NFT 'non-fungible'?",
        options: [
          "It can't be transferred between wallets",
          "It's not based on blockchain technology",
          "It's unique and cannot be replaced with something else of equal value",
          "It doesn't have any monetary value"
        ],
        correctOption: 2
      },
      {
        text: "Which of the following is NOT a common use case for NFTs?",
        options: [
          "Digital art and collectibles",
          "Event tickets and memberships",
          "Privacy-focused cryptocurrency transactions",
          "Virtual real estate in metaverse platforms"
        ],
        correctOption: 2
      },
      {
        text: "Where is metadata for NFTs typically stored?",
        options: [
          "Only on the blockchain itself",
          "In the NFT marketplace's database",
          "Often on IPFS or similar decentralized storage systems",
          "Only on the creator's personal computer"
        ],
        correctOption: 2
      },
      {
        text: "What is a 'gas fee' in the context of NFTs?",
        options: [
          "A fee paid to the NFT creator",
          "A transaction fee paid to mint or transfer an NFT on the blockchain",
          "A subscription fee for NFT marketplaces",
          "A fee for viewing NFT content"
        ],
        correctOption: 1
      },
      {
        text: "What is 'minting' an NFT?",
        options: [
          "The process of creating a new NFT on the blockchain",
          "Converting an NFT back to cryptocurrency",
          "Selling an NFT for the first time",
          "Transferring ownership of an NFT"
        ],
        correctOption: 0
      },
      {
        text: "What are royalties in the context of NFTs?",
        options: [
          "Special perks given to NFT owners",
          "Fees paid to NFT marketplaces",
          "Fees paid to original creators for secondary sales of their NFTs",
          "Governance rights over the NFT's blockchain"
        ],
        correctOption: 2
      }
    ]
  },
  {
    id: "crypto-security",
    title: "Cryptocurrency Security Best Practices",
    description: "Learn how to secure your cryptocurrency holdings and protect against common threats.",
    difficulty: "intermediate",
    timeLimit: 25,
    reward: 10,
    questions: [
      {
        text: "What is a phishing attack in cryptocurrency?",
        options: [
          "Using specialized computers to mine faster than others",
          "Attempting to trick users into revealing private keys or sending crypto to fraudulent addresses",
          "Breaking the encryption of a blockchain",
          "Creating fake cryptocurrencies"
        ],
        correctOption: 1
      },
      {
        text: "Which of the following is a best practice for securing cryptocurrency?",
        options: [
          "Storing all your assets on exchanges",
          "Sharing your seed phrase with trusted friends as backup",
          "Using a hardware wallet for significant holdings",
          "Using the same password for all your crypto accounts"
        ],
        correctOption: 2
      },
      {
        text: "What is a 'dusting attack'?",
        options: [
          "When hackers use old computers ('dust collectors') to attack networks",
          "Sending tiny amounts of crypto to wallets to track their activity and break anonymity",
          "Creating large amounts of dust-sized physical cryptocurrency",
          "When exchanges deliberately slow down transactions"
        ],
        correctOption: 1
      },
      {
        text: "What is two-factor authentication (2FA)?",
        options: [
          "Having two different passwords for the same account",
          "Using two different cryptocurrencies for one transaction",
          "A security method requiring two different forms of identification before access is granted",
          "Using two different wallets for storing the same cryptocurrency"
        ],
        correctOption: 2
      },
      {
        text: "What is a hardware wallet?",
        options: [
          "A wallet made of metal to store physical bitcoins",
          "A physical device specifically designed to store cryptocurrency private keys",
          "A wallet that requires powerful hardware to function",
          "An exchange account with enhanced security"
        ],
        correctOption: 1
      },
      {
        text: "What is a 'rug pull' in cryptocurrency?",
        options: [
          "A type of hardware wallet",
          "A scam where developers abandon a project and run away with investor funds",
          "A security feature in crypto wallets",
          "A technique for recovering lost cryptocurrencies"
        ],
        correctOption: 1
      },
      {
        text: "What should you do if you receive unexpected tokens in your wallet?",
        options: [
          "Immediately transfer them to another wallet",
          "Be cautious - it could be a scam like an airdrop scam or dusting attack",
          "Try to sell them immediately for profit",
          "Share your success on social media"
        ],
        correctOption: 1
      },
      {
        text: "Which of the following is NOT recommended for backup of wallet recovery phrases?",
        options: [
          "Writing the phrase on paper and storing in a secure location",
          "Using a metal backup to protect against fire and water damage",
          "Storing the phrase in a password manager or encrypted file",
          "Saving a photo of your recovery phrase in cloud storage"
        ],
        correctOption: 3
      }
    ]
  }
];
