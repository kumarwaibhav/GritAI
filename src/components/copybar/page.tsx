import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

const CopyRight = () => {
  return (
    <footer className="mx-4 mt-4 mb-4">
      <div
        className="rounded-2xl px-6 h-11 flex items-center justify-between"
        style={{
          background: "rgb(var(--bg-surface-1))",
          border: "1px solid rgb(var(--border-subtle))",
        }}
      >
        <p
          className="text-xs"
          style={{
            color: "rgb(var(--text-muted))",
            fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)",
          }}
        >
          © 2023–26{" "}
          <span className="brand-gradient-text font-semibold">Grit AI</span>
          {" · "}By Kumar Waibhav Akshat
        </p>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/kumarwaibhav"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-70"
            style={{ color: "rgb(var(--text-muted))" }}
          >
            <FaGithub className="h-4 w-4" />
          </a>
          <a
            href="https://linkedin.com/in/kumarwaibhav"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-70"
            style={{ color: "#0A66C2" }}
          >
            <FaLinkedin className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default CopyRight;
