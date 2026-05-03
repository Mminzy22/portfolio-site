export function extractBlogLink(feature: string): { text: string; blogUrl: string | null } {
  const blogLinkPattern = /\[blog:(https?:\/\/[^\]]+)\]$/
  const match = feature.match(blogLinkPattern)

  if (!match) {
    return { text: feature, blogUrl: null }
  }

  return {
    text: feature.replace(blogLinkPattern, "").trim(),
    blogUrl: match[1],
  }
}
