import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">
              &copy; {year} Hostel Attendance System. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-hostel-primary text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-600 hover:text-hostel-primary text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 hover:text-hostel-primary text-sm">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;