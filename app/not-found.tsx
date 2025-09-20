import {SidebarProvider} from "@/components/ui/sidebar-provider";
import {X, FileX} from "lucide-react";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import React from "react";
import {Button} from "@/components/ui/button";

export default function FourOhFour() {
    return (
        <div>
            <SidebarProvider>
                <div className={"flex flex-col justify-center items-center px-4"}>
                    <div className={"bg-n5 border border-n3 rounded-md flex flex-col justify-center overflow-hidden items-center w-full -mt-4 mx-4"}>
                        <div className={"border-b border-n3 w-full sticky top-0 flex flex-row justify-between items-center"}><h3 className={"ml-2"}>Error</h3>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div
                                        className={
                                            "flex h-full p-3 gap-1 items-center justify-center border-l border-n3 hover:bg-neutral-600/20 dark:hover:bg-white/20 transition-all"
                                        }
                                    >
                                        <X size={"16"} />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>Close</TooltipContent>
                            </Tooltip>
                        </div>
                        <FileX className={"w-20 h-20 m-4"}/>
                        <h1 className={"text-6xl font-black mb-4"}>404</h1>
                        <Button className={"w-40 m-2"}>Go Back</Button>
                        <Button variant={"outline"} className={"w-40 mb-8"}>Contact Support</Button>
                    </div>
                </div>
            </SidebarProvider>
        </div>
    )
}