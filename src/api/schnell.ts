/* eslint-disable @typescript-eslint/no-explicit-any */
import blobToBase64 from "../utils/imgConverter";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";

const API_KEY = import.meta.env.VITE_API_KEY;

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

interface GenerateImageParams {
  prompt: string;
  setImageSrc: React.Dispatch<React.SetStateAction<string | null>>;
  setPrompt: Dispatch<SetStateAction<string>>;
  setHistory: Dispatch<SetStateAction<{ prompt: string; imageUrl: string }[]>>;
}

const generateImage = async ({
  prompt,
  setImageSrc,
  setPrompt,
  setHistory,
}: GenerateImageParams) => {
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

export default generateImage;
