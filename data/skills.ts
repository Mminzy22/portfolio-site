import type { Skill, SkillCategory } from "@/types/skill"

export const skillCategories: SkillCategory[] = ["Language", "Backend", "AI/ML", "Database", "DevOps", "Cloud", "Tools"]

export const skills: Skill[] = [
  { name: "Python", category: "Language", link: "https://mminzy22.github.io/tags/python/" },
  { name: "Java", category: "Language", link: "https://mminzy22.github.io/tags/java/" },
  { name: "Django", category: "Backend", link: "https://mminzy22.github.io/tags/django/" },
  { name: "Django Channels", category: "Backend", link: "https://mminzy22.github.io/tags/django-channels/" },
  { name: "WebSocket", category: "Backend", link: "https://mminzy22.github.io/tags/websocket/" },
  { name: "Celery", category: "Backend", link: "https://mminzy22.github.io/tags/celery/" },
  { name: "Spring Boot", category: "Backend", link: "https://mminzy22.github.io/tags/springboot/" },
  { name: "LangChain", category: "AI/ML", link: "https://mminzy22.github.io/tags/langchain/" },
  { name: "LangGraph", category: "AI/ML", link: "https://mminzy22.github.io/tags/langgraph/" },
  { name: "CrewAI", category: "AI/ML", link: "https://mminzy22.github.io/tags/crewai/" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Redis", category: "Database", link: "https://mminzy22.github.io/tags/redis/" },
  { name: "MySQL", category: "Database", link: "https://mminzy22.github.io/tags/mysql/" },
  { name: "OracleDB", category: "Database" },
  { name: "Docker", category: "DevOps", link: "https://mminzy22.github.io/tags/docker/" },
  { name: "GitHub Actions", category: "DevOps", link: "https://mminzy22.github.io/tags/github-actions/" },
  { name: "Nginx", category: "DevOps" },
  { name: "AWS", category: "Cloud", link: "https://mminzy22.github.io/tags/aws/" },
  { name: "Git", category: "Tools" },
  { name: "VSCode", category: "Tools" },
  { name: "Postman", category: "Tools" },
  { name: "Notion", category: "Tools" },
  { name: "Discord", category: "Tools" },
  { name: "Slack", category: "Tools" },
]
