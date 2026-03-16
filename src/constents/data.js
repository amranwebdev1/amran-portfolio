import {
  House,User,Brain,FolderGit2,Mail,Code2, 
  Terminal, 
  Cpu, 
  Globe, 
  Database, 
  Layout, 
  Layers, 
  Zap,
  ChevronRight,
  ExternalLink
} from "lucide-react"
export const navbarItem = [
  {title:"Home",href:"/",icon:House},
  {title:"About",href:"/about",icon:User},
  {title:"Skill",href:"/skill",icon:Brain},
  {title:"Project",href:"/project",icon:FolderGit2},
  {title:"Contact",href:"/contact",icon:Mail},
  ]
  
  
// স্যাম্পল স্কিল ডেটা
export const skills = [
  { id: 1, name: 'React.js', category: 'Frontend', icon: "Layout", color: 'text-blue-400', level: 90 },
  { id: 2, name: 'Next.js', category: 'Frontend', icon: "Zap", color: 'text-white', level: 95 },
  { id: 3, name: 'Node.js', category: 'Backend', icon: "Terminal", color: 'text-green-500', level: 85 },
  { id: 4, name: 'PostgreSQL', category: 'Database', icon: "Database", color: 'text-indigo-400', level: 80 },
  { id: 5, name: 'TypeScript', category: 'Languages', icon: "Code2", color: 'text-blue-600', level: 88 },
  { id: 6, name: 'Tailwind CSS', category: 'Design', icon: "Layers", color: 'text-cyan-400', level: 92 },
];