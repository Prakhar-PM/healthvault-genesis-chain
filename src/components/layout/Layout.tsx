
import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-health-dark text-white py-6">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">HealthVault</h3>
              <p className="text-gray-300 text-sm">
                Secure blockchain-based health records management system that puts patients in control.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="/" className="hover:text-health-primary">Home</a></li>
                <li><a href="/patient" className="hover:text-health-primary">Patient Portal</a></li>
                <li><a href="/hospital" className="hover:text-health-primary">Hospital Portal</a></li>
                <li><a href="/verify" className="hover:text-health-primary">Verify Records</a></li>
                <li><a href="/explorer" className="hover:text-health-primary">Blockchain Explorer</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Contact</h3>
              <p className="text-gray-300 text-sm">
                Have questions or need support? Reach out to our team.
              </p>
              <a 
                href="mailto:support@healthvault.com" 
                className="inline-block mt-2 text-health-primary hover:text-health-light text-sm"
              >
                support@healthvault.com
              </a>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-4 text-center text-xs text-gray-400">
            <p>© {new Date().getFullYear()} HealthVault. All rights reserved.</p>
            <p className="mt-1">
              HealthVault is a blockchain-powered platform for managing and verifying patient health records.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
