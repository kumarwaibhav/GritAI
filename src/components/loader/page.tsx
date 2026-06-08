import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Animated ring */}
      <div className="relative w-12 h-12">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: "2px solid rgb(var(--border-subtle))",
          }}
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: "2px solid transparent",
            borderTopColor: "#F97316",
            borderRightColor: "#EF4444",
            animation: "loader-ring 0.8s linear infinite",
          }}
        />
        {/* Center dot */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full brand-gradient"
          style={{ animation: "loader-pulse 0.8s ease-in-out infinite" }}
        />
      </div>
      <p
        className="text-xs tracking-widest uppercase"
        style={{
          color: "rgb(var(--text-muted))",
          fontFamily: "var(--font-syne, 'Syne', sans-serif)",
          letterSpacing: "0.15em",
        }}
      >
        Loading
      </p>
    </div>
  );
};

export default Loader;
