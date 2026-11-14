import data from "../content/site.json";

import { resolveContentUrls } from "./urls";

export const site = resolveContentUrls(data);

/** Projects in display order, used by the carousel and the case study pages. */
export async function getProjects({ include = [] }: { include?: string[] } = {}) {
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
      libraryCover?: string;
      libraryCoverAlt?: string;
      cardNote?: string;
    };
  }>("../content/projects/*.md", { eager: true });
  return Object.entries(files)
    .map(([path, file]) => ({ id: path.split("/").pop()!.replace(/\.md$/, ""), data: resolveContentUrls(file.frontmatter) }))
    .filter((project) => project.data.library !== false || include.includes(project.id))
    .sort((a, b) => (a.data.order ?? 0) - (b.data.order ?? 0));
}

/** Original films and theatre share the originals library; commissioned work stays separate. */
export function isOriginalFilm(project: Awaited<ReturnType<typeof getProjects>>[number]) {
  const commissioned = new Set(["puddy-waters"]);
  return !commissioned.has(project.id) && /narrative|documentary|original film|original theatre/i.test(project.data.category);
}
