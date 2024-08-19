import { PiInfoBold } from "react-icons/pi";
import icon from "/icon.webp";
import avatar from "/avatar.webp";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Switch } from "@/components/ui/switch";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const About = ({ showAlert, onHandleShowAlert, onHandleClearHistory }: any) => {
  return (
    <Dialog>
      <DialogTrigger>
        <PiInfoBold
          size="2em"
          className="mt-2 text-slate-950 hover:scale-105 cursor-pointer transition-transform duration-150 ease-in-out"
        />
      </DialogTrigger>
      <DialogContent className="flex flex-col max-h-screen md:max-h-[calc(100vh-2rem)] overflow-hidden">
        <DialogHeader
          className="flex-1 overflow-y-auto"
          style={{ scrollbarWidth: "none" }}
        >
          <DialogTitle className="flex flex-col gap-3 items-center justify-center my-4">
            <img src={icon} alt="Schnell Logo" className="w-16 h-16" />
            <p className="text-slate-950">Schnell Image Generator</p>
          </DialogTitle>
          <DialogDescription className="mx-4">
            <p className="text-lg text-center md:text-justify text-gray-700 mt-2 mb-8">
              Schnell is your creative AI-powered image generation tool. With
              just a few words, you can bring your ideas to life and create
              stunning visuals in seconds. Whether it's art, design, or
              inspiration, Schnell makes it quick and easy to generate images
              tailored to your imagination.
            </p>

            <section className="bg-white p-6 md:p-8 rounded-lg shadow-inner w-full">
              <h2 className="text-xl md:text-2  xl font-semibold mb-4 text-purple-600">
                How to Use Schnell
              </h2>
              <ul className="text-left text-gray-700 space-y-4">
                <li>
                  <strong>1. Enter a Prompt:</strong> In the text area provided,
                  type a creative prompt that describes the image you want to
                  generate. Be as detailed or as simple as you like.
                </li>
                <li>
                  <strong>2. Generate Image:</strong> Click on the "Generate
                  Image" button to see your prompt come to life. You'll see the
                  AI-generated image in the center of your screen.
                </li>
                <li>
                  <strong>3. View Image History:</strong> All the images you
                  generate are saved in the gallery section on the left. Click
                  on any image to view it again or delete it if you no longer
                  need it.
                </li>
                <li>
                  <strong>4. Delete an Image:</strong> To delete an image, click
                  the 'X' button on the image in the gallery. If the
                  confirmation dialog appears, confirm your action, and the
                  image will be removed.
                </li>
                <li>
                  <strong>5. Customize Your Experience:</strong> Use the
                  settings to manage your preferences, such as skipping the
                  confirmation dialog when deleting images.
                </li>
              </ul>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-lg shadow-inner w-full">
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-purple-600">
                Gallery Management
              </h2>
              <div className="mt-2 border-b pb-2 flex items-center justify-between gap-2">
                <label className="text-gray-700 text-left">
                  Enable/Disable alerts on deleting gallery images
                </label>
                <Switch
                  checked={showAlert}
                  onCheckedChange={onHandleShowAlert}
                />
              </div>
              <div className="mt-4 border-b pb-2 flex items-center justify-between gap-2">
                <label className="text-gray-700 text-left">
                  Permanently delete all images from the gallery
                </label>
                <AlertDialog>
                  <AlertDialogHeader>
                    <AlertDialogTrigger>
                      <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition">
                        Clear
                      </button>
                    </AlertDialogTrigger>
                  </AlertDialogHeader>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="flex flex-col gap-5">
                        This action cannot be undone. This will permanently
                        clear your gallery.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={onHandleClearHistory}>
                        Clear it!
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </section>

            <section className="w-full max-w-xl mx-auto p-6 mt-4 bg-white rounded-lg shadow-inner">
              <div className="flex items-center space-x-6">
                <img
                  src={avatar}
                  alt="Abdullah Ansari"
                  className="w-24 h-24 rounded-full shadow-black/40 shadow-md"
                />
                <div className="-translate-y-1">
                  <h2 className="text-2xl md:text-3xl text-left font-semibold">
                    Abdullah Ansari
                  </h2>
                  <p className="text-gray-600 text-left">
                    Web Developer & Designer
                  </p>
                  <div className="flex space-x-4 mt-2">
                    <a
                      href="https://github.com/aibiansari"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-gray-900 transition"
                    >
                      <FaGithub size="1.5em" />
                    </a>
                    <a
                      href="https://aibiansari.github.io/portfolio/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-gray-900 transition"
                    >
                      <FaGlobe size="1.5em" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/aibiansari/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-gray-900 transition"
                    >
                      <FaLinkedin size="1.5em" />
                    </a>
                  </div>
                </div>
              </div>
            </section>
            <section className="hidden md:flex w-full justify-end my-4 font-Atkinson">
              &copy; {new Date().getFullYear()} Schnell. All rights reserved.
            </section>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose className="text-lg md:mr-2">Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default About;
