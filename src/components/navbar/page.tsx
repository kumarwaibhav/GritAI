"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { Sun, Moon } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Loader from "@/components/loader/page";

interface NavProps {
  userDetails: any;
  userRole: any;
  loading: any;
}

const Nav: React.FC<NavProps> = ({ userDetails, userRole, loading }) => {
  const [isDark, setIsDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const dark = saved !== "light";
    setIsDark(dark);
    document.documentElement.classList.toggle("light", !dark);

    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
    document.documentElement.classList.toggle("light", !next);
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      localStorage.removeItem("token");
      toast.success("Signed out");
      router.push("/login");
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const getInitials = (name: string) =>
    name.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2);

  const isLoggedIn = userRole === "user" || userRole === "admin";

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50"
        style={{ background: "rgb(var(--bg-base))" }}>
        <Loader />
      </div>
    );
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? isDark ? "rgba(9,9,11,0.85)" : "rgba(255,255,255,0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgb(var(--border-subtle))" : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-10 h-16 flex items-center justify-between gap-6">

        {/* Brand */}
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-0 flex-shrink-0 outline-none group"
          aria-label="Go to home"
        >
          <div className="transition-transform duration-150 group-hover:scale-110 flex-shrink-0 w-[68px] h-[68px]" style={{ marginRight: "-13px" }}>
            <Image src="/logo-icon.png" alt="Grit AI" width={68} height={68} className="w-full h-full object-contain" priority />
          </div>
          <span
            className="font-black text-[32px] leading-none transition-opacity duration-150 group-hover:opacity-80"
            style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.03em" }}
          >
            <span className="brand-gradient-text">Grit</span>
            <span style={{ color: "rgb(var(--text-primary))" }}> AI</span>
          </span>
        </button>

        {/* Center nav links - logged-in only */}
        {isLoggedIn && (
          <nav className="hidden md:flex items-center gap-0.5" aria-label="Main navigation">
            {[
              { label: "Dashboard", href: "/" },
              { label: "Profile", href: "/profile" },
            ].map((l) => (
              <button
                key={l.label}
                onClick={() => router.push(l.href)}
                className="px-3.5 py-2 text-[13px] font-medium rounded-lg transition-all duration-150 outline-none"
                style={{ color: "rgb(var(--text-secondary))" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "rgb(var(--text-primary))"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgb(var(--text-secondary))"; e.currentTarget.style.background = "transparent"; }}
              >
                {l.label}
              </button>
            ))}
          </nav>
        )}

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all outline-none"
            style={{ color: "rgb(var(--text-muted))" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgb(var(--text-primary))"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgb(var(--text-muted))"; }}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            aria-label="Toggle theme"
          >
            {isDark
              ? <Sun className="w-4 h-4" />
              : <Moon className="w-4 h-4" />}
          </button>

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="relative w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white transition-all outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                  style={{ background: "linear-gradient(135deg, #F97316, #EF4444)" }}
                  aria-label="User menu"
                >
                  {userDetails ? getInitials(userDetails.name) : "?"}
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-[rgb(9,9,11)] rounded-full" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-52 mt-2 rounded-xl p-1 shadow-2xl"
                style={{
                  background: "rgb(var(--bg-surface-2))",
                  border: "1px solid rgb(var(--border-subtle))",
                  color: "rgb(var(--text-primary))",
                }}
              >
                {userDetails && (
                  <>
                    <div className="px-3 py-2.5">
                      <p className="text-sm font-bold truncate" style={{ fontFamily: "var(--font-syne)" }}>
                        {userDetails.name}
                      </p>
                      <p className="text-xs truncate mt-0.5" style={{ color: "rgb(var(--text-muted))" }}>
                        {userDetails.email}
                      </p>
                    </div>
                    <DropdownMenuSeparator className="my-1" style={{ background: "rgb(var(--border-subtle))" }} />
                  </>
                )}
                <DropdownMenuItem
                  onClick={() => router.push("/")}
                  className="rounded-lg text-sm cursor-pointer px-3 py-2 transition-colors"
                >
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/profile")}
                  className="rounded-lg text-sm cursor-pointer px-3 py-2 transition-colors"
                >
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-1" style={{ background: "rgb(var(--border-subtle))" }} />
                <DropdownMenuItem
                  onClick={logout}
                  className="rounded-lg text-sm cursor-pointer px-3 py-2 transition-colors"
                  style={{ color: "#f87171" }}
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <button
                onClick={() => router.push("/login")}
                className="hidden sm:block text-[13px] font-medium px-4 py-1.5 rounded-lg transition-all outline-none"
                style={{ color: "rgb(var(--text-secondary))" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "rgb(var(--text-primary))"}
                onMouseLeave={(e) => e.currentTarget.style.color = "rgb(var(--text-secondary))"}
              >
                Sign In
              </button>
              <button
                onClick={() => router.push("/signup")}
                className="btn-fire text-[13px] px-4 py-1.5 rounded-lg font-semibold"
              >
                Get Started
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Nav;
