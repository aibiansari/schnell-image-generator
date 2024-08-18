import { useState, useRef, useEffect } from "react";
import generateImage from "./api/schnell";
import icon from "/icon.webp";
import Footer from "./components/footer";
import ImageContainer from "./components/imgContainer";

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const [history, setHistory] = useState<
    { prompt: string; imageUrl: string }[]
  >(() => {
    const storedHistory = localStorage.getItem("imagesHistory");
    if (storedHistory) {
      return JSON.parse(storedHistory);
    }
    return [];
  });

  const generateButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    localStorage.setItem("imagesHistory", JSON.stringify(history));
  }, [history]);

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

  return (
    <div className="h-screen bg-gray-200 flex flex-col md:flex-row">
      {/* Left Section: Text Generation */}
      <div className="md:w-4/12 flex flex-col items-center bg-gradient-to-br from-blue-400 to-purple-600 m-4 md:m-8 p-8 rounded-lg shadow-neutral-400 shadow-md drop-shadow-md ">
        <div className="w-full">
          <img src={icon} alt="App Icon" className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-2xl text-white font-medium text-center mb-6">
            Schnell Image Generator
          </h1>
          <textarea
            className="w-full max-h-44 bg-transparent outline-dashed p-2 rounded mb-4"
            placeholder="Enter your creative prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown} // Handle Enter key press
          ></textarea>
          <button
            ref={generateButtonRef}
            onClick={() =>
              generateImage({ prompt, setImageSrc, setPrompt, setHistory })
            }
            className="bg-violet-900 text-white py-2 px-4 rounded w-full hover:bg-violet-950 transition"
          >
            Generate Image
          </button>
        </div>

        {/* History Section */}
        <h2 className="text-lg hidden md:block font-bold text-left mt-12 mb-3">
          Gallery
        </h2>
        <div
          className="hidden md:block w-full flex-1 overflow-y-auto"
          style={{ scrollbarWidth: "none" }}
        >
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
      <ImageContainer imageSrc={imageSrc} />

      {/* Mobile History */}
      <div className="block bg-gray-200 md:hidden mt-6 w-full">
        <h2 className="text-xl text-center font-bold mb-3">Gallery</h2>
        {history.length > 0 ? (
          <ul>
            {history.map((item, index) => (
              <li
                key={index}
                className="mb-3 mx-8 text-center bg-gray-100 p-2 rounded-md shadow-md shadow-neutral-300 pb-2 cursor-pointer hover:bg-indigo-200 transition-colors duration-150 ease-in"
                onClick={() => handleHistoryClick(item.imageUrl)}
              >
                {item.prompt}
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
//History text to images overhaul
//UI Overhaul
//Responsive for 2k and 4k
//Update README
