import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { useRouter, notFound, redirect } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { routing } from '@web/i18n/routing';
import { auth0 } from '@web/lib/auth0';

import { MainMenu } from './_components/MainMenu';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Furnio',
  description: 'Assets, efficiency, green!',
};

export type LocaleLayoutProps = Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>;
export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  const session = await auth0.getSession();

  if (!session) {
    return redirect('/auth/login');
  }
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <div className="flex flex-row h-full">
            <MainMenu />
            <main className="flex-1 overflow-y-auto bg-[#F9FAFC]">
              {children}
            </main>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}