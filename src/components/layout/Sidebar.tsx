'use client';

// Componente Sidebar com estilização Sicoob

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  FileText, 
  Settings, 
  Users, 
  ChevronLeft, 
  ChevronRight,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface SidebarProps {
  isExpanded: boolean;
  onToggle: () => void;
}

interface MenuItem {
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    href: '/dashboard',
    icon: Home,
    label: 'Home',
  },
  {
    href: '/dashboard/visitas',
    icon: FileText,
    label: 'Visitas',
  },
  {
    href: '/dashboard/configuracoes',
    icon: Settings,
    label: 'Configurações',
    children: [
      {
        href: '/dashboard/configuracoes/usuarios',
        icon: Users,
        label: 'Usuários',
      },
    ],
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ isExpanded, onToggle }) => {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [expandedItems, setExpandedItems] = useState<string[]>(['/dashboard/configuracoes']);

  const toggleExpanded = (href: string) => {
    setExpandedItems(prev => 
      prev.includes(href) 
        ? prev.filter(item => item !== href)
        : [...prev, href]
    );
  };

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={`bg-sicoob-verde-escuro text-white transition-all duration-300 flex flex-col ${
      isExpanded ? 'w-64' : 'w-16'
    }`}>
      {/* Header com Logo */}
      <div className="p-4 border-b border-sicoob-turquesa/20">
        <div className="flex items-center justify-between">
          {isExpanded && (
            <div className="flex items-center space-x-3">
              <div className="bg-sicoob-turquesa rounded-lg w-8 h-8 flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <div>
                <h1 className="font-bold text-lg">SICOOB</h1>
                <p className="text-xs text-gray-300">Sistema de Visitas</p>
              </div>
            </div>
          )}
          
          {!isExpanded && (
            <div className="bg-sicoob-turquesa rounded-lg w-8 h-8 flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-sm">S</span>
            </div>
          )}
        </div>
      </div>

      {/* Toggle Button */}
      <div className="p-2">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-sicoob-turquesa/20 transition-colors"
        >
          {isExpanded ? (
            <ChevronLeft size={20} />
          ) : (
            <ChevronRight size={20} />
          )}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {menuItems.map((item) => (
          <div key={item.href}>
            {/* Item Principal */}
            <div className="relative">
              {item.children ? (
                <button
                  onClick={() => toggleExpanded(item.href)}
                  className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'bg-sicoob-turquesa text-white'
                      : 'hover:bg-sicoob-turquesa/20'
                  }`}
                >
                  <item.icon size={20} />
                  {isExpanded && (
                    <>
                      <span className="ml-3 flex-1 text-left">{item.label}</span>
                      <ChevronRight 
                        size={16} 
                        className={`transition-transform ${
                          expandedItems.includes(item.href) ? 'rotate-90' : ''
                        }`}
                      />
                    </>
                  )}
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'bg-sicoob-turquesa text-white'
                      : 'hover:bg-sicoob-turquesa/20'
                  }`}
                >
                  <item.icon size={20} />
                  {isExpanded && <span className="ml-3">{item.label}</span>}
                </Link>
              )}
            </div>

            {/* Subitens */}
            {item.children && isExpanded && expandedItems.includes(item.href) && (
              <div className="ml-6 mt-1 space-y-1">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={`flex items-center px-3 py-2 rounded-lg transition-colors text-sm ${
                      isActive(child.href)
                        ? 'bg-sicoob-turquesa text-white'
                        : 'hover:bg-sicoob-turquesa/20'
                    }`}
                  >
                    <child.icon size={16} />
                    <span className="ml-3">{child.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* User Info e Logout 
      
      
      
      */}

      <div className="p-4 border-t border-sicoob-turquesa/20">
        {isExpanded && user && (
          <div className="mb-3">
            <p className="text-sm font-medium truncate">{user.nome}</p>
            <p className="text-xs text-gray-300 truncate">{user.email}</p>
            {user.cargo && (
              <p className="text-xs text-gray-400 truncate">{user.cargo}</p>
            )}
          </div>
        )}
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-3 py-2 rounded-lg hover:bg-red-600/20 text-red-300 hover:text-red-200 transition-colors"
        >
          <LogOut size={20} />
          {isExpanded && <span className="ml-3">Sair</span>}
        </button>
      </div>
    </div>
  );
};

