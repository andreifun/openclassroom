import Image from "next/image";
import React from "react";

export default function OcLogo() {
    return(
        <div>
            <Image src={'oc/logo.svg'} alt={'Logo'} width={180} height={100} className={'dark:hidden block'} />
            <Image src={'oc/logo-dark.svg'} alt={'Logo'} width={180} height={100} className={'dark:block hidden'} />
        </div>
    )
}