'use client';
import React from 'react';
import Button from '@/components/atoms/Button';
import { userInfoButtons } from '@/data';
import { Menu, ChevronDown } from 'lucide-react';
import { AccountTabsProps } from '@/interfaces';

const AccountTabs: React.FC<AccountTabsProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setDropdownOpen(false);
  };

  const activeLabel =
    userInfoButtons.find((btn) => btn.text.toLowerCase() === activeTab)?.text ||
    'Menu';

  return (
    <div className="pt-6 px-4">
      {/* Desktop Buttons */}
      <div className="hidden md:flex flex-col space-y-2">
        {userInfoButtons.map((btn) => {
          const tabValue = btn.text.toLowerCase();
          const isActive = activeTab === tabValue;
          return (
            <Button
              key={btn.id}
              variant="primary"
              otherClassName={`w-full justify-start ${
                isActive ? '!bg-(--first-color) !text-(--forth-color)' : ''
              }`}
              handleClick={() => handleTabChange(tabValue)}
            >
              {btn.text}
            </Button>
          );
        })}
      </div>

      {/* Mobile Dropdown */}
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"
        >
          <span className="flex items-center gap-2 font-medium text-gray-700">
            <Menu size={18} />
            {activeLabel}
          </span>
          <ChevronDown
            className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
          />
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out mt-2 ${
            dropdownOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
            {userInfoButtons.map((btn, index) => {
              const tabValue = btn.text.toLowerCase();
              const isActive = activeTab === tabValue;
              return (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => handleTabChange(tabValue)}
                  className={`w-full text-left px-4 py-3 cursor-pointer ${
                    isActive
                      ? 'bg-(--header-bg-color) text-(--forth-color) font-semibold'
                      : 'hover:bg-gray-50'
                  } ${index !== userInfoButtons.length - 1 ? 'border-b border-gray-100' : ''}`}
                >
                  {btn.text}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountTabs;
