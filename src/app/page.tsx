import { redirect } from 'next/navigation';

export default function Home() {
  // בדף הראשי אנחנו מפנים את המשתמש לדף ההתחברות
  // בעתיד נוכל להוסיף כאן בדיקה אם המשתמש מחובר ולהפנות אותו לדף הפיד
  redirect('/login');
}
