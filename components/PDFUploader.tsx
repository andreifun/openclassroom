//import {
//    FileUploader,
//    FileUploaderDropZone,
//   FileUploaderFileList,
//    FileUploaderCrop,
//  } from "@/components/file-uploader"

//export default function PDFUploader() {
//    const handleFilesReady = (files) => {
//        console.log('Files ready:', files)
        // Handle the uploaded files
        // Example: Create FormData to send to server
//        const formData = new FormData()
//        files.forEach((file, index) => {
//            formData.append(`file-${index}`, file)
//        })
        // fetch('/api/upload', { method: 'POST', body: formData })
//    }

//    return (
//        <FileUploader
//            maxFiles={1}
//            maxSize={25 * 1024 * 1024}
//            accept={['application/pdf']}
//            className="w-full"
//        >
//            <FileUploaderDropZone className={"bg-gradient-to-b from-background to-green-400/14 border-n3"}/>
//            <FileUploaderFileList/>
//        </FileUploader>
//    )
//}