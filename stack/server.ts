import "server-only";
import { StackServerApp } from "@stackframe/stack";
import { stackClientApp } from "./client";
import { prisma } from "@/lib/prisma";

export const stackServerApp = new StackServerApp({
  inheritsFrom: stackClientApp,
});

export async function syncUser() {
  const user = await stackServerApp.getUser();

  if (!user) return null;

  const dbUser = await prisma.user.upsert({
    where: {
      stackUserId: user.id,
    },
    update: {
      email: user.primaryEmail!,
      displayName: user.displayName,
    },
    create: {
      stackUserId: user.id,
      email: user.primaryEmail!,
      displayName: user.displayName,
    },
  });

  return dbUser;
}
