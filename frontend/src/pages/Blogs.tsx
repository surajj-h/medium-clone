import { Appbar } from "@/components/Appbar"
import { BlogCard } from "@/components/BlogCard"
import { NavagationBar } from "@/components/NavagationBar"
import { Skeleton } from "@/components/ui/skeleton"
import { useBlogs, useCurrentUserBlogs } from "@/hooks"
import { useState } from "react"

export const Blogs = () => {
  const [activeTab, setActiveTab] = useState('all')
  const { loading, blogs } = useBlogs()
  const { isLoading: userBlogsLoading, userBlogs } = useCurrentUserBlogs()

  const isLoading = activeTab === 'all' ? loading : userBlogsLoading
  const blogsToDisplay = activeTab === 'all' ? blogs : userBlogs

  return <div>
    <Appbar />
    <div className="pt-20 flex justify-center">
      <div className="max-w-sm min-w-[384px] lg:max-w-lg lg:min-w-[512px]">
        <NavagationBar
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {isLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          blogsToDisplay?.map(blog => (
            <BlogCard
              key={blog.id}
              authorName={blog.author.name}
              title={blog.title}
              content={blog.content}
              publishedDate={blog.publishedDate}
              blogid={blog.id}
            />
          ))
        )}
      </div>
    </div>
  </div>
}

function SkeletonCard() {
  return <div className="py-6 max-w-sm lg:max-w-lg">
    <div className="flex items-center pb-2">
      <div className={`relative inline-flex items-center justify-center w-6 h-6 mr-2 overflow-hidden rounded-full`}>
        <Skeleton className="h-12 w-12" />
      </div>
      <Skeleton className="font-thin px-2 w-[60px] h-4" />
    </div>
    <Skeleton className="text-2xl font-bold pb-2 w-[375px] lg:w-[500px] h-10 my-2" />
    <Skeleton className="font-extralight pb-3 w-full h-4" />
    <div className="flex items-center mt-2">
      <Skeleton className="font-thin text-sm pr-2 w-[100px] h-4" />
      <Skeleton className="font-thin text-sm px-2 w-[100px] h-4" />
    </div>
  </div>
}
