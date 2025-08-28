import { getUserInfo } from "@/lib/action";
import Image from "next/image";
import CompareButton from "./CompareButton";

import { notFound } from "next/navigation"

const Info = async ({ name }: { name: string }) => {
  const data = await getUserInfo(name);
  if(data.message){
    notFound();
  }
  return (
<div className="max-w-sm mx-auto bg-white shadow-md rounded-xl p-6 grid place-items-center gap-4">
  <Image
    src={data.avatar_url}
    alt="avatar"
    width={120}
    height={120}
    className="rounded-full border-2 border-gray-200"
  />
  <p className="text-xl font-semibold text-gray-800 r">{data.name}</p>
  <p className="text-gray-500 ">{data.bio || "No bio available"}</p>
  
  <div className="flex justify-around w-full text-center text-gray-700 mt-2">
    <div>
      <p className="font-bold">{data.public_repos}</p>
      <p className="text-sm">Repos</p>
    </div>
    <div>
      <p className="font-bold">{data.followers}</p>
      <p className="text-sm">Followers</p>
    </div>
    <div>
      <p className="font-bold">{data.following}</p>
      <p className="text-sm">Following</p>
    </div>
  </div>

  <CompareButton name={name} avatar={data.avatar_url} />
</div>

  );
};

export default Info;
