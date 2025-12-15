import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {getMessages} from 'next-intl/server';
import { Header } from '../components/header/header';
import { Footer } from '../components/footer/Footer';
import { ThemeProvider } from '../components/theme/themeprovider';
import { Toaster } from "sonner";

import "../globals.css";

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}   suppressHydrationWarning>
      <body>
        <ThemeProvider   attribute="class"
          defaultTheme="system"
          enableSystem>
        <NextIntlClientProvider  messages={messages}>
          <Header />
          <Toaster position="bottom-right" richColors closeButton />

          {children}
          <Footer />
        </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
