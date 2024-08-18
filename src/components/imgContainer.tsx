import { RxOpenInNewWindow } from "react-icons/rx";
import { HiDownload } from "react-icons/hi";
import { toast } from "sonner";

const ImageContainer = ({ imageSrc }: { imageSrc: string | null }) => {
  const openImageInNewTab = () => {
    if (imageSrc) {
      window.open(imageSrc, "_blank");
    }
  };

  const downloadImage = () => {
    if (imageSrc) {
      const link = document.createElement("a");
      link.href = imageSrc;
      link.download = "image.png"; // You can adjust the filename and extension if needed
      link.click();
    }
  };

  return (
    <div className="relative flex-1 flex aspect-square p-4 md:p-8 justify-center items-center">
      {imageSrc ? (
        <>
          <img
            src={imageSrc}
            alt="Generated"
            className="rounded-lg shadow-neutral-400 shadow-md drop-shadow-md max-w-full max-h-full object-contain"
            onError={() => toast.error("Failed to load image.")}
          />
          <div className="absolute bottom-12 flex gap-4 items-center justify-center">
            <button
              onClick={openImageInNewTab}
              className="bg-slate-200 text-blue-600 p-3 rounded-full shadow-neutral-800 shadow-lg transition-all ease-linear hover:-translate-y-1"
            >
              <RxOpenInNewWindow size="2em" />
            </button>
            <button
              onClick={downloadImage}
              className="bg-slate-200 text-green-600 p-3 rounded-full shadow-neutral-800 shadow-lg transition-all ease-linear hover:-translate-y-1"
            >
              <HiDownload size="2em" />
            </button>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center p-24 md:p-44 border-2 border-dashed border-gray-400 rounded-lg bg-gray-100">
          <span className="text-gray-500">Empty canvas... 🖼️</span>
        </div>
      )}
    </div>
  );
};

export default ImageContainer;
