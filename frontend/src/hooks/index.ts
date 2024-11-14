import axios from "axios";
import { useEffect, useState } from "react"

interface Blogs {
  "title": string;
  "content": string;
  "id": string;
  "author": {
    "name": string,

  }
}

interface Blog {
  "title": string;
  "content": string;
  "id": string;
  "author": {
    "name": string,
    "description": string,
    "totalPostCount": number
  }
}


export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true)
  const [blog, setBlog] = useState<Blog>();
  const BACKEND_URL = import.meta.env.VITE_API_BACKEND_URL;

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('jwtToken')
      }
    }).then(response => {
      setBlog(response.data.blog)
      setLoading(false)
    })
  }, [])

  return {
    loading,
    blog
  }
}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true)
  const [blogs, setBlogs] = useState<Blogs[]>([]);
  const BACKEND_URL = import.meta.env.VITE_API_BACKEND_URL;

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('jwtToken')
      }
    }).then(response => {
      setBlogs(response.data.blogs)
      setLoading(false)
    })
  }, [])

  return {
    loading,
    blogs
  }
}
