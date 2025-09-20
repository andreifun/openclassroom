import {TemoLector} from "@/components/temolector";

export default function LectorPage(){
    return (
        <div>
            <TemoLector src={"pdf.pdf"} fullscreen={true} />
        </div>
    )
}