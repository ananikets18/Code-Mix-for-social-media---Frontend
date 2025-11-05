import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDigitalOcean } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="mt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center text-gray-500 dark:text-gray-400 space-y-2">
          {/* Logo section */}
          <FontAwesomeIcon
            icon={faDigitalOcean}
            title="DigitalOcean LLP"
            className="h-8 md:h-10 w-auto text-blue-600"
          />

          {/* Title with responsive font size */}
          <p className="text-sm md:text-base font-semibold">
            Multilingual NLP Analysis System v1.0.0
          </p>

          {/* API info with digital ocean url */}
          <p className="text-xs md:text-sm">
            API running on{" "}
            <code className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-primary-600 dark:text-primary-400 border border-gray-300 dark:border-gray-700 break-words">
              yourapp.digitalocean.app
            </code>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
