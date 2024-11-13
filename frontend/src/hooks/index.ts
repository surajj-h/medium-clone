import axios from "axios";
import { useEffect, useState } from "react"

interface Blog {
  "title": string;
  "content": string;
  "id": number;
  "author": {
    "name": string
  }
}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true)
  const [blogs, setBlogs] = useState<Blog[]>([]);
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
