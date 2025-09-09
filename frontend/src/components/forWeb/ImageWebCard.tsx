import { ImageCardProps } from "@/types/editor"
import { useState } from "react";

const ImageWebCard = ({ url }: ImageCardProps) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 1500);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    return (
        <div
            className="relative flex-shrink-0 mx-2 my-2 cursor-pointer group"
            onClick={handleCopy}
        >
            <img
                src={url}
                className="h-40 w-auto rounded-lg object-cover shadow-md transition-transform duration-200 group-hover:scale-105"
            />
            {isCopied && (
                <div className="absolute inset-0 flex items-center justify-center rounded-lg transition-opacity duration-300 backdrop-blur-md bg-white/30 border border-white/10 shadow-lg">
                    <span className="text-white font-bold text-sm select-none">Copied!</span>
                </div>
            )}
        </div>
    );
}

export default ImageWebCard