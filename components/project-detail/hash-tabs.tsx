"use client"

import { useEffect, useState, type ReactNode } from "react"
import { Tabs } from "@/components/ui/tabs"

interface HashTabsProps {
  values: string[]
  defaultValue: string
  className?: string
  children: ReactNode
}

// 선택한 탭을 주소의 #해시로 남겨서 특정 탭으로 바로 링크할 수 있게 하는 Tabs
export default function HashTabs({ values, defaultValue, className, children }: HashTabsProps) {
  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    const fromHash = () => {
      const hash = window.location.hash.slice(1)
      if (values.includes(hash)) setValue(hash)
    }
    fromHash()
    window.addEventListener("hashchange", fromHash)
    return () => window.removeEventListener("hashchange", fromHash)
  }, [values])

  const onChange = (next: string) => {
    setValue(next)
    const url = next === defaultValue ? window.location.pathname : `#${next}`
    window.history.replaceState(null, "", url)
  }

  return (
    <Tabs value={value} onValueChange={onChange} className={className}>
      {children}
    </Tabs>
  )
}
