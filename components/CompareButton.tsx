"use client";
import useCompareStore from "@/store/compareStore";
const CompareButton = ({ name,avatar }: { name: string,avatar:string }) => {
  const add = useCompareStore((state) => state.addToCompare);
  const users = useCompareStore((state) => state.users);

  return (
    <button
      onClick={() => add(name,avatar)}
      className="bg-blue-600 px-4 py-2 rounded-2xl text-white hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={users.length >= 2}
    >
      Compare
    </button>
  );
};

export default CompareButton;
