import { useState, useEffect } from "react";
import NavigationBar from "@/components/navigation-bar";
import StatCard from "@/components/stat-card";

export default function TeacherDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [attendanceSessionActive, setAttendanceSessionActive] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [checkedInCount, setCheckedInCount] = useState(0);
  const [activeSection, setActiveSection] = useState('dashboard');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (attendanceSessionActive) {
      interval = setInterval(() => {
        setCheckedInCount(prev => {
          const increment = Math.floor(Math.random() * 3) + 1;
          return Math.min(prev + increment, 45);
        });
      }, 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [attendanceSessionActive]);

  const handleAttendanceToggle = () => {
    if (!attendanceSessionActive) {
      setAttendanceSessionActive(true);
      setSessionStartTime(new Date());
      setCheckedInCount(0);
    } else {
      setAttendanceSessionActive(false);
      setSessionStartTime(null);
      setCheckedInCount(0);
    }
  };

  return (
    <div>
      <div className="sidebar-colorful">
        <button 
          onClick={() => setActiveSection('dashboard')}
          className={`sidebar-item ${activeSection === 'dashboard' ? 'active' : ''}`}
          title="Dashboard"
        >
          📊
        </button>
        <button 
          onClick={() => setActiveSection('students')}
          className={`sidebar-item ${activeSection === 'students' ? 'active' : ''}`}
          title="Student Management"
        >
          👥
        </button>
        <button 
          onClick={() => setActiveSection('courses')}
          className={`sidebar-item ${activeSection === 'courses' ? 'active' : ''}`}
          title="Course Management"
        >
          📚
        </button>
        <button 
          onClick={() => setActiveSection('settings')}
          className={`sidebar-item ${activeSection === 'settings' ? 'active' : ''}`}
          title="Settings"
        >
          ⚙️
        </button>
        <button 
          onClick={() => setActiveSection('reports')}
          className={`sidebar-item ${activeSection === 'reports' ? 'active' : ''}`}
          title="Reports"
        >
          📋
        </button>
        <button 
          onClick={() => setActiveSection('schedule')}
          className={`sidebar-item ${activeSection === 'schedule' ? 'active' : ''}`}
          title="Schedule"
        >
          📅
        </button>
      </div>

      <div className="main-content-with-sidebar">
        <NavigationBar title="Teacher Dashboard" />

        <div className="container-colorful py-8">
          {/* Welcome Header */}
          <div className="welcome-header">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-2">Good morning, Professor Sharma</h1>
                <p className="text-white/80 text-sm sm:text-base lg:text-lg">Ready to start today's attendance session?</p>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-white/70 text-xs sm:text-sm mb-1">Current Time</div>
                <div className="text-xl sm:text-2xl font-semibold text-white" data-testid="text-current-time">
                  {currentTime.toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit', 
                    second: '2-digit' 
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="stats-grid-colorful mb-8">
            <div className="card-colorful text-center">
              <div className="w-16 h-16 bg-gradient-info rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-calendar-day text-2xl text-white"></i>
              </div>
              <div className="stat-number-large">3</div>
              <div className="text-gray-600 text-sm uppercase tracking-wider font-semibold" data-testid="text-todays-classes">Today's Classes</div>
            </div>
            <div className="card-colorful text-center">
              <div className="w-16 h-16 bg-gradient-success rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-users text-2xl text-white"></i>
              </div>
              <div className="stat-number-large">45</div>
              <div className="text-gray-600 text-sm uppercase tracking-wider font-semibold" data-testid="text-total-students">Total Students</div>
            </div>
            <div className="card-colorful text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-chart-line text-2xl text-white"></i>
              </div>
              <div className="stat-number-large">87%</div>
              <div className="text-gray-600 text-sm uppercase tracking-wider font-semibold" data-testid="text-avg-attendance">Avg Attendance</div>
            </div>
          </div>

          {/* Main Action Area */}
          <div className="card-colorful text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800" data-testid="text-session-control-title">Attendance Session Control</h3>
            <p className="text-gray-600 mb-8 text-sm sm:text-base" data-testid="text-session-instruction">Click the button below to start an attendance session for your current class.</p>
            
            <button 
              onClick={handleAttendanceToggle}
              className={`btn text-base sm:text-lg px-8 sm:px-12 py-3 sm:py-4 mb-6 w-full sm:w-auto ${attendanceSessionActive ? 'btn-secondary' : 'btn-primary'}`}
              data-testid="button-attendance-session"
            >
              <i className={`fas ${attendanceSessionActive ? 'fa-stop' : 'fa-play'}`}></i>
              {attendanceSessionActive ? 'Stop Attendance Session' : 'Start Attendance Session'}
            </button>

            {attendanceSessionActive && (
              <div className="attendance-status" data-testid="status-attendance-running">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  <span>Attendance session is running... Students can now check in via BLE proximity.</span>
                </div>
              </div>
            )}

            {/* Session Info */}
            {attendanceSessionActive && sessionStartTime && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg text-gray-700" data-testid="info-session-details">
                <p className="font-semibold mb-2">Session Details:</p>
                <div className="flex justify-center gap-8 text-sm">
                  <div>
                    <span className="font-medium">Started at:</span> 
                    <span data-testid="text-session-start-time" className="ml-2">
                      {sessionStartTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Students checked in:</span> 
                    <span data-testid="text-checked-in-count" className="ml-2 font-bold text-green-600">{checkedInCount}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Recent Sessions */}
          <div className="card-colorful">
            <h3 className="text-lg sm:text-xl font-semibold mb-6 flex items-center gap-3 text-gray-800" data-testid="text-recent-sessions-title">
              <div className="w-10 h-10 bg-gradient-warning rounded-full flex items-center justify-center">
                <i className="fas fa-history text-white text-sm sm:text-base"></i>
              </div>
              Recent Sessions
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100" data-testid="card-recent-session-1">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-info rounded-full flex items-center justify-center">
                    <i className="fas fa-chalkboard-teacher text-white"></i>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800" data-testid="text-session-name-1">Computer Science 101</p>
                    <p className="text-sm text-gray-600" data-testid="text-session-time-1">Today, 9:00 AM</p>
                  </div>
                </div>
                <span className="badge-gradient" data-testid="badge-attendance-1">42/45 Present</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-100" data-testid="card-recent-session-2">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-success rounded-full flex items-center justify-center">
                    <i className="fas fa-laptop-code text-white"></i>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800" data-testid="text-session-name-2">Data Structures</p>
                    <p className="text-sm text-gray-600" data-testid="text-session-time-2">Yesterday, 2:00 PM</p>
                  </div>
                </div>
                <span className="badge-gradient" data-testid="badge-attendance-2">38/40 Present</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <i className="fas fa-database text-white"></i>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Database Management</p>
                    <p className="text-sm text-gray-600">Yesterday, 11:00 AM</p>
                  </div>
                </div>
                <span className="badge-gradient">35/38 Present</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}