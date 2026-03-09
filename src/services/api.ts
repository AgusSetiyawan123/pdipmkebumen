import { News, Stats, StatItem } from "../types";

export async function fetchNews(): Promise<News[]> {
  const res = await fetch("/api/news");
  return res.json();
}

export async function postNews(news: Omit<News, "id" | "created_at">): Promise<{ id: number }> {
  const res = await fetch("/api/news", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(news),
  });
  return res.json();
}

export async function fetchStats(): Promise<Stats> {
  const res = await fetch("/api/stats");
  return res.json();
}

export async function postStat(stat: Omit<StatItem, "id">): Promise<{ id: number }> {
  const res = await fetch("/api/stats", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(stat),
  });
  return res.json();
}

export async function deleteNews(id: number): Promise<{ success: boolean }> {
  const res = await fetch(`/api/news/${id}`, { method: "DELETE" });
  return res.json();
}

export async function deleteStat(id: number): Promise<{ success: boolean }> {
  const res = await fetch(`/api/stats/${id}`, { method: "DELETE" });
  return res.json();
}
