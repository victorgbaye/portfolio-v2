import { getAllProjects } from "../lib/projects"
import { getAllPosts } from "../lib/posts"

const PREVIEW_COUNT = 2

export default function Home() {
  const projects = getAllProjects().slice(0, PREVIEW_COUNT)
  const posts = getAllPosts().slice(0, PREVIEW_COUNT)

  return (
    <main className="mx-auto flex max-w-[72ch] flex-col gap-15 p-6 sm:py-24">
      <nav className="animate-fade-in flex gap-4 text-sm [--stagger:0]">
        <a href="/">home</a>
        <a href="/projects">projects</a>
        <a href="/writings">writings</a>
      </nav>

      <header className="flex flex-col gap-8">
        <div className="animate-fade-in flex flex-col [--stagger:1]">
          <h1 className="text-lg font-medium">Victor Gbaye</h1>
          <h2 className="text-base font-light text-muted-foreground">software engineer</h2>
        </div>
        <div className="animate-fade-in flex gap-1 text-sm [--stagger:2]">
          <a href="mailto:victorgbayedev@gmail.com">email</a>
          <span className="text-muted-foreground">|</span>
          <a href="https://github.com/victorgbaye" target="_blank" rel="noopener noreferrer">github</a>
          <span className="text-muted-foreground">|</span>
          <a href="https://www.linkedin.com/in/victor-gbaye/" target="_blank" rel="noopener noreferrer">linkedin</a>
          <span className="text-muted-foreground">|</span>
          <a href="https://x.com/Victor1Mdev" target="_blank" rel="noopener noreferrer">x</a>
        </div>
        <p className="animate-fade-in text-base leading-relaxed [--stagger:3]">
          i build products end-to-end — from cli tools and apis to consumer-facing web apps.
          currently focused on systems engineering.
        </p>
      </header>

      <section className="animate-fade-in flex flex-col gap-2 [--stagger:4]">
        <h2 className="text-xl font-medium">projects</h2>

        {projects.map((project) => (
          <div key={project.slug} className="mt-4">
            <a href={project.url} className="font-medium" target="_blank" rel="noopener noreferrer">
              {project.name}
            </a>{" "}
            <span className="text-muted-foreground">— {project.description}</span>
          </div>
        ))}

        <a href="/projects" className="mt-2 text-sm">
          see all projects →
        </a>
      </section>

      <section className="animate-fade-in flex flex-col gap-2 [--stagger:5]">
        <h2 className="text-xl font-medium">writings</h2>

        {posts.map((post) => (
          <div key={post.slug} className="mt-4">
            <a href={`/writings/${post.slug}`} className="font-medium">
              {post.title}
            </a>
          </div>
        ))}

        <a href="/writings" className="mt-2 text-sm">
          see all writings →
        </a>
      </section>
    </main>
  )
}
