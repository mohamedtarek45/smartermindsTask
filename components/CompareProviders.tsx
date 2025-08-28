"use client";
import useCompareStore from "@/store/compareStore";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { motion, AnimatePresence } from "motion/react";

const CompareProviders = () => {
  const pathname = usePathname();
  const router = useRouter();
  const users = useCompareStore((state) => state.users);
  const removeFromCompare = useCompareStore((state) => state.removeFromCompare);

  return (
    <AnimatePresence >
      {users.length !== 0 && pathname !== "/compare" && (
        <motion.div
        layout
          className="sticky top-0 z-50 w-full bg-gradient-to-r from-green-400 to-green-500 py-3 shadow-md"
          variants={{
            open: {
              opacity: 1,
              y: 0,
              transition: {
                staggerChildren: 0.1,
              },
            },
            closed: { opacity: 0, y: -100 },
          }}
          initial="closed"
          animate={
            users.length !== 0 && pathname !== "/compare" ? "open" : "closed"
          }
          exit="closed"
        >
          <div className="flex items-center justify-between w-[80%] mx-auto">
            <div className="flex gap-6">
              {users.map((user, i) => (
                <motion.div
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: -100 },
                  }}
                  key={i}
                  className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-sm border hover:shadow-md transition"
                >
                  <Image
                    src={user.avatar}
                    className="rounded-full border"
                    alt="avatar"
                    width={36}
                    height={36}
                  />
                  <p className="text-base font-semibold text-gray-800">
                    {user.name}
                  </p>
                  <IoIosCloseCircleOutline
                    onClick={() => removeFromCompare(user.name)}
                    className="text-red-500 hover:text-red-600 transition size-6 hover:cursor-pointer"
                  />
                </motion.div>
              ))}
            </div>

            {/* زرار الـ Compare */}
            <button
              onClick={() =>
                router.push(
                  `/compare?users=${users.map((u) => u.name).join(",")}`
                )
              }
              className="hover:cursor-pointer disabled:scale-100  px-6 py-2 bg-blue-500 text-white font-medium rounded-full shadow-md transition hover:bg-blue-600 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={users.length < 2}
            >
              Compare
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CompareProviders;
