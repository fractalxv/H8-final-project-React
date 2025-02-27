import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, LogOut, Pill } from "lucide-react";
import Search from "./Search";
import Button from "./UI/Button";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";

interface HeaderProps {
  title: string;
  keyword: string;
  setKeyword: (keyword: string) => void;
  onChange: () => void;
}

export default function Header({ title, keyword, setKeyword, onChange }: HeaderProps) {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { totalQuantity } = useCart();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className=" mb-2 py-2">
      <div className="container mx-auto px-1">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-3">
          {/* Logo Title */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Pill className="h-10 w-10 text-teal-500" />
              <span className="text-3xl font-bold text-teal-600">{title}</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-grow md:max-w-md">
            <Search keyword={keyword} setKeyword={setKeyword} onChange={onChange} />
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-6">
            {user && (
              <span className="text-gray-600 hidden md:inline-block">
                Welcome, <span className="font-medium">{user.name}</span>
              </span>
            )}
            <Link
              to="/cart"
              className="relative text-gray-600 hover:text-teal-600 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-teal-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </Link>
            <Button
              onClick={handleLogout}
              label="Logout"
              className="flex items-center space-x-1 text-sm py-2 px-3"
            />
          </div>
        </div>
      </div>
    </header>
  );
}