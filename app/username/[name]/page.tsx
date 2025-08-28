import Info from "@/components/Info";
import Note from "@/components/InfoNote";
import Repos from "@/components/Repos";
import Summary from "@/components/Summary";
import Search from "@/components/Search";
import { IoMdArrowRoundBack } from "react-icons/io";

import Link from "next/link";
import { Suspense } from "react";
const Page = async ({ params }: { params: { name: string } }) => {
  const { name } = await params;

  return (
    <div className=" w-[80%] mx-auto p-4">
      <Link
        href="/"
        className="flex items-center gap-2 text-gray-700 hover:text-black transition mb-6 hover:cursor-pointer"
      >
        <IoMdArrowRoundBack className="size-5" />
        <span>Back</span>
      </Link>
      <Search />
      <Info name={name} />
      <Repos name={name} />
      <Note name={name} />
      <Suspense
        fallback={<div className="text-red-700 text-2xl">loading...</div>}
      >
        <Summary name={name} />
      </Suspense>
    </div>
  );
};

export default Page;
