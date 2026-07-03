export type Project = {
  slug: string
  name: string
  url: string
  description: string
}

export const projects: Project[] = [
  {
    slug: "safeclone",
    name: "safeclone",
    url: "https://safeclone.dev",
    description:
      "open-source cli tool that scans any github repo for hardcoded secrets, vulnerable dependencies, and malicious install scripts before cloning. built in go, runs scanners in a docker sandbox on a remote server so nothing untrusted touches your machine.",
  },
  {
    slug: "bukeen",
    name: "bukeen",
    url: "https://bukeen.com",
    description:
      "b2b2c appointment booking platform for service businesses. businesses manage their schedules and clients book directly. Built for scale across multiple business types and locations.",
  },
]

export function getAllProjects(): Project[] {
  return projects
}
