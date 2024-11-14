import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard"
import { ModeToggle } from "./mode-toggle"
import { useState, useEffect } from 'react'

export const Appbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

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
        <ModeToggle />
        <div className="relative z-0">
          <Avatar authorName="Suraj" size={9} />
        </div>

      </div>
    </div>
  );
}
