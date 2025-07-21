import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';

// הנתיב לתיקיית התמונות
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');

/**
 * שומר תמונה מבאפר בינארי לקובץ פיזי
 * @param buffer באפר של התמונה
 * @param filename שם הקובץ המקורי (לצורך הסיומת)
 * @returns נתיב יחסי לתמונה והנתיב המלא
 */
export async function saveImage(buffer: Buffer, filename: string): Promise<{ relativePath: string; fullPath: string }> {
  try {
    // יצירת שם קובץ ייחודי
    const extension = path.extname(filename);
    const uniqueFilename = `${uuidv4()}${extension}`;
    const relativePath = `/uploads/${uniqueFilename}`;
    const fullPath = path.join(UPLOADS_DIR, uniqueFilename);

    // עיבוד התמונה וכיווץ שלה
    const optimizedBuffer = await sharp(buffer)
      .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toBuffer();

    // שמירת התמונה
    await writeFile(fullPath, optimizedBuffer);

    return {
      relativePath,
      fullPath,
    };
  } catch (error) {
    console.error('שגיאה בשמירת התמונה:', error);
    throw new Error('שגיאה בשמירת התמונה');
  }
}

/**
 * יוצר URL מלא לתמונה
 * @param relativePath הנתיב היחסי לתמונה
 * @returns URL מלא לתמונה
 */
export function getFullImageUrl(relativePath: string): string {
  // בסביבת פיתוח נשתמש בכתובת המקומית
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  return `${baseUrl}${relativePath}`;
}
