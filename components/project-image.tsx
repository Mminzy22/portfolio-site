"use client"

import { useState } from "react"
import Image from "next/image"

interface ProjectImageProps {
  src: string
  alt: string
  fill?: boolean
}

export default function ProjectImage({ src, alt, fill = true }: ProjectImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [isError, setIsError] = useState(false)

  const handleError = () => {
    if (!isError) {
      setImgSrc("/placeholder.svg?height=400&width=600")
      setIsError(true)
    }
  }

  if (fill) {
    return (
      <Image
        src={imgSrc || "/placeholder.svg?height=400&width=600"}
        alt={alt}
        fill
        className="object-cover"
        onError={handleError}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={src.includes("project1") || src.includes("project2")}
      />
    )
  }

  return (
    <Image
      src={imgSrc || "/placeholder.svg?height=400&width=600"}
      alt={alt}
      width={800}
      height={0}
      style={{ width: "100%", height: "auto" }}
      className="rounded-lg"
      onError={handleError}
      priority={src.includes("project1") || src.includes("project2")}
    />
  )
}
