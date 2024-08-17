/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import { RxOpenInNewWindow } from "react-icons/rx";
import { HiDownload } from "react-icons/hi";
import { toast } from "sonner";
import icon from "/icon.webp";
import Footer from "./components/footer";

const API_KEY = process.env.API_KEY;

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [history, setHistory] = useState<
    { prompt: string; imageUrl: string }[]
  >(() => {
    // Get history from localStorage if it exists
    const storedHistory = localStorage.getItem("imagesHistory");
    if (storedHistory) {
      return JSON.parse(storedHistory);
    }
    // Return an empty array if no history found
    return [];
  });
  const generateButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    // Save history to localStorage whenever it changes
    localStorage.setItem("imagesHistory", JSON.stringify(history));
  }, [history]);

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const query = async (data: any) => {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch the image");
    }

    const result = await response.blob();
    return result;
  };

  const generateImage = async () => {
    const toastId = toast.loading("Generating Image, Please wait...");

    try {
      const result = await query({
        inputs: prompt,
      });

      const base64Image = await blobToBase64(result);
      setImageSrc(base64Image);
      setPrompt("");
      setHistory((prevHistory) => [
        { prompt, imageUrl: base64Image },
        ...prevHistory,
      ]);
      toast.success("Image generated successfully!");
    } catch (err: any) {
      toast.error("Failed to generate image.");
      console.error(err.message);
    } finally {
      toast.dismiss(toastId);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (generateButtonRef.current) {
        generateButtonRef.current.click();
      }
    }
  };

  const handleHistoryClick = (imageUrl: string) => {
    setImageSrc(imageUrl);
  };

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
    <div className="h-screen bg-gray-200 flex flex-col md:flex-row">
      {/* Left Section: Text Generation and History */}
      <div className="md:w-4/12 flex flex-col items-center bg-gradient-to-br from-blue-400 to-purple-600 m-4 p-8 rounded-lg shadow-lg">
        <div className="w-full">
          <img src={icon} alt="App Icon" className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-2xl text-white font-medium text-center mb-6">
            Shnell Image Generator
          </h1>
          <textarea
            className="w-full bg-transparent outline-dashed p-2 rounded mb-4"
            placeholder="Enter your creative prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown} // Handle Enter key press
          ></textarea>
          <button
            ref={generateButtonRef}
            onClick={generateImage}
            className="bg-violet-900 text-white py-2 px-4 rounded w-full hover:bg-violet-950 transition"
          >
            Generate Image
          </button>
        </div>

        {/* History Section */}
        <h2 className="text-lg hidden md:block font-bold text-left mt-12 mb-3">
          Gallery
        </h2>
        <div className="hidden md:block w-full flex-1 overflow-y-auto">
          {history.length > 0 ? (
            <ul>
              {history.map((item, index) => (
                <li
                  key={index}
                  className="mb-3 bg-gray-100 p-2 rounded-md shadow-md shadow-neutral-300 pb-2 cursor-pointer hover:bg-gray-200 transition-colors duration-150 ease-in"
                  onClick={() => handleHistoryClick(item.imageUrl)}
                >
                  {item.prompt}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-500 italic text-center">
              No images yet! Generate something cool to show here. 🚀
            </div>
          )}
        </div>
      </div>

      {/* Right Section: Image */}
      <div className="relative flex-1 flex aspect-square p-8 justify-center items-center">
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
                <RxOpenInNewWindow size="1.6em" />
              </button>
              <button
                onClick={downloadImage}
                className="bg-slate-200 text-green-600 p-3 rounded-full shadow-neutral-800 shadow-lg transition-all ease-linear hover:-translate-y-1"
              >
                <HiDownload size="1.6em" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center p-24 md:p-44 border-2 border-dashed border-gray-400 rounded-lg bg-gray-100">
            <span className="text-gray-500">Empty canvas... 🖼️</span>
          </div>
        )}
      </div>

      {/* Mobile History */}
      <div className="block bg-gray-200 md:hidden mt-6 w-full">
        <h2 className="text-lg text-center font-bold">Gallery</h2>
        {history.length > 0 ? (
          <ul>
            {history.map((item, index) => (
              <li
                key={index}
                className="mb-3 mx-8 text-center bg-gray-100 p-2 rounded-md shadow-md shadow-neutral-300 pb-2 cursor-pointer hover:bg-gray-200 transition-colors duration-150 ease-in"
                onClick={() => handleHistoryClick(item.imageUrl)}
              >
                {item.prompt}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-500 italic text-center mt-2 mb-6">
            No images yet! Generate something cool to show here. 🚀
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default App;

//Code Refactoring
//Settings Cog
//Settings: clear history, about
//UI Overhaul
//Update README
