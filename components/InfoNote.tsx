"use client";

import { useEffect, useState } from "react";

const Note = ({ name }: { name: string }) => {
  const [savedNote, setSavedNote] = useState("");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(name);
    if (saved) setSavedNote(saved);
  }, [name]);

  const handleSave = () => {
    localStorage.setItem(name, savedNote);
    setEdit(false);
  };

  return (
    <div className="max-w-md mx-auto mt-6 p-4 bg-white shadow-md rounded-xl h-[300px]">
      <p className="text-lg font-semibold text-gray-800 mb-2">Note:</p>
      <textarea
        value={savedNote}
        onChange={(e) => setSavedNote(e.target.value)}
        placeholder="اكتب ملاحظتك هنا"
        className="w-full h-40 p-3 outline-none border border-gray-300 rounded-lg resize-none shadow-sm focus:ring-2 focus:ring-green-300 focus:border-green-400 transition-all"
        onFocus={() => setEdit(true)}
        onBlur={(e) => {
          if (
            !(
              e.relatedTarget instanceof HTMLElement &&
              e.relatedTarget.id === "saveBtn"
            )
          ) {
            setEdit(false);
          }
        }}
      />

      <button
        id="saveBtn"
        onClick={handleSave}
        disabled={!edit}
        className="mt-3 disabled:opacity-40 hover:cursor-pointer bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow-sm transition-colors"
      >
        Save Note
      </button>
    </div>
  );
};

export default Note;
