import { useRef, useState } from "react";
import { UseChatStore } from "../Store/UseChatStore";
import { Image, Send, X } from "lucide-react";
import imageCompression from "browser-image-compression";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imagecompressedFile, setImagecompressedFile] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage ,isSendMessageLoading} = UseChatStore();

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (!file.type.startsWith("image/")) {
  //     toast.error("Please select an image file");
  //     return;
  //   }

  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setImagePreview(reader.result);
  //   };
  //   reader.readAsDataURL(file);
  // };



const handleImageChange = async (e) => {
  const file = e.target.files[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    toast.error("Please select an image file");
    return;
  }

  // Compression options
  const options = {
    maxSizeMB: 0.05,
    maxWidthOrHeight: 800, // Resize too
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    console.log(compressedFile.size ,"compressedFile.size---->");
    setImagecompressedFile(compressedFile)

    // Convert to base64 if you still need it
    const base64 = await imageCompression.getDataUrlFromFile(compressedFile);
    setImagePreview(base64); // or send to server
  } catch (err) {
    console.error("Image compression failed:", err);
    toast.error("Image compression failed");
  }
};

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    if (imagePreview && (imagecompressedFile > 51.2 * 1024)) {
      toast.error("Image is still too large after compression (max 1MB)");
      return;
    }
    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };
  return (
    <div className="p-4 w-full">
  {imagePreview && (
  <div className="mb-3 flex items-center gap-2">
    <div className="relative w-20 h-20">
      <img
        src={imagePreview}
        alt="Preview"
        className="w-full h-full object-cover rounded-lg border border-zinc-700"
      />
      {/* Loader Overlay */}
      {isSendMessageLoading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {/* Remove Button */}
      <button
        onClick={removeImage}
        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
        flex items-center justify-center"
        type="button"
      >
        <X className="size-3" />
      </button>
    </div>
  </div>
)}


      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;