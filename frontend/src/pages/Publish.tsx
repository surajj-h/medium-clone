import { Appbar } from "@/components/Appbar";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [publishState, setPublishState] = useState<'idle' | 'publishing' | 'published' | 'error'>('idle');
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const BACKEND_URL = import.meta.env.VITE_API_BACKEND_URL;

  const adjustTextareaHeight = () => {
    const textarea = titleRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [title]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const handlePublish = async () => {
    const date = new Date()
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
    setPublishState('publishing');
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/blog/create`, {
        title,
        content,
        publishedDate: formattedDate
      }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('jwtToken')
        }
      });

      if (response.status >= 200 && response.status < 300) {
        setPublishState('published');
        setTimeout(() => {
          navigate(`/blog/${response.data.post.id}`)
        }, 2000);
        response.data.post.id
      } else {
        setPublishState('error');
        setTimeout(() => setPublishState('idle'), 2000);
      }
    } catch (error) {
      setPublishState('error');
      setTimeout(() => setPublishState('idle'), 2000);
    }
  };

  const buttonContent = {
    idle: (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
            clipRule="evenodd"
          />
        </svg>
        Publish
      </>
    ),
    publishing: (
      <>
        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        Publishing
      </>
    ),
    published: (
      <>
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        Published
      </>
    ),
    error: (
      <>
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
        Error Publishing
      </>
    )
  };

  const buttonStyles = {
    idle: "bg-green-600 hover:bg-green-700",
    publishing: "bg-green-600 cursor-not-allowed",
    published: "bg-green-600",
    error: "bg-red-600 hover:bg-red-700"
  };

  return (
    <div className="min-h-screen bg-background">
      <Appbar />
      <style>{`
        .editor-content {
          scrollbar-width: thin;
          scrollbar-color: rgb(156 163 175 / 0.3) transparent;
        }
        
        .editor-content::-webkit-scrollbar {
          width: 6px;
        }
        
        .editor-content::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .editor-content::-webkit-scrollbar-thumb {
          background-color: rgb(156 163 175 / 0.3);
          border-radius: 20px;
          border: none;
        }

        .editor-content::-webkit-scrollbar-thumb:hover {
          background-color: rgb(156 163 175 / 0.5);
        }

        @media (prefers-color-scheme: dark) {
          .editor-content {
            scrollbar-color: rgb(75 85 99 / 0.3) transparent;
          }
          
          .editor-content::-webkit-scrollbar-thumb {
            background-color: rgb(75 85 99 / 0.3);
          }
          
          .editor-content::-webkit-scrollbar-thumb:hover {
            background-color: rgb(75 85 99 / 0.5);
          }
        }
      `}</style>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 pb-16">
        <div className="space-y-8">
          <div className="relative">
            <textarea
              ref={titleRef}
              className="w-full text-5xl font-bold tracking-tight bg-transparent border-none focus:outline-none focus:ring-0 resize-none placeholder:text-gray-400/80 dark:placeholder:text-gray-500/80 text-gray-900 dark:text-gray-100 placeholder:font-normal overflow-hidden"
              placeholder="Title"
              value={title}
              onChange={handleTitleChange}
              rows={1}
            />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
          </div>

          <textarea
            className="editor-content w-full min-h-[calc(100vh-12rem)] bg-transparent border-none focus:outline-none focus:ring-0 resize-none placeholder:text-gray-400/90 dark:placeholder:text-gray-500/80 text-gray-900 dark:text-gray-100 text-lg leading-relaxed"
            placeholder="Once upon a time in the vast landscape of ideas, a story was waiting to be told..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className="fixed bottom-6 right-6">
            <button
              className={`px-6 py-3 ${buttonStyles[publishState]} text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 font-medium flex items-center gap-2 min-w-[140px] justify-center`}
              onClick={handlePublish}
              disabled={publishState === 'publishing'}
            >
              {buttonContent[publishState]}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
