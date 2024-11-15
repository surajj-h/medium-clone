import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  blogid: string
}

export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
  blogid
}: BlogCardProps) => {
  return <Link to={`/blog/${blogid}`}><div className="border-b-2 py-6 cursor-pointer">
    <div className="flex items-center pb-2">
      <Avatar authorName={authorName} size={6} />
      <div className="font-thin px-2 ">{authorName[0].toUpperCase() + authorName.slice(1, authorName.length)}</div>
    </div>
    <div className="text-2xl font-bold pb-2">
      {title}
    </div>
    <div className="text-slate-500 dark:text-slate-300 font-extralight pb-3">
      {content.slice(0, 150)}...
    </div>
    <div className="flex items-center">
      <div className="font-thin text-sm pr-2">
        {publishedDate}
      </div>
      <div className="font-thin text-sm px-2">
        {Math.ceil(content.length / 100)} minute read
      </div>
    </div>
  </div>
  </Link>
}

export function Avatar({ authorName, size }: { authorName: string, size: number }) {
  return <div className={`relative inline-flex items-center justify-center w-${size} h-${size} overflow-hidden bg-slate-800 rounded-full dark:bg-slate-200`}>
    <span className="font-medium text-slate-200 dark:text-slate-800">{authorName[0].toUpperCase()}</span>
  </div>
}
