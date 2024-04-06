import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const username = body.Username
        const email = body.UserEmail
        const password = body.UserPassword
        const existingEmail = await prisma.msUser.findFirst({
            where: { UserEmail: email }
        })
        if (existingEmail) {
            return NextResponse.json({ User: null, message: "Email registered" }, { status: 401 })
        }
        const existingUsername = await prisma.msUser.findFirst({
            where:{Username: username}
        })
        if (existingUsername) {
            return NextResponse.json({ User: null, message: "Username registered" }, { status: 401 })
        }
        const newUser = await prisma.msUser.create({
            data: {
                Username: username,
                UserEmail: email,
                UserPassword: password
            }
        })
        return NextResponse.json({ User: newUser, message: "User inserted to db" }, { status: 201 })
    } catch (error) {

    }
}