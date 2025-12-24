'use client'
import { useEffect } from 'react'

export function VisitTracker({ path }: { path: string }) {
  useEffect(() => {
    fetch('/api/visit', {
      method: 'POST',
      body: JSON.stringify({ path }),
    })
  }, [path])

  return null
}
