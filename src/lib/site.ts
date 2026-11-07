import data from "../content/site.json";

import { resolveContentUrls } from "./urls";

export const site = resolveContentUrls(data);

/** Projects in display order, used by the carousel and the case study pages. */
export async function getProjects() {
  // Read source metadata directly: the long-running dev content store can be
  // empty after schema changes even when the static build has all entries.
  const files = import.meta.glob<{
    frontmatter: {
      title: string;
      category: string;
      subtitle?: string;
      order?: number;
      library?: boolean;
      cover: string;
      coverAlt?: string;
    };
  }>("../content/projects/*.md", { eager: true });
  return Object.entries(files)
    .map(([path, file]) => ({ id: path.split("/").pop()!.replace(/\.md$/, ""), data: resolveContentUrls(file.frontmatter) }))
    .filter((project) => project.data.library !== false)
    .sort((a, b) => (a.data.order ?? 0) - (b.data.order ?? 0));
}
