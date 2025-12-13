import { Facebook, Twitter, Linkedin, Rss } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#EEF3F7] text-gray-700 mt-20 pt-12 border-t border-gray-300">
      {/* Top Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 
                      grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 pb-16">
        
        {/* About */}
        <div>
          <div className="mb-5">
            {/* Left: Logo */}
            <Link href="/" className="relative text-2xl font-bold poppins-bold-italic">
              <span className="text-[#F97316]">Pixel</span>
              <span className="text-[#0F172A]">Muse</span>

              {/* Accent stroke */}
              <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#F97316]"></span>
            </Link>
          </div>

          <h3 className="text-gray-900 font-semibold text-lg mb-3">About</h3>
          <p className="text-sm leading-relaxed text-gray-600">
          PixelMuse is a vibrant art and design publication exploring digital art, illustration, photography, graphic design, UI/UX, visual culture, and creative inspiration. Discover tutorials, artist highlights, trend reports, and beautifully crafted stories for creators of all levels.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-gray-900 font-semibold text-lg mb-4">Important Links</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="/about-us" className="hover:text-[#0EA5A4]">About Us</a></li>
            <li><a href="/contact-us" className="hover:text-[#0EA5A4]">Contact Us</a></li>
            <li><a href="/privacy-policy" className="hover:text-[#0EA5A4]">Privacy Policy</a></li>
            <li><a href="/terms-of-use" className="hover:text-[#0EA5A4]">Terms of Use</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-gray-900 font-semibold text-lg mb-4">Follow Us</h3>

          <div className="flex gap-4 mb-6">
            {/* <a className="p-2 bg-white shadow-sm rounded-full hover:shadow-md transition">
              <Facebook className="h-5 w-5 text-gray-700" />
            </a>
            <a className="p-2 bg-white shadow-sm rounded-full hover:shadow-md transition">
              <Twitter className="h-5 w-5 text-gray-700" />
            </a> */}
            <a href="https://www.linkedin.com/in/peter-mark-98b429398?trk=contact-info" className="p-2 bg-white shadow-sm rounded-full hover:shadow-md transition">
              <Linkedin className="h-5 w-5 text-gray-700" />
            </a>
            {/* <a className="p-2 bg-white shadow-sm rounded-full hover:shadow-md transition">
              <Rss className="h-5 w-5 text-gray-700" />
            </a> */}
          </div>

          {/* Left: Logo */}
          <Link href="/" className="relative text-2xl font-bold poppins-bold-italic">
            <span className="text-[#F97316]">Pixel</span>
            <span className="text-[#0F172A]">Muse</span>

            {/* Accent stroke */}
            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#F97316]"></span>
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-300 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} PixelMuse. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
