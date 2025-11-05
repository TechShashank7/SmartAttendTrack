import { Link } from "wouter";

interface NavigationBarProps {
  title: string;
  backTo?: string;
}

export default function NavigationBar({ title, backTo = "/" }: NavigationBarProps) {
  return (
    <nav className="nav-bar">
      <div className="container-colorful flex items-center justify-between">
        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="w-10 md:w-12 h-10 md:h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
            <i className="fas fa-user-check text-white text-sm md:text-lg"></i>
          </div>
          <h2 className="text-lg md:text-2xl font-semibold text-white" data-testid="text-page-title">{title}</h2>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <Link href={backTo}>
            <button className="btn bg-white text-gray-800 hover:shadow-lg text-sm md:text-base px-3 md:px-4 py-2 md:py-3" data-testid="button-back-home">
              <i className="fas fa-arrow-left"></i>
              <span className="hidden sm:inline ml-2">Back to Home</span>
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
