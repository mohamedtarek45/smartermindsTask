"use server";

import { redirect } from "next/navigation";

export const getUserInfo = async (name: string) => {
  const res = await fetch(`https://api.github.com/users/${name}`, {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
    },
    next: { revalidate: 60 * 10, tags: [name] },
  });
  const data = await res.json();
  return data;
};
export const getUserRepos = async (name: string) => {
  const res = await fetch(`https://api.github.com/users/${name}/repos`, {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
    },
    next: { revalidate: 60 * 10, tags: [name] },
  });
  const data = await res.json();
  return data;
};

export const SearchAction = async (
  prev: { message: string },
  formData: FormData
) => {
  const name = formData.get("name") as string;
  const data = await getUserInfo(name);

  if (data.message) {
    return { message: data.message };
  }
  redirect(`/username/${name}`);
};
export const getSummarizeData = async (prompt: string, userName: string) => {
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/summarize`, {
    next: { revalidate: 10, tags: [userName] },
    method: "POST",
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    if (res.status === 429) {
      return { message: "Rate limit exceeded. Please try again later." };
    }
  }
  const data = await res.json();


  return data;
};
