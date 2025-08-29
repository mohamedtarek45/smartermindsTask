import { getUserInfo, getUserRepos, getSummarizeData } from "@/lib/action";
import { Repo } from "@/lib/types";

const Summary = async ({ name }: { name: string }) => {
  const user = await getUserInfo(name);
  const repos = await getUserRepos(name);

  const totalStars = repos.reduce(
    (acc: number, repo: Repo) => acc + repo.stargazers_count,
    0
  );

  const languageCount: Record<string, number> = {};
  repos.forEach((repo: Repo) => {
    if (repo.language) {
      languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
    }
  });

  const sortedLanguages = Object.entries(languageCount).sort(
    (a, b) => b[1] - a[1]
  );

  const topLanguages = sortedLanguages
    .slice(0, 3)
    .map(([lang]) => lang)
    .join(", ");

  const prompt = `
Analyze this GitHub user profile and provide a short professional summary
in simple, clear English. 

- Username: ${user}
- Number of repositories: ${repos.length}
- Total Stars: ${totalStars}
- Most used languages: ${topLanguages}

The summary should:
1. Be concise (4–6 sentences).
2. Use simple, common English words that are easy to understand.
3. Be a continuous paragraph without any bullet points, stars, or headings.
4. Include the user's activity level, expertise, popularity, and a short conclusion about their focus and interests.
`;

  const summary = await getSummarizeData(prompt, name);
if (summary.message) {
  return (
    <div className="max-w-xl mx-auto mt-6 p-4 bg-yellow-100 text-yellow-800 rounded-lg shadow-sm text-center flex items-center gap-2">
      <span className="text-xl">⚠️</span>
      <span>
        <strong>Summary:</strong> {summary.message}
      </span>
    </div>
  );
}

  return (
    <div className="max-w-xl mx-auto mt-6 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">Summary</h2>
      <p className="text-gray-700 leading-relaxed">{summary.summary}</p>
    </div>
  );
};

export default Summary;
