"use client";
import { useEffect, useState } from "react";
import { motion ,AnimatePresence} from "motion/react"
const RepoNote = ({ repoID }: { repoID: number }) => {
  const [savedNote, setSavedNote] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(repoID.toString());
    if (saved) setSavedNote(saved);
  }, [repoID]);

  const handleSave = () => {
    localStorage.setItem(repoID.toString(), savedNote);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-2">

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="px-4 py-1.5 w-fit rounded-lg text-sm self-end hover:cursor-pointer font-medium bg-blue-500 text-white shadow-sm 
                   hover:bg-blue-600 transition-all"
      >
        {savedNote ? "Edit Note" : "Add Note"}
      </button>

  
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <textarea
              value={savedNote}
              onChange={(e) => setSavedNote(e.target.value)}
              placeholder="Add your note here"
              className="w-full h-24 p-2 text-sm border border-gray-300 rounded-lg resize-none 
                         focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition-all mt-2"
            />

            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 text-sm rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-1.5 rounded-lg text-sm font-medium bg-green-500 text-white shadow-sm 
                           hover:bg-green-600 transition-all"
              >
                Save
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RepoNote;
