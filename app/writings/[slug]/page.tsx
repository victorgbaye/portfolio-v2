import type React from "react"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import { getPostBySlug, getPostSlugs, extractHeadings } from "../../../lib/posts"
import { TableOfContents } from "./TableOfContents"
import { ScalingDiagram } from "../../../components/illustrations/ScalingDiagram"

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }))
}

export default async function WritingPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const slugs = getPostSlugs()

  if (!slugs.includes(slug)) {
    notFound()
  }

  const post = getPostBySlug(slug)
  const headings = extractHeadings(post.content)

  const mdxComponents = {
    h2: (props: React.ComponentPropsWithoutRef<"h2">) => {
      const heading = headings.find((h) => h.text === textFromChildren(props.children) && h.depth === 2)
      return (
        <h2 id={heading?.id} className="mt-10 mb-4 text-xl font-medium scroll-mt-20">
          {props.children}
        </h2>
      )
    },
    h3: (props: React.ComponentPropsWithoutRef<"h3">) => {
      const heading = headings.find((h) => h.text === textFromChildren(props.children) && h.depth === 3)
      return (
        <h3 id={heading?.id} className="mt-8 mb-3 text-lg font-medium scroll-mt-20">
          {props.children}
        </h3>
      )
    },
    p: (props: React.ComponentPropsWithoutRef<"p">) => (
      <p className="mb-4 leading-relaxed text-base" {...props} />
    ),
    ul: (props: React.ComponentPropsWithoutRef<"ul">) => (
      <ul className="mb-4 list-disc pl-6 leading-relaxed" {...props} />
    ),
    code: (props: React.ComponentPropsWithoutRef<"code">) => {
      const isBlock = typeof props.className === "string" && props.className.startsWith("language-")
      if (isBlock) {
        return <code {...props} />
      }
      return <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm" {...props} />
    },
    pre: (props: React.ComponentPropsWithoutRef<"pre">) => (
      <pre
        className="mb-6 overflow-x-auto rounded-lg border border-border bg-muted/50 p-4 font-mono text-sm leading-relaxed"
        {...props}
      />
    ),
    ScalingDiagram,
  }

  return (
    <main className="mx-auto flex max-w-[72ch] flex-col gap-8 p-6 sm:py-24 lg:max-w-[calc(72ch+16rem)]">
      <nav className="animate-fade-in flex gap-1 text-sm text-muted-foreground [--stagger:0]">
        <a href="/">home</a>
        <span>/</span>
        <a href="/writings">writings</a>
        <span>/</span>
        <span>{post.title}</span>
      </nav>

      <div className="flex gap-12">
        <div className="min-w-0 flex-1">
          <header className="animate-fade-in mb-10 flex flex-col gap-1 [--stagger:1]">
            <h1 className="text-2xl font-medium">{post.title}</h1>
            <p className="text-sm text-muted-foreground">Victor Gbaye</p>
            <time className="text-sm text-muted-foreground">{post.date}</time>
          </header>

          <article className="animate-fade-in [--stagger:2]">
            <MDXRemote source={post.content} components={mdxComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
          </article>
        </div>

        <TableOfContents headings={headings} />
      </div>
    </main>
  )
}

function textFromChildren(children: React.ReactNode): string {
  if (typeof children === "string") return children
  if (Array.isArray(children)) return children.map(textFromChildren).join("")
  return ""
}
