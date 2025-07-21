import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, email, password, fullName } = body;

    if (!username || !email || !password || !fullName) {
      return NextResponse.json(
        { message: "חסרים פרטים נדרשים" },
        { status: 400 }
      );
    }

    // בדיקה אם המשתמש כבר קיים
    const existingUserByUsername = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUserByUsername) {
      return NextResponse.json(
        { message: "שם המשתמש כבר תפוס" },
        { status: 400 }
      );
    }

    const existingUserByEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        { message: "כתובת האימייל כבר בשימוש" },
        { status: 400 }
      );
    }

    // הצפנת הסיסמה
    const hashedPassword = await bcrypt.hash(password, 12);

    // יצירת משתמש חדש
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        fullName,
        profileImage: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`, // תמונת פרופיל ברירת מחדל
      },
    });

    // לא מחזירים את הסיסמה בתשובה
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        message: "המשתמש נוצר בהצלחה",
        user: userWithoutPassword,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("שגיאה בהרשמה:", error);
    return NextResponse.json(
      { message: "אירעה שגיאה בהרשמה" },
      { status: 500 }
    );
  }
}
