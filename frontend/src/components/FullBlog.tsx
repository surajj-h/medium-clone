import { Avatar } from "./BlogCard";

interface BlogProps {
  authorName: string;
  title: string;
  content: string;
  id: string;
  publishedDate: string;
  authorDescription: string;
  totalPostCount: number;
}

export const FullBlog = ({
  authorName,
  title,
  content,
  publishedDate,
  id,
  authorDescription,
  totalPostCount
}: BlogProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
        <div className="lg:col-span-3 space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            {title}
          </h1>
          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Published on {publishedDate}
          </div>
          <div style={{ whiteSpace: "pre-wrap" }} className="prose prose-lg dark:prose-invert max-w-none">
            {content}
          </div>
        </div>

        <div className="hidden lg:block absolute -left-4 h-full" style={{ left: '75%' }}>
          <div className="w-px h-full bg-gradient-to-b from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
        </div>

        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-20 space-y-6">
            <div className="flex flex-col items-center p-6 bg-white dark:bg-black rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
              <Avatar authorName={authorName} size={12} />
              <div className="mt-4 text-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {authorName[0].toUpperCase() + authorName.slice(1)}
                </h2>
                <p className="mt-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                  {totalPostCount} Blogs
                </p>

                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {authorDescription}
                  </p>
                </div>
              </div>
              <div className="mt-6 w-full">
                <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                  View Profile
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
