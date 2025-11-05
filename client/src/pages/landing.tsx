import { Link } from "wouter";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-landing"></div>
      
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* System Logo/Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 shadow-lg">
            <i className="fas fa-user-check text-3xl text-white"></i>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient mb-4" data-testid="title-main">
            Smart Attendance System
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-12 max-w-lg mx-auto" data-testid="text-tagline">
            Revolutionizing attendance tracking with smart technology, biometric verification, and gamified engagement for modern educational institutions.
          </p>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="card-colorful text-center transform hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-info rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-bluetooth-b text-2xl text-white"></i>
            </div>
            <h3 className="font-semibold mb-3 text-gray-800 text-lg" data-testid="text-ble-feature">BLE Technology</h3>
            <p className="text-gray-600">Proximity-based attendance tracking</p>
          </div>
          <div className="card-colorful text-center transform hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-fingerprint text-2xl text-white"></i>
            </div>
            <h3 className="font-semibold mb-3 text-gray-800 text-lg" data-testid="text-biometric-feature">Biometric Security</h3>
            <p className="text-gray-600">Secure identity verification</p>
          </div>
          <div className="card-colorful text-center transform hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-warning rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-trophy text-2xl text-white"></i>
            </div>
            <h3 className="font-semibold mb-3 text-gray-800 text-lg" data-testid="text-gamification-feature">Gamification</h3>
            <p className="text-gray-600">Engaging reward system</p>
          </div>
        </div>

        {/* Login Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
          <Link href="/teacher">
            <button className="btn btn-primary text-base sm:text-lg lg:text-xl px-8 sm:px-12 py-4 sm:py-5 shadow-2xl w-full sm:w-auto" data-testid="button-teacher-login">
              <i className="fas fa-chalkboard-teacher"></i>
              Teacher Login
            </button>
          </Link>
          <Link href="/student">
            <button className="btn bg-gradient-success text-white text-base sm:text-lg lg:text-xl px-8 sm:px-12 py-4 sm:py-5 shadow-2xl w-full sm:w-auto" data-testid="button-student-login">
              <i className="fas fa-user-graduate"></i>
              Student Login
            </button>
          </Link>
        </div>

        {/* Additional info */}
        <div className="mt-12 sm:mt-16">
          <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-4 bg-white/10 backdrop-blur-sm rounded-full px-6 sm:px-8 py-3 sm:py-4 border border-white/20">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-success rounded-full flex items-center justify-center">
                <i className="fas fa-check text-white text-xs sm:text-sm"></i>
              </div>
              <span className="text-white font-medium text-sm sm:text-base">Trusted by</span>
            </div>
            <div className="text-white text-center sm:text-left">
              <span className="font-bold text-xl sm:text-2xl text-gradient" data-testid="text-institutions-count">500+</span>
              <span className="ml-2 text-white/80 text-sm sm:text-base">institutions worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
