import { Appbar } from "@/components/Appbar";
import { FullBlog } from "@/components/FullBlog";
import { useBlog } from "@/hooks";
import { useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || " " });

  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
              <div className="lg:col-span-3 space-y-6">
                <Skeleton className="h-12 w-3/4" />

                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-32" />
                </div>

                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-11/12" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-9/12" />
                </div>
              </div>

              <div className="hidden lg:block absolute -left-4 h-full" style={{ left: '75%' }}>
                <div className="w-px h-full bg-gradient-to-b from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
              </div>

              <div className="hidden lg:block lg:col-span-1">
                <div className="sticky top-8 space-y-6">
                  <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                    <Skeleton className="h-12 w-12 rounded-full" />

                    <div className="mt-4 text-center w-full">
                      <Skeleton className="h-6 w-32 mx-auto" />

                      <Skeleton className="h-4 w-16 mx-auto mt-1" />

                      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                        <div className="space-y-2">
                          <Skeleton className="h-3 w-full" />
                          <Skeleton className="h-3 w-5/6" />
                          <Skeleton className="h-3 w-4/6" />
                        </div>
                      </div>
                    </div>

                    <Skeleton className="h-9 w-full mt-6" />
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-4">
                    <div className="grid grid-cols-1 gap-4 text-center">
                      <div>
                        <Skeleton className="h-8 w-16 mx-auto" />
                        <Skeleton className="h-4 w-12 mx-auto mt-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) return <div>Blog not found</div>;

  return (
    <div>
      <Appbar />
      <div className="pt-20">
        <FullBlog
          authorName={blog.author.name}
          title={blog.title}
          content={blog.content}
          publishedDate={blog.publishedDate}
          id={blog.id}
          authorDescription={blog.author.description}
          totalPostCount={blog.author.totalPostCount}
        />
      </div>
    </div>
  );
};
