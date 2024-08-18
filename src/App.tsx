import { useState, useRef, useEffect } from "react";
import generateImage from "./api/schnell";
import { RxCross2 } from "react-icons/rx";
import { PiInfoBold } from "react-icons/pi";
import icon from "/icon.webp";
import Footer from "./components/ui/footer";
import ImageContainer from "./components/ui/imgContainer";

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [history, setHistory] = useState<
    { prompt: string; imageUrl: string }[]
  >(() => {
    const storedHistory = localStorage.getItem("imagesHistory");
    if (storedHistory) {
      return JSON.parse(storedHistory);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("imagesHistory", JSON.stringify(history));
  }, [history]);

  const generateButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (generateButtonRef.current) {
        generateButtonRef.current.click();
      }
    }
  };

  const handleGenerateImage = async () => {
    if (prompt.trim() === "") return; // Prevent generating an image with an empty prompt
    setIsLoading(true);
    await generateImage({ prompt, setImageSrc, setPrompt, setHistory });
    setIsLoading(false);
  };

  const handleHistoryClick = (item: { prompt: string; imageUrl: string }) => {
    setImageSrc(item.imageUrl);
    setPrompt(item.prompt);
  };

  const handleDeleteImage = (index: number) => {
    const updatedHistory = history.filter((_, i) => i !== index);
    setHistory(updatedHistory);
    if (imageSrc === history[index]?.imageUrl) {
      setImageSrc(null);
      setPrompt("");
    }
  };

  return (
    <div className="h-screen bg-gray-200 flex flex-col md:flex-row">
      {/* Left Section: Text Generation */}
      <div
        className="md:w-4/12 flex flex-col md:overflow-y-auto items-center bg-gradient-to-br from-blue-400 to-purple-600 m-4 md:m-8 p-8 rounded-lg shadow-neutral-400 shadow-md drop-shadow-md"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="w-full">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start justify-center gap-2">
              <img
                src={icon}
                alt="App Icon"
                className="w-12 h-12 2xl:w-16 2xl:h-16 mb-4"
              />
              <h1 className="font-Righteous mt-1.5 text-3xl text-slate-950 cursor-default">
                Schnell
              </h1>
            </div>
            <PiInfoBold
              size="2em"
              className="mt-2 text-slate-950 hover:scale-105 cursor-pointer transition-transform duration-150 ease-in-out"
            />
          </div>
          <textarea
            className="w-full text-md 2xl:text-lg min-h-28 max-h-44 font-normal text-black placeholder:text-neutral-600 bg-transparent outline-dashed outline-2 outline-neutral-600 focus:outline-black p-2 rounded mb-4"
            placeholder="Enter your creative prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown} // Handle Enter key press
          ></textarea>
          <button
            ref={generateButtonRef}
            onClick={handleGenerateImage}
            className={`bg-violet-900 text-white text-md 2xl:text-lg py-2 px-4 rounded w-full transition ${
              isLoading
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-violet-950"
            }`}
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? "Generating..." : "Generate Image"}
          </button>
        </div>

        {/* History Section */}
        <h2 className="text-xl 2xl:text-2xl hidden md:block font-bold text-left mt-12 mb-4 2xl:mb-6">
          Gallery
        </h2>
        <div
          className="hidden md:block w-full flex-1 overflow-y-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {history.length > 0 ? (
            <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {history.map((item, index) => (
                <li key={index} className="relative group">
                  <img
                    src={item.imageUrl}
                    alt={`Generated from prompt: ${item.prompt}`}
                    className="cursor-pointer rounded-md shadow-neutral-600 shadow-md hover:opacity-85 transition-opacity"
                    onClick={() => handleHistoryClick(item)}
                  />
                  <RxCross2
                    size="1.4em"
                    onClick={() => handleDeleteImage(index)}
                    className="absolute top-1.5 right-1.5 text-black bg-white rounded-full p-0.5 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-900 text-md 2xl:text-lg italic text-center">
              No images yet! Generate something cool to show here. 🚀
            </div>
          )}
        </div>
      </div>

      {/* Right Section: Image */}
      <ImageContainer imageSrc={imageSrc} />

      {/* Mobile History */}
      <div className="block bg-gray-200 md:hidden mt-6 w-full">
        <h2 className="text-2xl text-center font-bold my-4">Gallery</h2>
        {history.length > 0 ? (
          <ul className="grid grid-cols-2 gap-4 mx-8">
            {history.map((item, index) => (
              <li key={index} className="relative">
                <img
                  src={item.imageUrl}
                  alt={`Generated from prompt: ${item.prompt}`}
                  className="cursor-pointer rounded-md shadow-neutral-600 shadow-md hover:opacity-85 transition-opacity"
                  onClick={() => handleHistoryClick(item)}
                />
                <RxCross2
                  size="1.4em"
                  onClick={() => handleDeleteImage(index)}
                  className="absolute top-1.5 right-1.5 text-black bg-white rounded-full p-0.5 cursor-pointer"
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-500 italic text-center mx-8 mb-6">
            No images yet! Generate something cool to show here. 🚀
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default App;

//Settings Cog
//Settings: clear history, about
//Update README
