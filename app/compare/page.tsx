"use client";
import { IoMdArrowRoundBack } from "react-icons/io";
import { getUserInfo, getUserRepos } from "@/lib/action";
import useCompareStore from "@/store/compareStore";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { User, Repo } from "@/lib/types";
import Image from "next/image";
import Loading from "../loading";
import { notFound } from "next/navigation";

const Page = () => {
  const clearCompare = useCompareStore((state) => state.clearCompare);
  const searchParams = useSearchParams();
  const router = useRouter();
  const usersParam = searchParams.get("users");

  const users = useMemo(() => {
    return usersParam ? usersParam.split(",") : [];
  }, [usersParam]);

  const [u1, setU1] = useState<User | null | {message:string}>(null);
  const [u2, setU2] = useState<User | null | {message:string}>(null);
  const [stars, setStars] = useState<{ u1Stars: number; u2Stars: number } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getUsers() {
      setLoading(true);
      const u1Data = await getUserInfo(users[0]);
      const u2Data = await getUserInfo(users[1]);
      const repos1 = await getUserRepos(users[0]);
      const repos2 = await getUserRepos(users[1]);
      if(u1Data.message || u2Data.message){
        setU1(u1Data);
        setU2(u2Data);
        setLoading(false);
        return;
      }
      const u1Stars = repos1.reduce((sum: number, repo: Repo) => sum + repo.stargazers_count, 0);
      const u2Stars = repos2.reduce((sum: number, repo: Repo) => sum + repo.stargazers_count, 0);

      setStars({ u1Stars, u2Stars });
      setU1(u1Data);
      setU2(u2Data);
      setLoading(false);
    }

    getUsers();
    clearCompare();
  }, [clearCompare, users]);

  if (!usersParam) return notFound();
if ((u1 && "message" in u1) || (u2 && "message" in u2)) {
  return notFound();
}
  if (loading) return <Loading />;

  return (
    <div className="w-[90%] md:w-[80%] mx-auto py-6">
      {/* Back Button */}
      <button
        onClick={() => router.push(`/`)}
        className="flex items-center gap-2 text-gray-700 hover:text-black transition mb-6 hover:cursor-pointer"
      >
        <IoMdArrowRoundBack className="size-5" />
        <span>Back</span>
      </button>

      {/* Avatars */}
      <div className="grid w-full grid-cols-2 gap-6 justify-items-center mb-8">
        {u1?.avatar_url && (
          <Image
            src={u1.avatar_url}
            alt="avatar"
            width={200}
            height={200}
            className="rounded-full shadow-md"
          />
        )}
        {u2?.avatar_url && (
          <Image
            src={u2.avatar_url}
            alt="avatar"
            width={200}
            height={200}
            className="rounded-full shadow-md"
          />
        )}
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-center border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 font-semibold">{u1?.name}</th>
              <th className="p-3 font-semibold">Metric</th>
              <th className="p-3 font-semibold">{u2?.name}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="p-3">{u1?.public_repos}</td>
              <td className="p-3 font-medium text-gray-600">Repos</td>
              <td className="p-3">{u2?.public_repos}</td>
            </tr>
            <tr>
              <td className="p-3">{stars?.u1Stars}</td>
              <td className="p-3 font-medium text-gray-600">Stars</td>
              <td className="p-3">{stars?.u2Stars}</td>
            </tr>
            <tr>
              <td className="p-3">{u1?.followers}</td>
              <td className="p-3 font-medium text-gray-600">Followers</td>
              <td className="p-3">{u2?.followers}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
