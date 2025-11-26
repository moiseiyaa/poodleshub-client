import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaTiktok, FaInstagram, FaYoutube, FaPinterest } from 'react-icons/fa';

/**
 * Footer component for PuppyHub USA website
 * Includes navigation links, contact information, and social media links
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-linear-to-br from-primary-900 via-primary-800 to-primary-900 text-white">
      <div className="container mx-auto px-4 md:px-6 max-w-[1440px] py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/icons/logo-footer.png"
                  alt="PuppyHub USA Logo"
                  width={180}
                  height={50}
                  className="h-12 w-auto"
                />
              </Link>
            </div>
            <p className="text-gray-300 mb-4">
              Finding loving homes for puppies across the United States.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://www.facebook.com/share/17fhUVni9G/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="bg-primary-700 hover:bg-primary-600 p-2 rounded-full transition-all duration-300 hover:shadow-glow transform hover:scale-110">
                <FaFacebook className="h-5 w-5 text-white" />
              </a>
              <a href="https://www.tiktok.com/@puppyhub_usa?_r=1&_t=ZT-91iUsA27Lpu" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="bg-primary-700 hover:bg-primary-600 p-2 rounded-full transition-all duration-300 hover:shadow-glow transform hover:scale-110">
                <FaTiktok className="h-5 w-5 text-white" />
              </a>
              <a href="https://www.instagram.com/puppyhub_usa?igsh=Yno2NjJxdGNhMDJ0&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="bg-primary-700 hover:bg-primary-600 p-2 rounded-full transition-all duration-300 hover:shadow-glow transform hover:scale-110">
                <FaInstagram className="h-5 w-5 text-white" />
              </a>
              <a href="https://youtube.com/@puppyhubusa?si=xqQZMQGWA3b3-1rU" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="bg-primary-700 hover:bg-primary-600 p-2 rounded-full transition-all duration-300 hover:shadow-glow transform hover:scale-110">
                <FaYoutube className="h-5 w-5 text-white" />
              </a>
              <a href="https://pin.it/3Drt6uli1" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className="bg-primary-700 hover:bg-primary-600 p-2 rounded-full transition-all duration-300 hover:shadow-glow transform hover:scale-110">
                <FaPinterest className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 bg-linear-to-r from-white to-primary-200 bg-clip-text text-transparent">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/puppies" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary-400 mr-2 group-hover:bg-secondary-300 transition-colors"></span>
                  <span className="group-hover:translate-x-1 transition-transform">Available Puppies</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/process" className="text-gray-300 hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/training" className="text-gray-300 hover:text-white transition-colors">
                  Training & Services
                </Link>
              </li>
              <li>
                <Link href="/delivery" className="text-gray-300 hover:text-white transition-colors">
                  Delivery & Travel
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xl font-bold mb-4 bg-linear-to-r from-white to-primary-200 bg-clip-text text-transparent">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary-400 mr-2 group-hover:bg-secondary-300 transition-colors"></span>
                  <span className="group-hover:translate-x-1 transition-transform">Terms of Service</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/health-guarantee" className="text-gray-300 hover:text-white transition-colors">
                  Health Guarantee
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4 bg-linear-to-r from-white to-primary-200 bg-clip-text text-transparent">Contact</h3>
            <address className="not-italic text-gray-300">
              <p className="mb-2">1234 Puppy Lane</p>
              <p className="mb-2">Denver, CO 80202</p>
              <p className="mb-2">
                <a href="tel:+18005551234" className="hover:text-white transition-colors">
                  (800) 555-1234
                </a>
              </p>
              <p>
                <a href="mailto:info@puppyhubusa.com" className="hover:text-white transition-colors">
                  info@puppyhubusa.com
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="bg-primary-950/80 backdrop-blur-sm py-6 relative z-10">
          <div className="container mx-auto px-4 md:px-6 max-w-[1440px] flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6">
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms</Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy</Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-white text-sm transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
        
        {/* Bottom centered paragraphs */}
        <div className="text-center pb-6 pt-4">
          <p className="text-gray-400 text-sm mb-2">&copy; {currentYear} PuppyHub USA. All rights reserved.</p>
          <p className="text-gray-400 text-sm">
            PuppyHub USA is committed to responsible breeding practices and the welfare of all puppies.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
