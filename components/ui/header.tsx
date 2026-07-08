"use client";

import { useState } from "react";

import { useAppProvider } from "@/app/app-provider";
import DropdownHelp from "@/components/dropdown-help";
import Notifications from "@/components/dropdown-notifications";
import DropdownProfile from "@/components/dropdown-profile";
import SearchModal from "@/components/search-modal";
import ThemeToggle from "@/components/theme-toggle";

export default function Header({ variant = "default" }: { variant?: "default" | "v2" | "v3" }) {
  const { sidebarOpen, setSidebarOpen } = useAppProvider();
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);

  return (
    <header
      className={`sticky top-0 z-30 before:absolute before:inset-0 before:-z-10 before:backdrop-blur-md max-lg:before:bg-white/90 dark:max-lg:before:bg-gray-800/90 ${variant === "v2" || variant === "v3" ? "before:bg-white after:absolute after:inset-x-0 after:top-full after:-z-10 after:h-px after:bg-gray-200 dark:after:bg-gray-700/60" : "max-lg:shadow-sm lg:before:bg-gray-100/90 dark:lg:before:bg-gray-900/90"} ${variant === "v2" ? "dark:before:bg-gray-800" : ""} ${variant === "v3" ? "dark:before:bg-gray-900" : ""}`}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div
          className={`flex h-16 items-center justify-between ${variant === "v2" || variant === "v3" ? "" : "border-gray-200 lg:border-b dark:border-gray-700/60"}`}
        >
          {/* Header: Left side */}
          <div className="flex items-center">
            {/* Hamburger button */}
            <button
              className="text-gray-500 hover:text-gray-600 lg:hidden dark:hover:text-gray-400"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={() => {
                setSidebarOpen(!sidebarOpen);
              }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>

            {/* Template byline */}
            <a
              className="hidden text-sm font-semibold text-gray-600 transition hover:text-gray-800 lg:block dark:text-gray-300 dark:hover:text-gray-100"
              href="https://cruip.com"
              target="_blank"
              rel="noreferrer"
            >
              Dashboard Template by Cruip.com
            </a>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
            <div>
              <button
                className={`ml-3 flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 lg:hover:bg-gray-200 dark:hover:bg-gray-700/50 dark:lg:hover:bg-gray-800 ${searchModalOpen && "bg-gray-200 dark:bg-gray-800"}`}
                onClick={() => {
                  setSearchModalOpen(true);
                }}
              >
                <span className="sr-only">Search</span>
                <svg
                  className="fill-current text-gray-500/80 dark:text-gray-400/80"
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7ZM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5Z" />
                  <path d="m13.314 11.9 2.393 2.393a.999.999 0 1 1-1.414 1.414L11.9 13.314a8.019 8.019 0 0 0 1.414-1.414Z" />
                </svg>
              </button>
              <SearchModal isOpen={searchModalOpen} setIsOpen={setSearchModalOpen} />
            </div>
            <Notifications align="right" />
            <DropdownHelp align="right" />
            <ThemeToggle />
            {/*  Divider */}
            <hr className="h-6 w-px border-none bg-gray-200 dark:bg-gray-700/60" />
            <DropdownProfile align="right" />
          </div>
        </div>
      </div>
    </header>
  );
}
