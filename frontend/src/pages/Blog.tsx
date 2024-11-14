import { Appbar } from "@/components/Appbar";
import { FullBlog } from "@/components/FullBlog"
import { useBlog } from "@/hooks"
import { useParams } from "react-router-dom"

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || " " })

  if (loading) return <div>Loading...</div>
  if (!blog) return <div>Blog not found</div>
  return <div>
    <Appbar />
    <div className="pt-20">
      <FullBlog authorName={blog.author.name} title={blog.title} content={blog.content} publishedDate="23 Dec 2024" id={blog.id} authorDescription={blog.author.description} totalPostCount={blog.author.totalPostCount} />
    </div>
  </div>
}
