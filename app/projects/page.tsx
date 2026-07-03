import type React from "react"
import { getAllProjects } from "../../lib/projects"

export default function Projects() {
  const projects = getAllProjects()

  return (
    <main className="mx-auto flex max-w-[72ch] flex-col gap-15 p-6 sm:py-24">
      <nav className="animate-fade-in flex gap-4 text-sm [--stagger:0]">
        <a href="/">home</a>
        <a href="/projects">projects</a>
        <a href="/writings">writings</a>
      </nav>

      <header className="animate-fade-in flex flex-col gap-4 [--stagger:1]">
        <h1 className="text-lg font-medium">projects</h1>
        <p className="text-base text-muted-foreground">things i've built and shipped</p>
      </header>

      <section className="flex flex-col gap-6">
        {projects.map((project, i) => (
          <div key={project.slug} className="animate-fade-in" style={{ "--stagger": i + 2 } as React.CSSProperties}>
            <a href={project.url} className="font-medium" target="_blank" rel="noopener noreferrer">
              {project.name}
            </a>{" "}
            <span className="text-muted-foreground">— {project.description}</span>
          </div>
        ))}
      </section>
    </main>
  )
}
