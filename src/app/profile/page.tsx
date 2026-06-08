"use client";
export const dynamic = "force-dynamic";

import React, { useState, useEffect } from "react";
import axios from "axios";
import dynamicImport from "next/dynamic";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { CalendarIcon } from "@radix-ui/react-icons";
import Nav from "@/components/navbar/page";
import Loader from "@/components/loader/page";
import CopyRight from "@/components/copybar/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Calendar = dynamicImport(
  () => import("@/components/ui/calendar").then((m) => m.Calendar),
  { ssr: false }
);

const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div
    className="rounded-2xl p-6"
    style={{
      background: "rgb(var(--bg-surface-1))",
      border: "1px solid rgb(var(--border-subtle))",
    }}
  >
    <h3
      className="text-lg font-black mb-5"
      style={{ fontFamily: "var(--font-syne)", color: "rgb(var(--text-primary))", letterSpacing: "-0.02em" }}
    >
      {title}
    </h3>
    {children}
  </div>
);

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [userRole, setUserRole] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [editableName, setEditableName] = useState("");
  const [gender, setGender] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [updating, setUpdating] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get("/api/users/me");
        const d = data.data;
        setUserDetails(d);
        setUserRole(d.role);
        setDate(d.dateOfBirth ? new Date(d.dateOfBirth) : undefined);
        setEditableName(d.name);
        setGender(d.gender || "");
        setLoading(false);
      } catch {
        await axios.get("/api/users/logout").catch(() => {});
        localStorage.removeItem("token");
        router.push("/login");
      }
    };
    fetchUserData();
  }, [router]);

  const handleUpdateDetails = async () => {
    if (updating) return;
    setUpdating(true);
    try {
      await axios.put("/api/users/update", {
        email: userDetails.email,
        name: editableName,
        gender,
        dateOfBirth: date,
      });
      toast.success("Profile updated");
      window.location.reload();
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (updating) return;
    setUpdating(true);
    try {
      await axios.post("/api/users/updatePassword", {
        email: userDetails.email,
        currentPassword,
        newPassword,
      });
      toast.success("Password updated");
      setCurrentPassword(""); setNewPassword("");
    } catch (e: any) {
      toast.error(e.response?.data?.error || "Failed to update password");
    } finally {
      setUpdating(false);
    }
  };

  const getInitials = (name: string) =>
    name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

  if (loading || !userDetails) {
    return (
      <div className="flex h-screen items-center justify-center mesh-bg">
        <Loader />
      </div>
    );
  }

  if (userRole !== "user" && userRole !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p style={{ color: "rgb(var(--text-muted))" }}>Session expired. Please sign in again.</p>
        <button onClick={() => router.push("/login")} className="btn-fire px-5 py-2 rounded-xl text-sm">Sign In</button>
      </div>
    );
  }

  const sidebarLinks = [
    { label: "Home", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", href: "/" },
    { label: "My Profile", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", href: "/profile", active: true },
  ];

  return (
    <div className="min-h-screen mesh-bg" style={{ fontFamily: "var(--font-dm-sans)" }}>
      <Nav loading={false} userRole={userRole} userDetails={userDetails} />

      <div className="pt-20 pb-8 px-4 max-w-6xl mx-auto">
        <div className="mt-4 flex gap-6">

          {/* Left sidebar - nav */}
          <aside className="hidden lg:flex flex-col gap-1 w-52 flex-shrink-0 animate-fade-in">
            {/* Avatar card */}
            <div
              className="rounded-2xl p-5 mb-3 flex flex-col items-center text-center"
              style={{ background: "rgb(var(--bg-surface-1))", border: "1px solid rgb(var(--border-subtle))" }}
            >
              <div className="relative mb-3">
                <Avatar className="w-16 h-16">
                  <AvatarFallback
                    className="text-xl font-black text-white"
                    style={{ background: "linear-gradient(135deg, #F97316, #EF4444)", fontFamily: "var(--font-syne)" }}
                  >
                    {getInitials(userDetails.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-500 border-2 border-[rgb(8,8,10)] rounded-full" />
              </div>
              <p className="text-sm font-black truncate w-full" style={{ fontFamily: "var(--font-syne)", color: "rgb(var(--text-primary))", letterSpacing: "-0.01em" }}>
                {userDetails.name}
              </p>
              <span
                className="mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide capitalize"
                style={{ background: "rgba(249,115,22,0.12)", color: "#F97316", border: "1px solid rgba(249,115,22,0.2)" }}
              >
                {userRole}
              </span>
            </div>

            {/* Nav links */}
            {sidebarLinks.map((l) => (
              <button
                key={l.label}
                onClick={() => router.push(l.href)}
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium text-left transition-all"
                style={{
                  background: l.active ? "rgba(249,115,22,0.1)" : "transparent",
                  color: l.active ? "#F97316" : "rgb(var(--text-secondary))",
                  border: l.active ? "1px solid rgba(249,115,22,0.2)" : "1px solid transparent",
                  fontFamily: "var(--font-dm-sans)",
                }}
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={l.icon} />
                </svg>
                {l.label}
              </button>
            ))}

            {/* Account info card */}
            <div
              className="rounded-2xl p-4 mt-3"
              style={{ background: "rgb(var(--bg-surface-1))", border: "1px solid rgb(var(--border-subtle))" }}
            >
              <p className="text-[10px] font-bold uppercase tracking-wider mb-3" style={{ color: "rgb(var(--text-muted))", fontFamily: "var(--font-syne)" }}>
                Account Info
              </p>
              {[
                { label: "Phone", value: userDetails.phoneNumber || "-" },
                { label: "Member since", value: userDetails.createdAt ? format(new Date(userDetails.createdAt), "MMM yyyy") : "-" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col py-2" style={{ borderBottom: "1px solid rgb(var(--border-subtle))" }}>
                  <span className="text-[10px] mb-0.5" style={{ color: "rgb(var(--text-muted))" }}>{item.label}</span>
                  <span className="text-xs font-medium truncate" style={{ color: "rgb(var(--text-primary))" }}>{item.value}</span>
                </div>
              ))}
            </div>

            {/* Sign out */}
            <button
              onClick={async () => {
                await axios.get("/api/users/logout").catch(() => {});
                localStorage.removeItem("token");
                router.push("/login");
              }}
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium mt-2 transition-all hover:bg-red-500/10"
              style={{ color: "rgb(var(--text-muted))", border: "1px solid transparent" }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Mobile avatar */}
            <div className="flex lg:hidden items-center gap-4 mb-6 animate-fade-in">
              <div className="relative">
                <Avatar className="w-14 h-14">
                  <AvatarFallback className="text-lg font-black text-white" style={{ background: "linear-gradient(135deg, #F97316, #EF4444)", fontFamily: "var(--font-syne)" }}>
                    {getInitials(userDetails.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-[rgb(8,8,10)] rounded-full" />
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight" style={{ fontFamily: "var(--font-syne)", color: "rgb(var(--text-primary))" }}>{userDetails.name}</h1>
                <p className="text-xs" style={{ color: "rgb(var(--text-muted))" }}>{userDetails.email}</p>
              </div>
            </div>

            {/* Page title */}
            <h1
              className="text-2xl font-black tracking-tight mb-5 animate-fade-in"
              style={{ fontFamily: "var(--font-syne)", color: "rgb(var(--text-primary))", letterSpacing: "-0.02em" }}
            >
              My Profile
            </h1>

          {/* Main settings */}
          <div className="space-y-4 animate-fade-in delay-100">
            {/* Profile details */}
            <SectionCard title="Profile Details">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div className="md:col-span-2">
                  <Label className="text-xs font-semibold uppercase tracking-wide mb-1.5 block" style={{ color: "rgb(var(--text-muted))", fontFamily: "var(--font-syne)" }}>
                    Full Name
                  </Label>
                  <Input
                    value={editableName}
                    onChange={(e) => setEditableName(e.target.value)}
                    placeholder="Your name"
                    className="rounded-xl text-sm"
                    style={{ background: "rgb(var(--bg-surface-2))", borderColor: "rgb(var(--border-subtle))", color: "rgb(var(--text-primary))" }}
                  />
                </div>

                {/* Email (readonly) */}
                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wide mb-1.5 block" style={{ color: "rgb(var(--text-muted))", fontFamily: "var(--font-syne)" }}>
                    Email
                  </Label>
                  <Input
                    value={userDetails.email}
                    readOnly
                    className="rounded-xl text-sm opacity-60 cursor-not-allowed"
                    style={{ background: "rgb(var(--bg-surface-2))", borderColor: "rgb(var(--border-subtle))", color: "rgb(var(--text-primary))" }}
                  />
                </div>

                {/* Gender */}
                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wide mb-1.5 block" style={{ color: "rgb(var(--text-muted))", fontFamily: "var(--font-syne)" }}>
                    Gender
                  </Label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger
                      className="rounded-xl text-sm"
                      style={{ background: "rgb(var(--bg-surface-2))", borderColor: "rgb(var(--border-subtle))", color: "rgb(var(--text-primary))" }}
                    >
                      <SelectValue>{gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : "Select gender"}</SelectValue>
                    </SelectTrigger>
                    <SelectContent
                      style={{ background: "rgb(var(--bg-surface-2))", borderColor: "rgb(var(--border-subtle))", color: "rgb(var(--text-primary))" }}
                    >
                      <SelectGroup>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="others">Others</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* Phone (readonly) */}
                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wide mb-1.5 block" style={{ color: "rgb(var(--text-muted))", fontFamily: "var(--font-syne)" }}>
                    Phone
                  </Label>
                  <Input
                    value={userDetails.phoneNumber || ""}
                    readOnly
                    className="rounded-xl text-sm opacity-60 cursor-not-allowed"
                    style={{ background: "rgb(var(--bg-surface-2))", borderColor: "rgb(var(--border-subtle))", color: "rgb(var(--text-primary))" }}
                  />
                </div>

                {/* DOB */}
                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wide mb-1.5 block" style={{ color: "rgb(var(--text-muted))", fontFamily: "var(--font-syne)" }}>
                    Date of Birth
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left text-sm rounded-xl font-normal",
                          !date && "text-muted-foreground"
                        )}
                        style={{ background: "rgb(var(--bg-surface-2))", borderColor: "rgb(var(--border-subtle))", color: "rgb(var(--text-primary))" }}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        captionLayout="dropdown-buttons"
                        selected={date}
                        onSelect={setDate}
                        fromYear={1960}
                        toYear={2030}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="mt-5">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="btn-fire text-sm px-5 py-2 rounded-xl">Save Changes</button>
                  </AlertDialogTrigger>
                  <AlertDialogContent
                    style={{ background: "rgb(var(--bg-surface-2))", borderColor: "rgb(var(--border-subtle))", color: "rgb(var(--text-primary))" }}
                    className="rounded-2xl"
                  >
                    <AlertDialogHeader>
                      <AlertDialogTitle style={{ fontFamily: "var(--font-syne)" }}>Update profile?</AlertDialogTitle>
                      <AlertDialogDescription style={{ color: "rgb(var(--text-muted))" }}>
                        This will update your profile details.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleUpdateDetails} disabled={updating} className="rounded-xl btn-fire border-none">
                        {updating ? "Saving…" : "Confirm"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </SectionCard>

            {/* Password */}
            <SectionCard title="Change Password">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Label className="text-xs font-semibold uppercase tracking-wide mb-1.5 block" style={{ color: "rgb(var(--text-muted))", fontFamily: "var(--font-syne)" }}>
                    Current Password
                  </Label>
                  <Input
                    type={showPw ? "text" : "password"}
                    placeholder="Current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="rounded-xl text-sm pr-10"
                    style={{ background: "rgb(var(--bg-surface-2))", borderColor: "rgb(var(--border-subtle))", color: "rgb(var(--text-primary))" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-[34px]"
                    style={{ color: "rgb(var(--text-muted))" }}
                  >
                    {showPw ? <FaRegEye size={13} /> : <FaRegEyeSlash size={13} />}
                  </button>
                </div>

                <div className="relative">
                  <Label className="text-xs font-semibold uppercase tracking-wide mb-1.5 block" style={{ color: "rgb(var(--text-muted))", fontFamily: "var(--font-syne)" }}>
                    New Password
                  </Label>
                  <Input
                    type={showPw2 ? "text" : "password"}
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="rounded-xl text-sm pr-10"
                    style={{ background: "rgb(var(--bg-surface-2))", borderColor: "rgb(var(--border-subtle))", color: "rgb(var(--text-primary))" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw2(!showPw2)}
                    className="absolute right-3 top-[34px]"
                    style={{ color: "rgb(var(--text-muted))" }}
                  >
                    {showPw2 ? <FaRegEye size={13} /> : <FaRegEyeSlash size={13} />}
                  </button>
                </div>
              </div>

              <div className="mt-5">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="btn-ghost text-sm px-5 py-2 rounded-xl">Update Password</button>
                  </AlertDialogTrigger>
                  <AlertDialogContent
                    style={{ background: "rgb(var(--bg-surface-2))", borderColor: "rgb(var(--border-subtle))", color: "rgb(var(--text-primary))" }}
                    className="rounded-2xl"
                  >
                    <AlertDialogHeader>
                      <AlertDialogTitle style={{ fontFamily: "var(--font-syne)" }}>Update password?</AlertDialogTitle>
                      <AlertDialogDescription style={{ color: "rgb(var(--text-muted))" }}>
                        This will change your login password.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleUpdatePassword} disabled={updating} className="rounded-xl btn-fire border-none">
                        {updating ? "Updating…" : "Confirm"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </SectionCard>
          </div>
          </div>  {/* closes flex-1 min-w-0 */}
        </div>    {/* closes mt-4 flex gap-6 */}

        <CopyRight />
      </div>
    </div>
  );
}
