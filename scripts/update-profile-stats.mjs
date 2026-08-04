import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const username = process.env.GITHUB_REPOSITORY_OWNER || "langningchen";
const token = process.env.GITHUB_TOKEN;
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = resolve(root, "public/github-stats.svg");
const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": `${username}-profile-stats`,
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
  "X-GitHub-Api-Version": "2022-11-28",
};

async function getJson(url) {
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`GitHub API request failed: ${response.status} ${url}`);
  }
  return response.json();
}

function searchTotal(query) {
  const url = new URL("https://api.github.com/search/issues");
  url.searchParams.set("per_page", "1");
  url.searchParams.set("q", query);
  return getJson(url).then((response) => response.total_count);
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

function metricCard({ label, value }, index) {
  const x = 28 + index * 191;
  return `
    <g transform="translate(${x} 92)">
      <rect width="173" height="88" rx="6" fill="#161b22" stroke="#30363d"/>
      <text x="16" y="35" fill="#87dbac" font-size="25" font-weight="700">${escapeXml(formatNumber(value))}</text>
      <text x="16" y="63" fill="#9da7b1" font-size="13">${escapeXml(label)}</text>
    </g>`;
}

const [profile, repositories, pullRequests, issues] = await Promise.all([
  getJson(`https://api.github.com/users/${username}`),
  getJson(`https://api.github.com/users/${username}/repos?per_page=100&type=owner&sort=updated`),
  searchTotal(`author:${username} type:pr is:public`),
  searchTotal(`author:${username} type:issue is:public`),
]);

const totalStars = repositories
  .filter((repository) => !repository.fork)
  .reduce((total, repository) => total + repository.stargazers_count, 0);
const profileYear = new Date(profile.created_at).getUTCFullYear();
const metrics = [
  { label: "Public repositories", value: profile.public_repos },
  { label: "Repository stars", value: totalStars },
  { label: "Pull requests", value: pullRequests },
  { label: "Issues opened", value: issues },
];
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="220" viewBox="0 0 800 220" role="img" aria-labelledby="title description">
  <title id="title">Langning Chen's GitHub statistics</title>
  <desc id="description">Public repositories, stars, pull requests, and issues.</desc>
  <rect x="0.5" y="0.5" width="799" height="219" rx="8" fill="#0d1117" stroke="#30363d"/>
  <text x="28" y="40" fill="#f0f0f0" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif" font-size="22" font-weight="700">GitHub activity</text>
  <text x="28" y="65" fill="#9da7b1" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif" font-size="13">Public open-source work since ${profileYear}</text>
  <g font-family="-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif">${metrics.map(metricCard).join("")}
  </g>
  <text x="28" y="204" fill="#87dbac" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif" font-size="12">github.com/${escapeXml(username)}</text>
</svg>
`;

await mkdir(dirname(outputPath), { recursive: true });
const current = await readFile(outputPath, "utf8").catch(() => "");
if (current === svg) {
  console.log("GitHub profile statistics are already current");
} else {
  await writeFile(outputPath, svg);
  console.log("Updated GitHub profile statistics");
}
