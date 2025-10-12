import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST() {
  const session: any = await getServerSession(authOptions as any);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  let userId: string | undefined = session.user.id as string | undefined;
  if (!userId && session.user.email) {
    const byEmail = await prisma.user.findUnique({ where: { email: session.user.email as string }, select: { id: true } });
    userId = byEmail?.id;
  }
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // For DB sessions (if used), remove them
  await prisma.session.deleteMany({ where: { userId } });
  // For JWT sessions, mark a global invalidation timestamp
  await prisma.user.update({ where: { id: userId }, data: { sessionInvalidatedAt: new Date() } });
  return NextResponse.json({ ok: true });
}
