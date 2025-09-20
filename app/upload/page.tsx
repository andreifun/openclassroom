import {CloudUpload} from "lucide-react";
import PDFUploader from "@/components/PDFUploader";
import {RedirectToSignIn, SignedIn, SignedOut} from "@clerk/nextjs";

export default function ViewPage() {
    return (
        <div className={"h-full w-full -mt-2 px-4"}>
            <SignedIn>
                {/*Page*/}
                <div className={"flex flex items-center row gap-2  mb-4"}><CloudUpload/><h1
                    className={"text-2xl font-bold"}>Upload a Document to Post</h1></div>
                <PDFUploader/>
            </SignedIn>
            <SignedOut>
                <h1>You Need to be SIgned in to do this.</h1>
                <RedirectToSignIn/>
            </SignedOut>
        </div>
    )
}