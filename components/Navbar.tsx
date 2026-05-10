"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: session, status } = useSession();

  const isAdmin = (session?.user as any)?.role === 'admin'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 flex items-center justify-between px-20 transition-all duration-400
      ${scrolled ? "py-3 bg-mainWhite shadow-md" : "py-6 bg-mainGreen"}`}>

      {/* Logo */}
      <img
        src={`${scrolled ? "/images/logoNameColor.png" : "/images/LogoWhite.png"}`}
        alt="Bean & Bloom"
        className={`transition-all duration-300 ${scrolled ? "w-28" : "w-12"}`}
      />

      {/* Links */}
      <div className={`text-sm flex gap-16 font-light transition-all duration-200 ${scrolled ? "text-secondaryGreen" : "text-secondaryWhite/80"}`}>
        <Link href="/" className={`${scrolled ? "hover:text-mainGreen transition" : "hover:text-mainWhite transition"}`}>Home</Link>
        <Link href="/order" className={`${scrolled ? "hover:text-mainGreen transition" : "hover:text-mainWhite transition"}`}>Order Now</Link>
        <Link href="/reservation" className={`${scrolled ? "hover:text-mainGreen transition" : "hover:text-mainWhite transition"}`}>Reservation</Link>
      </div>

      {/* Auth */}
      <div>
        {status === "loading" ? (
          <div className="w-8 h-8 rounded-full bg-mainWhite/20 animate-pulse" />

        ) : session ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(o => !o)}
              className="flex items-center gap-2 cursor-pointer bg-transparent border-none focus:outline-none group"
            >
              <div className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-all duration-200 ${scrolled ? "border-mainGreen/30 group-hover:border-mainGreen" : "border-mainWhite/40 group-hover:border-mainWhite"}`}>
                {session.user?.image ? (
                  <Image src={session.user.image} alt={session.user.name || "Profile"} width={36} height={36} className="object-cover w-full h-full" />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center text-sm font-bold ${scrolled ? "bg-mainGreen text-mainWhite" : "bg-mainWhite text-mainGreen"}`}>
                    {session.user?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                )}
              </div>
              <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""} ${scrolled ? "text-secondaryGreen" : "text-mainWhite/70"}`}
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-60 bg-mainWhite rounded-2xl shadow-xl border border-mainGreen/10 overflow-hidden z-50 animate-[scaleIn_0.15s_ease-out]">

                {/* User info */}
                <div className="px-4 py-3 border-b border-mainGreen/8">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-semibold text-textBlack truncate">{session.user?.name}</p>
                    {isAdmin && (
                      <span className="text-[0.6rem] bg-mainYellow/20 text-secondaryYellow font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide shrink-0">
                        Admin
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-textBlack/40 truncate">{session.user?.email}</p>
                </div>

                {/* Admin link — only shown to admins */}
                {isAdmin && (
                  <div className="py-1.5 border-b border-mainGreen/8">
                    <Link href="/admin" onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-mainYellow hover:bg-mainYellow/8 transition-colors no-underline">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
                      </svg>
                      Manage Store
                    </Link>
                  </div>
                )}

                {/* Regular links */}
                <div className="py-1.5">
                  <Link href="/profile" onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-textBlack/70 hover:bg-mainGreen/5 hover:text-mainGreen transition-colors no-underline">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    My Profile
                  </Link>
                  <Link href="/reservation" onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-textBlack/70 hover:bg-mainGreen/5 hover:text-mainGreen transition-colors no-underline">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    My Reservations
                  </Link>
                  <Link href="/order" onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-textBlack/70 hover:bg-mainGreen/5 hover:text-mainGreen transition-colors no-underline">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                    My Orders
                  </Link>
                </div>

                {/* Sign out */}
                <div className="border-t border-mainGreen/8 py-1.5">
                  <button
                    onClick={() => { signOut({ callbackUrl: '/' }); setDropdownOpen(false) }}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-50 hover:text-red-500 transition-colors w-full text-left cursor-pointer bg-transparent border-none"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

        ) : (
          <Link href="/login/signin">
            <button className={`w-25 h-7 cursor-pointer rounded-md duration-300 ${scrolled ? "bg-mainGreen text-secondaryWhite hover:bg-secondaryGreen transition-all" : "bg-secondaryWhite text-secondaryGreen hover:bg-hoverWhite transition"}`}>
              Sign In
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}