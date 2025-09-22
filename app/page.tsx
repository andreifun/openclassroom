"use client";
import {SidebarProvider} from "@/components/ui/sidebar-provider";
import {SignedIn, SignedOut} from "@clerk/nextjs";
import Logo from "@/components/ui/logo";
import {useTranslation} from "@/lib/i18n";
import {Button} from "@/components/ui/button";
import OcLogo from "@/components/ui/oclogo";
import {LanguageSwitcher} from "@/components/language-switcher";

export default function Home() {
  const { t } = useTranslation();
    return (
      <main>
          <SignedIn>
              <SidebarProvider>
                  <div>
                      <h1>Hello World</h1>
                  </div>
              </SidebarProvider>
          </SignedIn>
          <SignedOut>
              <div className={"flex flex-col items-center justify-center w-screen h-screen gap-4"}>
                  <OcLogo/>
                  <h1 className={"text-2xl"}>{t('account.required')}</h1>
                  <div className={"flex flex-row gap-2"}>
                      <Button>{t('account.signin')}</Button>
                      <Button variant={"outline"}>{t('account.signup')}</Button>
                  </div>
                  <div className={"fixed bottom-6"}>
                      <LanguageSwitcher/>
                  </div>
              </div>
          </SignedOut>
      </main>

      )
    
}