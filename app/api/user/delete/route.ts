import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function DELETE() {
  const session: any = await getServerSession(authOptions as any);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let userId: string | undefined = session.user.id as string | undefined;
  if (!userId && session.user.email) {
    const byEmail = await prisma.user.findUnique({ where: { email: session.user.email as string }, select: { id: true } });
    userId = byEmail?.id;
  }
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const uid = userId as string;
  await prisma.account.deleteMany({ where: { userId: uid } });
  await prisma.session.deleteMany({ where: { userId: uid } });
  await prisma.chatSession.deleteMany({ where: { userId: uid } });
  await prisma.document.deleteMany({ where: { userId: uid } });
  await prisma.user.delete({ where: { id: uid } });

  return NextResponse.json({ ok: true });
}
