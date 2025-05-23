import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

// データベースに接続する関数
const connect = async () => {
  try {
    //prismaでデータベースに接続
    await prisma.$connect();
  } catch (error) {
    return Error("DB接続失敗しました");
  }
};

// データベースからデータを取得する
export const GET = async (req: Request) => {
  try {
    await connect();
    // データベースからレシピを取得
    const recipes = await prisma.recipe.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(recipes);
  } catch (error) {
    return NextResponse.json({ messeage: "Error" }, { status: 500 });
  } finally {
    //必ず実行する
    await prisma.$disconnect();
  }
};

export const POST = async (req: Request) => {
  const { title, quantity, ingredients, url } = await req.json();
  try {
    await connect();
    if (!title || !quantity || !ingredients || !url) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    // データベースにレシピを保存
    const recipe = await prisma.recipe.create({
      data: {
        title,
        quantity,
        ingredients,
        url,
        // lastCooked, createdAtはデフォルト値があるので省略OK
      },
    });
    return NextResponse.json(recipe);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// export async function POST(req: Request) {
//   try {
//     const { title, portion, csv } = await req.json();
//     if (!title || !portion || !csv) {
//       return NextResponse.json({ error: "Missing fields" }, { status: 400 });
//     }
//     const recipe = await prisma.recipe.create({
//       data: { title, portion, csv },
//     });
//     return NextResponse.json(recipe);
//   } catch (e) {
//     console.error(e);
//     return NextResponse.json({ error: String(e) }, { status: 500 });
//   }
// }

// export async function GET() {
//   try {
//     const recipes = await prisma.recipe.findMany({
//       orderBy: { createdAt: "desc" },
//     });
//     return NextResponse.json(recipes);
//   } catch (e) {
//     console.error(e);
//     return NextResponse.json({ error: String(e) }, { status: 500 });
//   }
// }
