// Try to use the project's generated Prisma client (output by `prisma generate`)
// which in this project lives under lib/generated/prisma. This client will
// include the compiled query engine binaries the runtime expects. If that
// isn't present, fall back to the installed @prisma/client package.
// Use runtime require to avoid build-time module resolution issues.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let PrismaClientImpl: any
try {
  // prefer generated client
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  PrismaClientImpl = require("./generated/prisma").PrismaClient
} catch (e) {
  // fallback to installed package
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  PrismaClientImpl = require("@prisma/client").PrismaClient
}

type PrismaClientType = InstanceType<typeof PrismaClientImpl>

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClientType | undefined
}

export const prisma: PrismaClientType = global.prisma ?? new PrismaClientImpl()

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma
}



