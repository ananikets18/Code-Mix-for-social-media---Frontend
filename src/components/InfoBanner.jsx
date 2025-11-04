import React, { useState, useEffect } from "react";

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
    <div className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 text-white shadow-lg relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
      </div>

      <div className="container mx-auto px-4 py-2.5 relative z-10">
        <div className="relative flex items-center justify-center">
          {/* Center Text */}
          <p className="text-sm font-medium flex flex-wrap items-center justify-center gap-1.5 mx-auto text-center">
            <span className="hidden sm:inline">ℹ️</span>
            <span className="whitespace-nowrap">
              For more info about this Project, Check out our
            </span>

            <a
              href="https://github.com/ananikets18/Code-Mix-for-social-media---Frontend"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-white/20 hover:bg-white/30 rounded-md font-semibold transition-all hover:scale-105 backdrop-blur-sm border border-white/30"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 .5C5.648.5.5 5.648.5 12c0 5.088 3.292 9.397 7.868 10.915.575.107.787-.25.787-.558
                0-.275-.01-1.004-.015-1.972-3.2.695-3.878-1.543-3.878-1.543-.522-1.326-1.276-1.68-1.276-1.68-1.043-.713.08-.698.08-.698
                1.153.081 1.76 1.184 1.76 1.184 1.026 1.758 2.691 1.251 3.346.956.104-.744.401-1.251.73-1.539-2.554-.291-5.239-1.277-5.239-5.683
                0-1.255.448-2.282 1.183-3.086-.118-.29-.513-1.461.113-3.048 0 0 .967-.31 3.17 1.18a10.96 10.96 0 0 1 2.886-.389c.98.004
                1.97.132 2.887.389 2.201-1.49 3.167-1.18 3.167-1.18.629 1.587.233 2.758.115 3.048.737.804 1.182 1.831 1.182 3.086
                0 4.421-2.69 5.388-5.255 5.673.413.355.78 1.057.78 2.134 0 1.542-.014 2.785-.014 3.164 0 .31.208.67.794.556C20.21 21.392 23.5 17.083 23.5 12
                23.5 5.648 18.352.5 12 .5z"
                />
              </svg>

              <span className="whitespace-nowrap">GitHub Repo</span>
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 5l7 7m0 0l-7 7m7-7H4"
                />
              </svg>
            </a>
          </p>

          {/* Close Button to the Right */}
          <button
            onClick={handleDismiss}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-white/20 transition-colors group"
          >
            <svg
              className="w-5 h-5 group-hover:scale-110 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoBanner;
