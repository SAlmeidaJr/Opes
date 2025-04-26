
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime,
  createParam,
} = require('./runtime/edge.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}





/**
 * Enums
 */
exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  name: 'name',
  password: 'password'
};

exports.Prisma.WalletScalarFieldEnum = {
  id: 'id',
  balance: 'balance',
  userId: 'userId'
};

exports.Prisma.TransactionScalarFieldEnum = {
  id: 'id',
  transactionType: 'transactionType',
  usage: 'usage',
  cost: 'cost',
  timestamp: 'timestamp',
  walletId: 'walletId'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};
exports.TransactionType = exports.$Enums.TransactionType = {
  DEPOSIT: 'DEPOSIT',
  WITHDRAW: 'WITHDRAW'
};

exports.TypeUse = exports.$Enums.TypeUse = {
  GROCERIES: 'GROCERIES',
  SNACKS: 'SNACKS',
  RESTAURANTS: 'RESTAURANTS',
  COFFEE: 'COFFEE',
  SHOPPING: 'SHOPPING',
  SUBSCRIPTIONS: 'SUBSCRIPTIONS',
  PHARMACY: 'PHARMACY',
  PETS: 'PETS',
  GIFTS: 'GIFTS',
  MOBILITY: 'MOBILITY',
  FUEL: 'FUEL',
  MAINTENANCE: 'MAINTENANCE',
  PARKING: 'PARKING',
  RENT: 'RENT',
  UTILITIES: 'UTILITIES',
  CLEANING: 'CLEANING',
  SUPPLIES: 'SUPPLIES',
  COURSES: 'COURSES',
  COWORKING: 'COWORKING',
  BANK_FEES: 'BANK_FEES',
  LOANS: 'LOANS',
  INVESTMENTS: 'INVESTMENTS',
  INCIDENTS: 'INCIDENTS',
  INSURANCE: 'INSURANCE',
  TRAVEL: 'TRAVEL',
  ENTERTAINMENT: 'ENTERTAINMENT',
  EXTRAS: 'EXTRAS'
};

exports.Prisma.ModelName = {
  User: 'User',
  Wallet: 'Wallet',
  Transaction: 'Transaction'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "f:\\projectJS\\server_admin\\generated\\prisma",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      }
    ],
    "previewFeatures": [],
    "sourceFilePath": "f:\\projectJS\\server_admin\\prisma\\schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../.env"
  },
  "relativePath": "../../prisma",
  "clientVersion": "6.6.0",
  "engineVersion": "f676762280b54cd07c770017ed3711ddde35f37a",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "mongodb",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "datasource db {\n  provider = \"mongodb\"\n  url      = env(\"DATABASE_URL\")\n}\n\ngenerator client {\n  provider = \"prisma-client-js\"\n  output   = \"../generated/prisma\"\n}\n\nmodel User {\n  id       String  @id @default(auto()) @map(\"_id\") @db.ObjectId\n  email    String  @unique\n  name     String\n  password String\n  wallet   Wallet?\n}\n\nmodel Wallet {\n  id           String        @id @default(auto()) @map(\"_id\") @db.ObjectId\n  balance      Float         @default(0)\n  transactions Transaction[]\n  user         User          @relation(fields: [userId], references: [id])\n  userId       String        @unique @db.ObjectId\n}\n\nmodel Transaction {\n  id              String          @id @default(auto()) @map(\"_id\") @db.ObjectId\n  transactionType TransactionType\n  usage           TypeUse\n  cost            Float\n  timestamp       DateTime        @default(now())\n  wallet          Wallet          @relation(fields: [walletId], references: [id])\n  walletId        String          @db.ObjectId\n\n  @@index([timestamp])\n  @@index([usage])\n}\n\nenum TransactionType {\n  DEPOSIT\n  WITHDRAW\n}\n\nenum TypeUse {\n  // Alimentação\n  GROCERIES\n  SNACKS\n  RESTAURANTS\n  COFFEE\n\n  // Compras e Gastos Gerais\n  SHOPPING\n  SUBSCRIPTIONS\n  PHARMACY\n  PETS\n  GIFTS\n\n  // Transporte e Mobilidade\n  MOBILITY\n  FUEL\n  MAINTENANCE\n  PARKING\n\n  // Moradia\n  RENT\n  UTILITIES\n  CLEANING\n\n  // Trabalho / Educação\n  SUPPLIES\n  COURSES\n  COWORKING\n\n  // Financeiro\n  BANK_FEES\n  LOANS\n  INVESTMENTS\n\n  // Emergências e Imprevistos\n  INCIDENTS\n  INSURANCE\n\n  // Lazer e Extras\n  TRAVEL\n  ENTERTAINMENT\n  EXTRAS\n}\n",
  "inlineSchemaHash": "0d1c637a8ce29e347022150fb1890aa645b8102d98588def1777ffff562103f1",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"dbName\":\"_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":[\"ObjectId\",[]],\"default\":{\"name\":\"auto\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"password\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"wallet\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Wallet\",\"nativeType\":null,\"relationName\":\"UserToWallet\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Wallet\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"dbName\":\"_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":[\"ObjectId\",[]],\"default\":{\"name\":\"auto\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"balance\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Float\",\"nativeType\":null,\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"transactions\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Transaction\",\"nativeType\":null,\"relationName\":\"TransactionToWallet\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"nativeType\":null,\"relationName\":\"UserToWallet\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"ObjectId\",[]],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Transaction\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"dbName\":\"_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":[\"ObjectId\",[]],\"default\":{\"name\":\"auto\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"transactionType\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TransactionType\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"usage\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TypeUse\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cost\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"timestamp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"wallet\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Wallet\",\"nativeType\":null,\"relationName\":\"TransactionToWallet\",\"relationFromFields\":[\"walletId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"walletId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"ObjectId\",[]],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"TransactionType\":{\"values\":[{\"name\":\"DEPOSIT\",\"dbName\":null},{\"name\":\"WITHDRAW\",\"dbName\":null}],\"dbName\":null},\"TypeUse\":{\"values\":[{\"name\":\"GROCERIES\",\"dbName\":null},{\"name\":\"SNACKS\",\"dbName\":null},{\"name\":\"RESTAURANTS\",\"dbName\":null},{\"name\":\"COFFEE\",\"dbName\":null},{\"name\":\"SHOPPING\",\"dbName\":null},{\"name\":\"SUBSCRIPTIONS\",\"dbName\":null},{\"name\":\"PHARMACY\",\"dbName\":null},{\"name\":\"PETS\",\"dbName\":null},{\"name\":\"GIFTS\",\"dbName\":null},{\"name\":\"MOBILITY\",\"dbName\":null},{\"name\":\"FUEL\",\"dbName\":null},{\"name\":\"MAINTENANCE\",\"dbName\":null},{\"name\":\"PARKING\",\"dbName\":null},{\"name\":\"RENT\",\"dbName\":null},{\"name\":\"UTILITIES\",\"dbName\":null},{\"name\":\"CLEANING\",\"dbName\":null},{\"name\":\"SUPPLIES\",\"dbName\":null},{\"name\":\"COURSES\",\"dbName\":null},{\"name\":\"COWORKING\",\"dbName\":null},{\"name\":\"BANK_FEES\",\"dbName\":null},{\"name\":\"LOANS\",\"dbName\":null},{\"name\":\"INVESTMENTS\",\"dbName\":null},{\"name\":\"INCIDENTS\",\"dbName\":null},{\"name\":\"INSURANCE\",\"dbName\":null},{\"name\":\"TRAVEL\",\"dbName\":null},{\"name\":\"ENTERTAINMENT\",\"dbName\":null},{\"name\":\"EXTRAS\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined
config.compilerWasm = undefined

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

