import {
  House,User,Brain,FolderGit2,Mail,
  Code2, 
  Layout,
  Zap,
  Terminal,
  Database,
  Layers,
  FileCode,
  FileCode2,
  Code,
  DatabaseBackup,
  Cloud,
  Shuffle,
  Share2,
  GitBranch,
  Github,
  Triangle,
  Globe
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

  // New Skills 👇
  { id: 7, name: 'JavaScript', category: 'Languages', icon: "FileCode", color: 'text-yellow-400', level: 95 },
  { id: 8, name: 'Python', category: 'Languages', icon: "FileCode2", color: 'text-yellow-500', level: 75 },
  { id: 9, name: 'PHP', category: 'Languages', icon: "Code", color: 'text-indigo-500', level: 80 },

  { id: 10, name: 'MongoDB', category: 'Database', icon: "Database", color: 'text-green-400', level: 85 },
  { id: 11, name: 'SQL', category: 'Database', icon: "DatabaseBackup", color: 'text-blue-500', level: 82 },
  { id: 12, name: 'Supabase', category: 'Backend', icon: "Cloud", color: 'text-green-300', level: 88 },

  { id: 13, name: 'Redux', category: 'Frontend', icon: "Shuffle", color: 'text-purple-500', level: 80 },
  { id: 14, name: 'REST API', category: 'Backend', icon: "Share2", color: 'text-orange-400', level: 85 },

  { id: 15, name: 'Git', category: 'Tools', icon: "GitBranch", color: 'text-orange-500', level: 90 },
  { id: 16, name: 'GitHub', category: 'Tools', icon: "Github", color: 'text-white', level: 92 },

  { id: 17, name: 'Vercel', category: 'Deployment', icon: "Triangle", color: 'text-white', level: 90 },
  { id: 18, name: 'Netlify', category: 'Deployment', icon: "Globe", color: 'text-teal-400', level: 88 },
];