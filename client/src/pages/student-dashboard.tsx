import { useState } from "react";
import NavigationBar from "@/components/navigation-bar";
import StatCard from "@/components/stat-card";
import LeaderboardItem from "@/components/leaderboard-item";
import BiometricModal from "@/components/biometric-modal";

export default function StudentDashboard() {
  const [isBleScanning, setIsBleScanning] = useState(false);
  const [showBiometricModal, setShowBiometricModal] = useState(false);
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [chartPeriod, setChartPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleBleCheck = () => {
    setIsBleScanning(true);
    
    setTimeout(() => {
      setIsBleScanning(false);
      setShowBiometricModal(true);
    }, 2000);
  };

  const handleBiometricSuccess = () => {
    setAttendanceMarked(true);
    setTimeout(() => {
      setAttendanceMarked(false);
    }, 5000);
  };

  const leaderboardData = [
    { rank: 1, name: "Swayam Srivastava", department: "Computer Science", percentage: 98, medal: "🥇" },
    { rank: 2, name: "Utkarsh Gupta", department: "Computer Science", percentage: 95, medal: "🥈" },
    { rank: 3, name: "Yogesh Kumar Verma", department: "Computer Science", percentage: 92, medal: "🥉" },
    { rank: 4, name: "Shashank Raj", department: "Computer Science", percentage: 87, isCurrentUser: true },
    { rank: 5, name: "Shobhit Tripathi", department: "Computer Science", percentage: 84 },
    { rank: 5, name: "Shreya Tyagi", department: "Computer Science", percentage: 87 },
  ];
  

  const getChartData = () => {
    if (chartPeriod === 'week') {
      return {
        title: 'Weekly Attendance Overview',
        data: [
          { label: 'Mon', height: '60%', value: '60%', tooltip: 'Monday: 3/5 classes' },
          { label: 'Tue', height: '80%', value: '80%', tooltip: 'Tuesday: 4/5 classes' },
          { label: 'Wed', height: '70%', value: '70%', tooltip: 'Wednesday: 7/10 classes' },
          { label: 'Thu', height: '90%', value: '90%', tooltip: 'Thursday: 9/10 classes' },
          { label: 'Fri', height: '85%', value: '85%', tooltip: 'Friday: 17/20 classes' },
          { label: 'Sat', height: '75%', value: '75%', tooltip: 'Saturday: 6/8 classes' },
          { label: 'Sun', height: '95%', value: '95%', tooltip: 'Sunday: 19/20 classes' }
        ],
        average: '79.3%'
      };
    } else if (chartPeriod === 'month') {
      return {
        title: 'Monthly Attendance Overview',
        data: [
          { label: 'Week 1', height: '88%', value: '88%', tooltip: 'Week 1: 22/25 classes' },
          { label: 'Week 2', height: '92%', value: '92%', tooltip: 'Week 2: 23/25 classes' },
          { label: 'Week 3', height: '76%', value: '76%', tooltip: 'Week 3: 19/25 classes' },
          { label: 'Week 4', height: '84%', value: '84%', tooltip: 'Week 4: 21/25 classes' }
        ],
        average: '85.0%'
      };
    } else {
      return {
        title: 'Yearly Attendance Overview',
        data: [
          { label: 'Jan', height: '85%', value: '85%', tooltip: 'January: 85% attendance' },
          { label: 'Feb', height: '78%', value: '78%', tooltip: 'February: 78% attendance' },
          { label: 'Mar', height: '92%', value: '92%', tooltip: 'March: 92% attendance' },
          { label: 'Apr', height: '89%', value: '89%', tooltip: 'April: 89% attendance' },
          { label: 'May', height: '91%', value: '91%', tooltip: 'May: 91% attendance' },
          { label: 'Jun', height: '87%', value: '87%', tooltip: 'June: 87% attendance' },
          { label: 'Jul', height: '83%', value: '83%', tooltip: 'July: 83% attendance' },
          { label: 'Aug', height: '94%', value: '94%', tooltip: 'August: 94% attendance' },
          { label: 'Sep', height: '88%', value: '88%', tooltip: 'September: 88% attendance' },
          { label: 'Oct', height: '90%', value: '90%', tooltip: 'October: 90% attendance' },
          { label: 'Nov', height: '86%', value: '86%', tooltip: 'November: 86% attendance' },
          { label: 'Dec', height: '82%', value: '82%', tooltip: 'December: 82% attendance' }
        ],
        average: '87.1%'
      };
    }
  };

  const chartData = getChartData();

  const handleSidebarClick = (section: string) => {
    setActiveSection(section);
  };

  const renderMainContent = () => {
    switch(activeSection) {
      case 'dashboard':
        return renderDashboardContent();
      case 'classes':
        return renderClassesContent();
      case 'courses':
        return renderCoursesContent();
      case 'settings':
        return renderSettingsContent();
      case 'assignments':
        return renderAssignmentsContent();
      case 'schedule':
        return renderScheduleContent();
      default:
        return renderDashboardContent();
    }
  };

  const renderDashboardContent = () => (
    <>
      {/* Welcome Header */}
      <div className="welcome-header">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-2">Good morning, Shashank</h1>
            <p className="text-white/80 text-sm sm:text-base lg:text-lg">You have 3 classes today • Computer Science Engineering(AI) • ID: 2428CSEAI1767</p>
          </div>
          <div className="text-left sm:text-right">
            <div className="text-white/70 text-xs sm:text-sm mb-1">Current Time</div>
            <div className="text-xl sm:text-2xl font-semibold text-white">
              {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="stats-grid-colorful mb-8">
        <div className="card-colorful text-center">
          <div className="stat-number-large">87%</div>
          <div className="text-gray-600 text-sm uppercase tracking-wider font-semibold mb-3">Overall Attendance</div>
          <div className="flex items-center justify-center text-sm text-red-500">
            <span className="mr-2">📉</span>
            -5% vs last month
          </div>
        </div>
        <div className="card-colorful text-center">
          <div className="stat-number-large">24</div>
          <div className="text-gray-600 text-sm uppercase tracking-wider font-semibold mb-3">Classes This Month</div>
          <div className="flex items-center justify-center text-sm text-green-500">
            <span className="mr-2">📈</span>
            +12% vs last month
          </div>
        </div>
        <div className="card-colorful text-center">
          <div className="stat-number-large">5</div>
          <div className="text-gray-600 text-sm uppercase tracking-wider font-semibold mb-3">Day Streak</div>
          <div className="flex items-center justify-center text-sm text-green-500">
            <span className="mr-2">📈</span>
            Perfect attendance
          </div>
        </div>
      </div>

      {/* Attendance Check-in Section */}
      <div className="card-colorful mb-8 text-center">
        <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800 flex items-center justify-center gap-3" data-testid="text-checkin-title">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-info rounded-full flex items-center justify-center">
            <i className="fas fa-bluetooth-b text-white text-base sm:text-lg"></i>
          </div>
          Attendance Check-in
        </h3>
        <p className="text-gray-600 mb-8 text-sm sm:text-base">Click the button below to mark your attendance via BLE proximity detection.</p>
        
        <button 
          onClick={handleBleCheck}
          disabled={isBleScanning}
          className={`btn text-base sm:text-lg px-8 sm:px-12 py-3 sm:py-4 mb-6 w-full sm:w-auto ${isBleScanning ? 'btn-secondary' : 'btn-primary'}`}
          data-testid="button-check-ble"
        >
          <i className={`fas ${isBleScanning ? 'fa-spinner fa-spin' : 'fa-check'}`}></i>
          {isBleScanning ? 'Scanning for BLE beacon...' : 'Mark your Attendance'}
        </button>

        {attendanceMarked && (
          <div className="attendance-status" data-testid="status-attendance-marked">
            <div className="flex items-center justify-center gap-3">
              <i className="fas fa-check-circle text-2xl"></i>
              <span>Attendance Marked Successfully!</span>
            </div>
          </div>
        )}
      </div>

      {/* Attendance Chart Section */}
      <div className="card-colorful mb-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">{chartData.title}</h3>
          <div className="flex gap-2 justify-center sm:justify-end">
            <button 
              onClick={() => setChartPeriod('week')}
              className={`btn text-xs sm:text-sm py-2 px-3 sm:px-4 ${chartPeriod === 'week' ? 'bg-gradient-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              Week
            </button>
            <button 
              onClick={() => setChartPeriod('month')}
              className={`btn text-xs sm:text-sm py-2 px-3 sm:px-4 ${chartPeriod === 'month' ? 'bg-gradient-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              Month
            </button>
            <button 
              onClick={() => setChartPeriod('year')}
              className={`btn text-xs sm:text-sm py-2 px-3 sm:px-4 ${chartPeriod === 'year' ? 'bg-gradient-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              Year
            </button>
          </div>
        </div>
        <div className="chart-colorful relative">
          {chartData.data.map((item, index) => (
            <div 
              key={index}
              className="bar-colorful group relative cursor-pointer" 
              style={{height: item.height}} 
              title={item.tooltip}
            >
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-white font-medium">
                {item.label}
              </div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                {item.value}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center text-gray-600">
          <p className="text-sm">
            {chartPeriod === 'week' ? "This week's" : chartPeriod === 'month' ? "This month's" : "This year's"} average: 
            <span className="font-semibold text-gray-800 ml-1">{chartData.average}</span>
          </p>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Reliability Score */}
        <div className="card-colorful">
          <h3 className="text-lg sm:text-xl font-semibold mb-6 flex items-center gap-3 text-gray-800" data-testid="text-reliability-title">
            <div className="w-10 h-10 bg-gradient-warning rounded-full flex items-center justify-center">
              <i className="fas fa-chart-pie text-white text-sm sm:text-base"></i>
            </div>
            Reliability Score
          </h3>
          <div className="text-center mb-6">
            <div className="text-4xl sm:text-5xl font-light mb-2" data-testid="text-overall-score">
              <span className="text-gradient">87%</span>
            </div>
            <p className="text-gray-600 text-sm sm:text-base">Overall Attendance Rate</p>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2 text-gray-600">
                <span>This Month</span>
                <span data-testid="text-this-month-percentage" className="font-semibold">87%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-gradient-primary h-3 rounded-full w-[87%] transition-all duration-500"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2 text-gray-600">
                <span>Last Month</span>
                <span data-testid="text-last-month-percentage" className="font-semibold">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-gradient-success h-3 rounded-full w-[92%] transition-all duration-500"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Badges */}
        <div className="card-colorful">
          <h3 className="text-lg sm:text-xl font-semibold mb-6 flex items-center gap-3 text-gray-800" data-testid="text-badges-title">
            <div className="w-10 h-10 bg-gradient-warning rounded-full flex items-center justify-center">
              <i className="fas fa-trophy text-white text-sm sm:text-base"></i>
            </div>
            Achievement Badges
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="achievement-badge earned" data-testid="badge-streak">
              <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🔥</span>
              </div>
              <div className="font-semibold text-sm mb-1">5-Day Streak</div>
              <div className="text-xs opacity-80">Perfect Attendance</div>
            </div>
            <div className="achievement-badge earned" data-testid="badge-punctuality">
              <div className="w-12 h-12 bg-gradient-info rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">⏰</span>
              </div>
              <div className="font-semibold text-sm mb-1">Punctuality Pro</div>
              <div className="text-xs opacity-80">Always On Time</div>
            </div>
            <div className="achievement-badge earned" data-testid="badge-consistency">
              <div className="w-12 h-12 bg-gradient-success rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📅</span>
              </div>
              <div className="font-semibold text-sm mb-1">Consistency King</div>
              <div className="text-xs opacity-80">30 Days Active</div>
            </div>
            <div className="achievement-badge locked" data-testid="badge-perfectionist">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">⭐</span>
              </div>
              <div className="font-semibold text-sm mb-1">Perfectionist</div>
              <div className="text-xs opacity-80">100% for Month</div>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="card-colorful mt-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-warning rounded-full flex items-center justify-center">
            <i className="fas fa-medal text-white"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-800" data-testid="text-leaderboard-title">
            Class Leaderboard
          </h3>
        </div>
        <div className="space-y-0">
          {leaderboardData.map((item) => (
            <LeaderboardItem
              key={item.rank}
              rank={item.rank}
              name={item.name}
              department={item.department}
              percentage={item.percentage}
              isCurrentUser={item.isCurrentUser}
              medal={item.medal}
            />
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
        <div className="card-colorful text-center">
          <div className="w-16 h-16 bg-gradient-info rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-calendar-week text-2xl text-white"></i>
          </div>
          <div className="font-bold text-2xl text-gray-800 mb-1" data-testid="text-classes-this-week">12</div>
          <div className="text-sm text-gray-600">Classes This Week</div>
        </div>
        <div className="card-colorful text-center">
          <div className="w-16 h-16 bg-gradient-success rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-check-circle text-2xl text-white"></i>
          </div>
          <div className="font-bold text-2xl text-gray-800 mb-1" data-testid="text-classes-attended">11</div>
          <div className="text-sm text-gray-600">Attended</div>
        </div>
        <div className="card-colorful text-center">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-clock text-2xl text-white"></i>
          </div>
          <div className="font-bold text-2xl text-gray-800 mb-1" data-testid="text-avg-checkin-time">8:45</div>
          <div className="text-sm text-gray-600">Avg Check-in Time</div>
        </div>
        <div className="card-colorful text-center">
          <div className="w-16 h-16 bg-gradient-warning rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-award text-2xl text-white"></i>
          </div>
          <div className="font-bold text-2xl text-gray-800 mb-1" data-testid="text-badges-earned">4</div>
          <div className="text-sm text-gray-600">Badges Earned</div>
        </div>
      </div>
    </>
  );

  const renderClassesContent = () => (
    <div className="card-colorful">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-info rounded-full flex items-center justify-center">
          <i className="fas fa-users text-white text-lg"></i>
        </div>
        My Classes
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
          <h3 className="font-semibold text-lg mb-2">Computer Science 101</h3>
          <p className="text-gray-600 mb-4">Prof. Smith • Room 201 • MWF 9:00 AM</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-blue-600 font-medium">Attendance: 92%</span>
            <button className="btn bg-blue-500 text-white text-sm py-1 px-3">View Details</button>
          </div>
        </div>
        <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
          <h3 className="font-semibold text-lg mb-2">Data Structures</h3>
          <p className="text-gray-600 mb-4">Prof. Johnson • Room 305 • TTh 2:00 PM</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-green-600 font-medium">Attendance: 89%</span>
            <button className="btn bg-green-500 text-white text-sm py-1 px-3">View Details</button>
          </div>
        </div>
        <div className="p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200">
          <h3 className="font-semibold text-lg mb-2">Database Management</h3>
          <p className="text-gray-600 mb-4">Prof. Wilson • Room 150 • MW 1:00 PM</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-purple-600 font-medium">Attendance: 94%</span>
            <button className="btn bg-purple-500 text-white text-sm py-1 px-3">View Details</button>
          </div>
        </div>
        <div className="p-6 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border border-orange-200">
          <h3 className="font-semibold text-lg mb-2">Software Engineering</h3>
          <p className="text-gray-600 mb-4">Prof. Davis • Room 220 • TTh 10:00 AM</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-orange-600 font-medium">Attendance: 87%</span>
            <button className="btn bg-orange-500 text-white text-sm py-1 px-3">View Details</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCoursesContent = () => (
    <div className="card-colorful">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
          <i className="fas fa-book text-white text-lg"></i>
        </div>
        Course Materials
      </h2>
      <div className="space-y-6">
        <div className="p-6 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl border border-indigo-200">
          <h3 className="font-semibold text-lg mb-4">Recent Downloads</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
              <i className="fas fa-file-pdf text-red-500"></i>
              <span>CS101_Lecture_12.pdf</span>
              <span className="ml-auto text-sm text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
              <i className="fas fa-file-powerpoint text-orange-500"></i>
              <span>DataStructures_Slides.pptx</span>
              <span className="ml-auto text-sm text-gray-500">1 day ago</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
              <i className="fas fa-file-alt text-blue-500"></i>
              <span>Assignment_3_Instructions.docx</span>
              <span className="ml-auto text-sm text-gray-500">3 days ago</span>
            </div>
          </div>
        </div>
        <div className="p-6 bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl border border-teal-200">
          <h3 className="font-semibold text-lg mb-4">Upcoming Assignments</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <div>
                <span className="font-medium">Database Design Project</span>
                <p className="text-sm text-gray-600">Due: Nov 15, 2024</p>
              </div>
              <span className="text-orange-600 font-medium">In Progress</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <div>
                <span className="font-medium">Algorithm Analysis Report</span>
                <p className="text-sm text-gray-600">Due: Nov 20, 2024</p>
              </div>
              <span className="text-blue-600 font-medium">Not Started</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettingsContent = () => (
    <div className="card-colorful">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-warning rounded-full flex items-center justify-center">
          <i className="fas fa-cog text-white text-lg"></i>
        </div>
        Settings
      </h2>
      <div className="space-y-6">
        <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
          <h3 className="font-semibold text-lg mb-4">Profile Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Email Notifications</span>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm">Enabled</button>
            </div>
            <div className="flex items-center justify-between">
              <span>SMS Alerts</span>
              <button className="bg-gray-500 text-white px-4 py-2 rounded-lg text-sm">Disabled</button>
            </div>
            <div className="flex items-center justify-between">
              <span>Dark Mode</span>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm">Toggle</button>
            </div>
          </div>
        </div>
        <div className="p-6 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border border-red-200">
          <h3 className="font-semibold text-lg mb-4">Privacy Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Show in Leaderboard</span>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm">Public</button>
            </div>
            <div className="flex items-center justify-between">
              <span>Share Attendance Data</span>
              <button className="bg-gray-500 text-white px-4 py-2 rounded-lg text-sm">Private</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAssignmentsContent = () => (
    <div className="card-colorful">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-success rounded-full flex items-center justify-center">
          <i className="fas fa-clipboard-list text-white text-lg"></i>
        </div>
        Assignments & Tasks
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200">
          <h3 className="font-semibold text-lg mb-4">Pending Tasks</h3>
          <div className="space-y-3">
            <div className="p-3 bg-white rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Math Assignment #5</span>
                <span className="text-red-600 text-sm font-medium">Overdue</span>
              </div>
              <p className="text-sm text-gray-600">Due: Nov 10, 2024</p>
            </div>
            <div className="p-3 bg-white rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Physics Lab Report</span>
                <span className="text-orange-600 text-sm font-medium">Due Soon</span>
              </div>
              <p className="text-sm text-gray-600">Due: Nov 16, 2024</p>
            </div>
          </div>
        </div>
        <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
          <h3 className="font-semibold text-lg mb-4">Completed</h3>
          <div className="space-y-3">
            <div className="p-3 bg-white rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">CS Project Phase 1</span>
                <span className="text-green-600 text-sm font-medium">Submitted</span>
              </div>
              <p className="text-sm text-gray-600">Score: 95/100</p>
            </div>
            <div className="p-3 bg-white rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">History Essay</span>
                <span className="text-green-600 text-sm font-medium">Graded</span>
              </div>
              <p className="text-sm text-gray-600">Score: 88/100</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderScheduleContent = () => (
    <div className="card-colorful">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
          <i className="fas fa-calendar-alt text-white text-lg"></i>
        </div>
        Class Schedule
      </h2>
      <div className="space-y-6">
        <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
          <h3 className="font-semibold text-lg mb-4">Today's Classes</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-4 p-3 bg-white rounded-lg">
              <div className="text-center">
                <div className="text-sm text-gray-500">9:00</div>
                <div className="text-sm text-gray-500">AM</div>
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Computer Science 101</h4>
                <p className="text-sm text-gray-600">Room 201 • Prof. Smith</p>
              </div>
              <span className="text-green-600 text-sm font-medium">Present</span>
            </div>
            <div className="flex items-center gap-4 p-3 bg-white rounded-lg">
              <div className="text-center">
                <div className="text-sm text-gray-500">2:00</div>
                <div className="text-sm text-gray-500">PM</div>
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Data Structures</h4>
                <p className="text-sm text-gray-600">Room 305 • Prof. Johnson</p>
              </div>
              <span className="text-orange-600 text-sm font-medium">Upcoming</span>
            </div>
          </div>
        </div>
        <div className="p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200">
          <h3 className="font-semibold text-lg mb-4">This Week</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-purple-700">Monday</h4>
              <p className="text-sm">CS 101 (9:00 AM), Database (1:00 PM)</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-purple-700">Tuesday</h4>
              <p className="text-sm">Data Structures (2:00 PM), Software Eng (10:00 AM)</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-purple-700">Wednesday</h4>
              <p className="text-sm">CS 101 (9:00 AM), Database (1:00 PM)</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-purple-700">Thursday</h4>
              <p className="text-sm">Data Structures (2:00 PM), Software Eng (10:00 AM)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="sidebar-colorful">
        <button 
          onClick={() => handleSidebarClick('dashboard')}
          className={`sidebar-item ${activeSection === 'dashboard' ? 'active' : ''}`}
          title="Dashboard"
        >
          📊
        </button>
        <button 
          onClick={() => handleSidebarClick('classes')}
          className={`sidebar-item ${activeSection === 'classes' ? 'active' : ''}`}
          title="My Classes"
        >
          👥
        </button>
        <button 
          onClick={() => handleSidebarClick('courses')}
          className={`sidebar-item ${activeSection === 'courses' ? 'active' : ''}`}
          title="Course Materials"
        >
          📚
        </button>
        <button 
          onClick={() => handleSidebarClick('settings')}
          className={`sidebar-item ${activeSection === 'settings' ? 'active' : ''}`}
          title="Settings"
        >
          ⚙️
        </button>
        <button 
          onClick={() => handleSidebarClick('assignments')}
          className={`sidebar-item ${activeSection === 'assignments' ? 'active' : ''}`}
          title="Assignments"
        >
          📋
        </button>
        <button 
          onClick={() => handleSidebarClick('schedule')}
          className={`sidebar-item ${activeSection === 'schedule' ? 'active' : ''}`}
          title="Schedule"
        >
          📅
        </button>
      </div>

      <div className="main-content-with-sidebar">
        <NavigationBar title="Student Dashboard" />

        <div className="container-colorful py-8">
          {renderMainContent()}
        </div>
      </div>

      <BiometricModal 
        isOpen={showBiometricModal}
        onClose={() => setShowBiometricModal(false)}
        onSuccess={handleBiometricSuccess}
      />
    </div>
  );
}