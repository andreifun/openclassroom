"use client";
import {CloudUpload} from "lucide-react";
import {RedirectToSignIn, SignedIn, SignedOut} from "@clerk/nextjs";
import { useTranslation } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/language-switcher";



export default function ViewPage() {
    const { t } = useTranslation();
    
    return (
        <div className={"h-full w-full -mt-2 px-4"}>
            <div className="flex justify-end mb-4">
                <LanguageSwitcher />
            </div>
            <SignedIn>
                {/*Page*/}
                <div className={"flex items-center gap-2 mb-4"}><CloudUpload/><h1
                    className={"text-2xl font-bold"}>{t('upload.title')}</h1></div>
                {/*<PDFUploader/>*/}
            </SignedIn>
            <SignedOut>
                <h1>{t('upload.signInRequired')}</h1>
                <RedirectToSignIn/>
            </SignedOut>
        </div>
    )
}