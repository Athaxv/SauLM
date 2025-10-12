import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET(_req: Request) {
  const session: any = await getServerSession(authOptions as any);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  let userId: string | undefined = session.user.id as string | undefined;
  if (!userId && session.user.email) {
    const byEmail = await prisma.user.findUnique({ where: { email: session.user.email as string }, select: { id: true } });
    userId = byEmail?.id;
  }
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true, name: true, email: true, image: true } });
  return NextResponse.json(user);
}

export async function PATCH(req: Request) {
  const session: any = await getServerSession(authOptions as any);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  let userId: string | undefined = session.user.id as string | undefined;
  if (!userId && session.user.email) {
    const byEmail = await prisma.user.findUnique({ where: { email: session.user.email as string }, select: { id: true } });
    userId = byEmail?.id;
  }
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { name, email, avatar } = body as { name?: string; email?: string; avatar?: string };

  if (!name || !email) return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });

  try {
    const updated = await prisma.user.update({ where: { id: userId }, data: { name, email, image: avatar } });
    return NextResponse.json({ ok: true, user: { id: updated.id, name: updated.name, email: updated.email, image: updated.image } });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}
