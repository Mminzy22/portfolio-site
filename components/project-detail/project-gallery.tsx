"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react"
import ProjectImage from "@/components/project-image"

interface ProjectGalleryProps {
  images: string[]
  title: string
}

// 갤러리 썸네일 + 클릭하면 크게 보는 라이트박스
export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [open, setOpen] = useState<number | null>(null)

  const close = useCallback(() => setOpen(null), [])
  const move = useCallback(
    (step: number) => setOpen((i) => (i === null ? i : (i + step + images.length) % images.length)),
    [images.length],
  )

  useEffect(() => {
    if (open === null) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      if (e.key === "ArrowRight") move(1)
      if (e.key === "ArrowLeft") move(-1)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [open, close, move])

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setOpen(index)}
            className="group relative aspect-video overflow-hidden rounded-[var(--pf-r-lg)] border border-[var(--pf-border)] bg-[var(--pf-bg-2)] transition-colors hover:border-[var(--pf-border-2)]"
            aria-label={`${title} 이미지 ${index + 1} 크게 보기`}
          >
            <ProjectImage src={image} alt={`${title} 이미지 ${index + 1}`} fit="contain" />
            <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-[var(--pf-r-sm)] bg-black/55 text-white opacity-0 transition-opacity group-hover:opacity-100">
              <Maximize2 className="h-4 w-4" />
            </span>
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} 이미지 보기`}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm md:p-10"
          onClick={close}
        >
          <div className="relative h-full w-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[open]}
              alt={`${title} 이미지 ${open + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          <button type="button" onClick={close} className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-[var(--pf-r-md)] bg-white/10 text-white hover:bg-white/20" aria-label="닫기">
            <X className="h-5 w-5" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  move(-1)
                }}
                className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-[var(--pf-r-md)] bg-white/10 text-white hover:bg-white/20"
                aria-label="이전 이미지"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  move(1)
                }}
                className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-[var(--pf-r-md)] bg-white/10 text-white hover:bg-white/20"
                aria-label="다음 이미지"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono-ui text-xs tracking-[0.2em] text-white/70">
                {open + 1} / {images.length}
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
