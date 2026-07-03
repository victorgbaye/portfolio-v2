import type React from "react"
import { getAllPosts } from "../../lib/posts"

export default function Writings() {
  const posts = getAllPosts()

  return (
    <main className="mx-auto flex max-w-[72ch] flex-col gap-15 p-6 sm:py-24">
      <nav className="animate-fade-in flex gap-4 text-sm [--stagger:0]">
        <a href="/">home</a>
        <a href="/projects">projects</a>
        <a href="/writings">writings</a>
      </nav>

      <header className="animate-fade-in flex flex-col gap-4 [--stagger:1]">
        <h1 className="text-lg font-medium">writings</h1>
        <p className="text-base text-muted-foreground">
          thoughts on software engineering, web development, and technology
        </p>
      </header>

      <section className="flex flex-col gap-8">
        {posts.map((post, i) => (
          <article key={post.slug} className="animate-fade-in" style={{ "--stagger": i + 2 } as React.CSSProperties}>
            <a href={`/writings/${post.slug}`} className="group block">
              <h2 className="mb-2 text-xl font-medium">{post.title}</h2>
              <time className="mb-2 block text-sm text-muted-foreground">{post.date}</time>
              <p className="leading-relaxed text-muted-foreground">{post.summary}</p>
            </a>
          </article>
        ))}
      </section>
    </main>
  )
}
