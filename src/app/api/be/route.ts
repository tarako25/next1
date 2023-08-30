import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DB(){
    try {
        await prisma.$connect();
    } catch (error) {
        return Error("DB接続に失敗しました")
    }
}
export async function GET (req: Request, res:NextResponse){
    try {
        await DB();
        const posts = await prisma.post.findMany();
        return NextResponse.json({ message: "Success", posts}, {status: 200});
    } catch (err) {
        return NextResponse.json({ message: "Error", err}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
};

export async function POST (req: Request, res:NextResponse){
    try {
        const message = await req.json();
        await DB();
        const post = await prisma.post.create({ data: message });
        return NextResponse.json({ message: "Success", post}, {status: 201});
    } catch (err) {
        return NextResponse.json({ message: "Error", err}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}

export async function DELETE (req: Request, res:NextResponse){
    try {
        const noString = await req.json();
        const no = parseInt(noString);
        await DB();
        const post = await prisma.post.delete({
            where: { id:no },
        });
        return NextResponse.json({ message: "Success", post }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}