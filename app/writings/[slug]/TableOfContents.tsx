"use client"

import { useEffect, useState } from "react"
import type { Heading } from "../../../lib/posts"

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) {
          setActiveId(visible.target.id)
        }
      },
      { rootMargin: "0% 0% -80% 0%" }
    )

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav className="sticky top-16 hidden w-56 shrink-0 self-start lg:block">
      <p className="mb-3 text-sm text-muted-foreground">Table of Contents</p>
      <ul className="flex flex-col gap-2 border-l">
        {headings.map((heading) => (
          <li key={heading.id} style={{ paddingLeft: heading.depth === 3 ? "1.5rem" : "1rem" }}>
            <a
              href={`#${heading.id}`}
              className={`block text-sm no-underline transition-colors ${
                activeId === heading.id
                  ? "font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
