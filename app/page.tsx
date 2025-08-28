import Search from "@/components/Search";
import WriteEffects from "@/components/WriteEffects";

export default function Home() {
  return (
    <div className="grid place-items-center h-screen w-[90%] max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        <WriteEffects/>
      </h1>
      <Search />
    </div>
  );
}
