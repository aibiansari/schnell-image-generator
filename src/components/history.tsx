import React from "react";

type HistoryItem = {
  prompt: string;
  imageUrl: string;
};

interface HistoryProps {
  history: HistoryItem[];
  handleHistoryClick: (item: HistoryItem) => void;
  handleDeleteImage: (index: number) => void;
}

const History: React.FC<HistoryProps> = ({
  history,
  handleHistoryClick,
  handleDeleteImage,
}) => {
  return (
    <>
      <h2 className="text-xl 2xl:text-3xl hidden md:block font-bold text-left mt-12 mb-4 2xl:mb-6">
        Gallery
      </h2>
      <div
        className="hidden md:block w-full flex-1 overflow-y-auto"
        style={{ scrollbarWidth: "none" }}
      >
        {history.length > 0 ? (
          <ul className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {history.map((item, index) => (
              <li key={index} className="relative">
                <img
                  src={item.imageUrl}
                  alt={`Generated from prompt: ${item.prompt}`}
                  className="cursor-pointer rounded-md shadow-md hover:opacity-75 transition-opacity"
                  onClick={() => handleHistoryClick(item)}
                />
                <button
                  className="absolute bg-red-600 rounded-full top-1 right-1 text-white px-1 text-center text-sm font-bold"
                  onClick={() => handleDeleteImage(index)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-900 text-md 2xl:text-lg italic text-center">
            No images yet! Generate something cool to show here. 🚀
          </div>
        )}
      </div>
    </>
  );
};

export default History;
