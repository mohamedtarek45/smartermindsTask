import { getUserRepos } from "@/lib/action";
import { Repo } from "@/lib/types";
import RepoNote from "@/components/RepoNote";

const Repos = async ({ name }: { name: string }) => {
  const data = await getUserRepos(name);

  return (
    <div className="grid gap-6 mt-6">
      {data.map((repo: Repo) => (
        <div
          key={repo.id}
          className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all duration-200"
        >
          <div className="flex flex-col gap-2">
            <p className="text-xl font-semibold text-gray-900">{repo.name}</p>
            <p className="text-gray-600 text-sm">
              {repo.description || "No description provided."}
            </p>
            <p className="text-sm font-medium text-yellow-600 mt-1">
              ⭐ {repo.stargazers_count}
            </p>
          </div>

          {/* Note Section */}
          <div className="mt-4 border-t pt-4">
            <RepoNote repoID={repo.id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Repos;
