import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const InfoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if banner was previously dismissed
    const isDismissed = localStorage.getItem("infoBannerDismissed");
    if (isDismissed === "true") {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem("infoBannerDismissed", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 text-white shadow-lg relative overflow-hidden px-3 py-2 sm:px-6 sm:py-4 rounded-b-lg">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
      </div>
      {/* Flex layout: vertical on mobile, horizontal on larger screens */}
      <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-between gap-2 sm:gap-3 w-full z-10">
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute right-3 top-3 sm:static sm:ml-0 sm:order-2 p-2 rounded-lg hover:bg-white/20 transition-colors group"
          aria-label="Dismiss notification"
        >
          <FontAwesomeIcon
            icon={faTimes}
            className="w-3.5 h-3.5 md:w-5 md:h-5 group-hover:scale-110 transition-transform"
          />
        </button>

        {/* Info & Link */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto pr-8 sm:pr-0">
          <p className="text-xs sm:text-sm md:text-base font-medium flex items-center gap-1.5 text-center sm:text-left flex-wrap max-w-full">
            <span className="hidden sm:inline">ℹ️</span>
            <span className="whitespace-nowrap block">For more info about this Project, Check out our</span>
          </p>
          <a
            href="https://github.com/ananikets18/Code-Mix-for-social-media---Frontend"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-white/20 hover:bg-white/30 rounded-md font-semibold transition-all hover:scale-105 backdrop-blur-sm border border-white/30 whitespace-nowrap text-xs sm:text-sm"
          >
            <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />
            <span>GitHub Repo</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default InfoBanner;
