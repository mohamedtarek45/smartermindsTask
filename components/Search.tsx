"use client";
import { SearchAction } from "../lib/action";
import { useActionState, useEffect } from "react";
import {  toast } from "sonner";
const Search = () => {
  const [state, Action, isPending] = useActionState(SearchAction, {
    message: "",
  });
  useEffect(() => {
    if (state.message !== "") {
      toast.error(state.message);
    }
  }, [state.message]);
  return (
    <form
      action={Action}
      className="flex flex-col items-center gap-4 w-full my-8"
    >
      <div className="flex w-full gap-3">
        <input
          type="text"
          name="name"
          placeholder="Enter username"
          className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
        />
        <button
          className="px-6 py-3 hover:cursor-pointer rounded-full bg-blue-500 text-white font-medium shadow-md transition-all duration-200 hover:bg-blue-600 hover:scale-105 disabled:opacity-60"
          disabled={isPending}
        >
          {isPending ? "Loading..." : "Search"}
        </button>
      </div>

    </form>
  );
};

export default Search;
