import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard"
import { ModeToggle } from "./mode-toggle"
import { useState, useEffect } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const Appbar = () => {
  const location = useLocation()
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setIsScrolled(currentScrollPos > 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-3 transition-all duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'
        } ${isScrolled
          ? 'bg-background/70 backdrop-blur-md border-b'
          : 'bg-transparent border-b'
        }`}
    >
      <div className="text-3xl font-sans font-bold relative z-50">
        <Link to={'/blogs'}>
          Medium
        </Link>
      </div>
      <div className="flex items-center gap-4 relative z-0">
        {location.pathname !== '/publish' &&
          <Link to={'/publish'}>
            <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-1 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">New</button>
          </Link>
        }
        <ModeToggle />
        <div className="relative z-0">

          <DropdownMenu>
            <DropdownMenuTrigger> <Avatar authorName={localStorage.getItem('userName') || ""} size={9} /></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{localStorage.getItem('userName')}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {
                localStorage.setItem('jwtToken', " ")
                localStorage.setItem('userName', " ")
                navigate('/signup')
              }}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>

      </div>
    </div>
  );
}
