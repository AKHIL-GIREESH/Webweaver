import { AuthContext } from "@/providers/authProvider"
import { useMutation } from "@tanstack/react-query"
import { Upload } from "lucide-react"
import { useContext, useRef } from "react"
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"

const NewAssetCard = () => {
    const UserContext = useContext(AuthContext)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const { mutate: uploadAsset, isPending } = useMutation({
        mutationFn: async (file: File) => {
            if (!UserContext?.user?.id) throw new Error("User not found")
            const formData = new FormData()
            formData.append("upload", file)

            const res = await fetch(`http://localhost:3000/assets/upload/${UserContext.user.id}`, {
                method: "POST",
                body: formData,
            })

            if (!res.ok) {
                throw new Error("Failed to upload")
            }

            return res.json()
        },
        onSuccess: (data) => {
            console.log("Asset uploaded:", data)
            // maybe trigger refetch of assets
        },
        onError: (err) => {
            console.error(err)
        }
    })

    const handleUpload = () => {
        const file = fileInputRef.current?.files?.[0]
        if (file) {
            uploadAsset(file)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="ml-[6vw] flex items-center justify-center outline-light outline-2 h-[35vh] w-[30vw] outline-dashed bg-black rounded-[10px] cursor-pointer hover:brightness-110 transition-all">
                    <div className="p-3 rounded-full bg-gradient-to-br from-[#ffd700] via-[#f0c14b] to-[#b8860b]">
                        <Upload className="text-black" />
                    </div>
                </div>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload your media</DialogTitle>
                    <DialogDescription>
                        Select an asset to upload to your vault.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4 mt-4">
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="border p-2 rounded"
                    />
                    <button
                        onClick={handleUpload}
                        className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded disabled:opacity-60"
                        disabled={isPending}
                    >
                        {isPending ? "Uploading..." : "Upload"}
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default NewAssetCard
