"use client";

import { GlobalWorkerOptions } from "pdfjs-dist";
import "pdfjs-dist/web/pdf_viewer.css";
import { CanvasLayer, Page, Pages, Root, Thumbnail, Thumbnails } from "@anaralabs/lector";
import Image from "next/image";
import React from "react";
import {
    Bookmark,
    ChevronLeft,
    CircleFadingPlus,
    Download,
    Files,
    Maximize,
    PanelLeft,
    SunMoon,
    ToolCase
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ScrollAreaViewport } from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/utils";
import {useTheme} from "next-themes";
import {Button} from "@/components/ui/button";


// Set worker source immediately when module loads
if (typeof window !== "undefined") {
  GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
}

type TemoLectorProps = {
  src: string;
  showThumbnailsPanel?: boolean; // controls the left thumbnails panel
  showToolsPanel?: boolean; // controls the right tools panel
  fullscreen?: boolean; // fullscreen mode removes rounded corners and aspect ratio
};
type ToolProps = {
    name: string;
    description?: string;
    icon?: React.ReactNode;
    canvas?: React.ReactNode;
};

function Tool({ name, description, icon, canvas }: ToolProps) {
    return (
        <div className="bg-background border border-n3 rounded-md overflow-hidden">
            {canvas ? (
                <div className="">{canvas}</div>
            ) : (
                <div className={"p-3 "}>
                    <div className={"flex flex-row gap-1 mb-2"}>
                        {icon && <div className={"text-lg"}>{icon}</div>}
                        <h1 className={"text-lg"}>{name}</h1>
                    </div>
                    <p className={"text-md text-primary/80 mb-2"}>{description}</p>
                    <div className={"w-full flex flex-row gap-2 mt-6"}>
                        <Button className={"w-max"}>Use Tool</Button>
                        <Button variant={"outline"} className={"w-max"}>Learn More</Button>
                    </div>
                </div>
            )}
        </div>
    );
}


// |----TemoLector Component-------------------------------------------------------x-|
// |                                                                                 |
// | -- Add Tools for users on the Homepage in Tools.                                |
// | -- Add ToolPages for tools to use in ToolsPages.                                |
// |                                                                                 |
// |---------------------------------------------------------Continue here \/ \/ \/ -|


export function TemoLector({ src, showThumbnailsPanel = true , showToolsPanel = false, fullscreen = false}: TemoLectorProps) {

    // Tools Utilities
    const tools = [
        { id: 1, name: "Tool 1", icon: <Download />, description: "Download the current page as a PDF." },
        { id: 2, name: "Tool 2", canvas: <div>Canvas for Tool 2</div> },
    ];

    const ToolsPages = {
        home: (
            <div className={"flex flex-col gap-2"}>
                {tools.map((tool) => (
                    <Tool key={tool.id} name={tool.name} canvas={(tool as any).canvas} description={tool.description} icon={tool.icon} />
                ))}
            </div>
        ),
        test: <div className="flex flex-row gap-2 p-4 bg-green-700"></div>,
    } as const;

    // Reader Utilities
    const [showThumbnails, setShowThumbnails] = React.useState<boolean>(showThumbnailsPanel);
    const [showTools, setShowTools] = React.useState<boolean>(showToolsPanel);
    const { resolvedTheme, setTheme } = useTheme()
    const [toolsPage, setToolsPage] = React.useState<keyof typeof ToolsPages>("home");

    // Reader
    return (
        <Root
            loader={
                <div className={"flex justify-center items-center h-full w-full"}>
                    <Image src={"/lector.svg"} alt={"Temo Lector"} width={150} height={56}
                           className={"p-2 block dark:hidden"} priority={true}/>
                    <Image src={"/lector-dark.svg"} alt={"Temo Lector"} width={150} height={56}
                           className={"p-2 dark:block hidden"} priority={true}/>
                    <h1 className={"text-lg mt-0.75"}>Starting up...</h1>
                </div>
            }
            source={src}
            className={cn(
                "overflow-hidden w-full border border-n3 bg-n5",
                fullscreen ? "rounded-none" : "rounded-md",
                fullscreen ? undefined : "aspect-video",
                fullscreen ? "max-h-screen max-w-screen" : undefined,
                fullscreen ? "fixed inset-0 z-50" : undefined
            )}
        >
            {/*Top Panel*/}
            <div className={"sticky top-0 w-full"}>
                <div
                    className={
                        "w-full border-b border-n3 bg-n5 flex flex-row justify-between"
                    }
                >
                    {/*Left Area*/}
                    <div className={"flex justify-center items-center"}>
                        <Tooltip>
                            <TooltipTrigger>
                                <div
                                    className={
                                        "flex h-full p-3 gap-1 items-center justify-center border-r border-n3 hover:bg-neutral-600/20 dark:hover:bg-white/20 transition-all"
                                    }
                                    onClick={() => setShowThumbnails((prev) => !prev)}
                                    role="button"
                                    aria-pressed={showThumbnails}
                                >
                                    <PanelLeft size={"16"}/>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>Pages</TooltipContent>
                        </Tooltip>
                        <Image src={"/lector.svg"} alt={"Temo Lector"} width={150} height={56}
                               className={"p-2 block dark:hidden"}/>
                        <Image src={"/lector-dark.svg"} alt={"Temo Lector"} width={150} height={56}
                               className={"p-2 dark:block hidden"}/>
                    </div>
                    {/*Right Area*/}
                    <div className={"flex flex-row h-full"}>
                        <Tooltip>
                            <TooltipTrigger>
                                <div
                                    className={
                                        "flex h-full p-3 gap-1 items-center justify-center border-l border-n3 hover:bg-neutral-600/20 dark:hover:bg-white/20 transition-all"
                                    }
                                >
                                    <CircleFadingPlus size={"16"}/>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>Add to Continue Reading.</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger>
                                <div
                                    className={
                                        "flex h-full p-3 gap-1 items-center justify-center border-l border-n3 hover:bg-neutral-600/20 dark:hover:bg-white/20 transition-all"
                                    }
                                >
                                    <Bookmark size={"16"}/>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>Save to a Folder.</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger>
                                <div
                                    onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                                    className={
                                        "flex h-full p-3 gap-1 items-center justify-center border-l border-n3 hover:bg-neutral-600/20 dark:hover:bg-white/20 transition-all"
                                    }
                                >
                                    <SunMoon size={"16"}/>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>Toggle Theme.</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger>
                                <div
                                    className={
                                        "flex h-full p-3 gap-1 items-center justify-center border-l border-n3 hover:bg-neutral-600/20 dark:hover:bg-white/20 transition-all"
                                    }
                                >
                                    <Maximize size={"16"}/>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>Fullscreen.</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger>
                                <div
                                    onClick={() => setShowTools((prev) => !prev)}
                                    className={
                                        "flex h-full p-3 gap-1 items-center justify-center border-l border-n3 hover:bg-neutral-600/20 dark:hover:bg-white/20 transition-all"
                                    }
                                >
                                    <ToolCase size={"16"}/>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>Tools</TooltipContent>
                        </Tooltip>
                    </div>
                </div>
            </div>

            {/*Thumbnails Panel*/}
            <div className={"flex flex-row h-full w-full"}>
                {showThumbnails && (
                    <div
                        className={
                            "border-r max-w-[250px] p-2 h-full  border-n3 bg-n5 h-full w-[50%]"
                        }
                    >
                        <ScrollArea className={"w-full h-full"}>
                            <ScrollAreaViewport className={"w-full h-full"}>
                                <div className={"flex flex row gap-1 items-center"}>
                                    <Files size={"18"}/>
                                    <h1>Pages</h1>
                                </div>
                                <div className={"w-full h-[1px] my-2 bg-n3"}/>
                                <Thumbnails className={"mb-12"}>
                                    <Thumbnail
                                        className={"w-[90%] m-2 rounded-md shadow dark:invert-[94%] dark:hue-rotate-180 dark:brightness-[80%] dark:contrast-[228%]"}/>
                                </Thumbnails>
                            </ScrollAreaViewport>
                            <ScrollBar/>
                        </ScrollArea>
                    </div>
                )}

                {/*PDF Area*/}
                <Pages
                    className={"dark:invert-[94%] dark:hue-rotate-180 dark:brightness-[80%] dark:contrast-[228%] h-full w-full"}>
                    <Page>
                        <CanvasLayer/>
                    </Page>
                </Pages>

                {/*Tools Panel*/}
                {showTools && (
                    <div className={"border-l p-2 border-n3 bg-n5 h-full w-[50%]"}>
                        <div className={"flex flex row gap-1 items-center"}>
                            <ToolCase size={"18"}/>
                            <h1>Tools</h1>
                        </div>
                        <div className={"w-full h-[1px] my-2 bg-n3"}/>
                        {toolsPage != "home" && (
                            <div className={"flex flex-row items-center mb-2 "} onClick={() => setToolsPage("home")}><ChevronLeft className={"w-8"}/><h3>Go Back</h3></div>
                        )}
                        {ToolsPages[toolsPage]}
                    </div>
                )}

            </div>
        </Root>
    );
}