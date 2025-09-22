import Image from "next/image";
import React from "react";

export default function Logo() {
    return(
        <div>
            <Image src={'/logo.svg'} alt={'Logo'} width={180} height={100} className={'dark:hidden block'} />
            <Image src={'/logo-dark.svg'} alt={'Logo'} width={180} height={100} className={'dark:block hidden'} />
        </div>
    )
}