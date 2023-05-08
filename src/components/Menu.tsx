"use client";
import { useState, useEffect, useRef } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";

import { useSession } from "next-auth/react";

export const Menu: React.FC = () => {
  const { data } = useSession();
  const user = data?.user;
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!user) {
    return null;
  }

  return (
    <nav className="bg-gray-800 text-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="text-xl font-semibold">Logo</div>
        <div className="flex items-center space-x-6">
          <a href="#" className="hover:text-yellow-400">
            <Link href="/workout" passHref>
              Workout
            </Link>
          </a>
          <div ref={dropdownRef} className="relative inline-block text-left">
            <button onClick={toggleDropdown} className="inline-flex justify-center items-center space-x-2">
              <img src={user.image || ""} className="rounded-full w-8 h-8 " />
            </button>
            {dropdownOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                    Your Profile
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                    Settings
                  </a>
                  <a href="#" onClick={() => signOut()} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                    Sign out
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
