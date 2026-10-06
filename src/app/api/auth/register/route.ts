import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

export async function POST(req: Request) {
  try {
    const data = schema.parse(await req.json());
    const email = data.email.toLowerCase();
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return NextResponse.json(
        { error: "Dit e-mailadres is al geregistreerd." },
        { status: 409 },
      );
    }
    const passwordHash = await bcrypt.hash(data.password, 12);
    await prisma.user.create({
      data: {
        name: data.name,
        email,
        passwordHash,
        role: "USER",
      },
    });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Controleer naam, e-mail en wachtwoord." },
        { status: 400 },
      );
    }
    return NextResponse.json({ error: "Serverfout." }, { status: 500 });
  }
}
