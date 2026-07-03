import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "content/writings")

export type PostMeta = {
  slug: string
  title: string
  date: string
  summary: string
}

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(postsDirectory).filter((file) => file.endsWith(".mdx"))

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "")
    const source = fs.readFileSync(path.join(postsDirectory, file), "utf8")
    const { data } = matter(source)

    return {
      slug,
      title: data.title as string,
      date: data.date as string,
      summary: data.summary as string,
    }
  })

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostSlugs(): string[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
}

export function getPostBySlug(slug: string) {
  const source = fs.readFileSync(path.join(postsDirectory, `${slug}.mdx`), "utf8")
  const { data, content } = matter(source)

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    summary: data.summary as string,
    content,
  }
}

export type Heading = {
  id: string
  text: string
  depth: number
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
}

export function extractHeadings(markdown: string): Heading[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const headings: Heading[] = []
  let match: RegExpExecArray | null

  while ((match = headingRegex.exec(markdown)) !== null) {
    const depth = match[1].length
    const text = match[2].trim()
    headings.push({ id: slugify(text), text, depth })
  }

  return headings
}
