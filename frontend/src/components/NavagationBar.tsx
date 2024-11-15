export const NavagationBar = ({
  activeTab,
  onTabChange
}: {
  activeTab: string;
  onTabChange: (tab: string) => void;
}) => {
  return (
    <div className="flex gap-8 mb-8 border-b dark:border-gray-900">
      <button
        onClick={() => onTabChange('all')}
        className={`relative py-2 transition-colors duration-200 
          ${activeTab === 'all'
            ? 'text-black dark:text-white'
            : 'text-muted-foreground hover:text-primary dark:text-muted-foreground'
          }`}
      >
        For You
        {activeTab === 'all' && (
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black dark:bg-white transition-all duration-300" />
        )}
      </button>

      <button
        onClick={() => onTabChange('my')}
        className={`relative py-2 transition-colors duration-200 
          ${activeTab === 'my'
            ? 'text-black dark:text-white'
            : 'text-muted-foreground hover:text-primary dark:text-muted-foreground'
          }`}
      >
        My Blogs
        {activeTab === 'my' && (
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black dark:bg-white transition-all duration-300" />
        )}
      </button>
    </div>
  );
};
