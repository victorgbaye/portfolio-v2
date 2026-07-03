"use client"

import { useState } from "react"

const MIN_INSTANCES = 1
const MAX_INSTANCES = 6

export function ScalingDiagram() {
  const [instances, setInstances] = useState(2)
  const load = Math.round(100 / instances)

  return (
    <div className="my-8 rounded-lg border border-border bg-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
          horizontal scaling
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setInstances((n) => Math.max(MIN_INSTANCES, n - 1))}
            disabled={instances <= MIN_INSTANCES}
            className="flex h-7 w-7 items-center justify-center rounded border border-border text-sm transition-colors hover:bg-muted disabled:opacity-30 disabled:hover:bg-transparent"
            aria-label="Remove server instance"
          >
            −
          </button>
          <span className="w-6 text-center text-sm tabular-nums">{instances}</span>
          <button
            type="button"
            onClick={() => setInstances((n) => Math.min(MAX_INSTANCES, n + 1))}
            disabled={instances >= MAX_INSTANCES}
            className="flex h-7 w-7 items-center justify-center rounded border border-border text-sm transition-colors hover:bg-muted disabled:opacity-30 disabled:hover:bg-transparent"
            aria-label="Add server instance"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex h-12 w-20 shrink-0 items-center justify-center rounded border border-border text-center text-xs text-muted-foreground">
          load
          <br />
          balancer
        </div>

        <div className="flex flex-1 flex-wrap gap-3">
          {Array.from({ length: instances }).map((_, i) => (
            <div
              key={i}
              className="flex h-12 min-w-16 flex-1 flex-col items-center justify-center rounded border border-border text-center transition-all duration-300"
            >
              <span className="text-xs font-medium">server {i + 1}</span>
              <span className="font-mono text-[10px] text-muted-foreground">~{load}%</span>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        add instances and watch load per server drop — until something (shared state, a hot key,
        a slow query) stops it from being that simple.
      </p>
    </div>
  )
}
