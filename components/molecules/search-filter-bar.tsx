/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Search, Filter, X } from 'lucide-react';
import Input from '../atoms/Input';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import Button from '../atoms/Button';
import { SearchFilterBarProps } from '@/interfaces';

const SearchFilterBar = ({
  filters,
  setFilters,
  onSearchChange,
}: SearchFilterBarProps) => {
  const { searchQuery, filterStatus } = filters;

  return (
    <div className="flex gap-3 items-center md:justify-between">
      {/* Search */}
      <div className="relative max-md:flex-1">
        <Input
          type="text"
          placeholder="Search messages..."
          inputName="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          otherClassName="w-full! pr-8 rounded-lg! focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64 transition-colors"
        />
        {searchQuery ? (
          <Button
            variant="ghost"
            handleClick={() => onSearchChange('')}
            otherClassName="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-0! hover:bg-transparent! hover:text-(--forth-color)!"
          >
            <X className="h-4 w-4" />
          </Button>
        ) : (
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        )}
      </div>

      {/* Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            otherClassName="flex items-center gap-2 text-black! h-12 md:h-10 px-5! gap-2 border-border! bg-secondary/50! hover:bg-card! hover:border-primary/50!"
          >
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filter</span>
            {filterStatus !== 'all' && (
              <span className="ml-1 rounded-full bg-primary px-1.5 py-0.5 text-xs text-primary-foreground">
                1
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuCheckboxItem
            checked={filterStatus === 'all'}
            onCheckedChange={() =>
              setFilters((prev: any) => ({
                ...prev,
                filterStatus: 'all',
              }))
            }
          >
            All messages
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={filterStatus === 'unread'}
            onCheckedChange={() =>
              setFilters((prev: any) => ({
                ...prev,
                filterStatus: 'unread',
              }))
            }
          >
            Unread only
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={filterStatus === 'read'}
            onCheckedChange={() =>
              setFilters((prev: any) => ({
                ...prev,
                filterStatus: 'read',
              }))
            }
          >
            Read only
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SearchFilterBar;
