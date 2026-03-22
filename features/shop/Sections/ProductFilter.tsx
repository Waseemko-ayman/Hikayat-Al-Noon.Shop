/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { X, Search, SlidersHorizontal } from 'lucide-react';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import Input from '@/components/atoms/Input';
import FilteringBadge from '@/components/atoms/FilteringBadge';
import { ProductFilterProps } from '@/interfaces';
import { Switch } from '@/components/ui/switch';

const ProductFilter = ({
  filters,
  setFilters,
  onSearchChange,
  handleReset,
  hasActiveFilters,
  sections = [],
  categories = [],
}: ProductFilterProps) => {
  const { searchQuery, category, sortBy, discount, priceRange, isFiltersOpen } =
    filters;

  return (
    <div className="mb-8 space-y-4">
      {/* Main Filter Bar */}
      <div className="flex flex-col justify-center md:flex-row md:justify-between gap-3">
        {/* Search */}
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Search products..."
            inputName="Search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            otherClassName="!w-full pr-8 !h-[36px] !rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64 transition-colors"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          {/* Category Filter */}
          <Select
            value={category}
            onValueChange={(val) =>
              setFilters((prev: any) => ({ ...prev, category: val }))
            }
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort By */}
          <Select
            value={sortBy}
            onValueChange={(val) =>
              setFilters((prev: any) => ({ ...prev, sortBy: val }))
            }
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              {sections.map((sec) => (
                <SelectItem key={sec.id} value={sec.id}>
                  {sec.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center gap-3">
            {/* More Filters Toggle */}
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setFilters((prev: any) => ({
                  ...prev,
                  isFiltersOpen: !prev.isFiltersOpen,
                }))
              }
              className="!h-[36px]"
              aria-label="Toggle advanced filters"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </Button>

            {/* Discounted */}
            <div className="flex flex-row gap-2 md:gap-0 md:flex-col items-center justify-center h-[36px]">
              <span className="text-sm font-medium">Discounted</span>
              <Switch
                id="discount"
                checked={discount}
                onCheckedChange={(val) =>
                  setFilters((prev: any) => ({ ...prev, discount: val }))
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Filters - Collapsible */}
      <Collapsible
        open={isFiltersOpen}
        onOpenChange={(val) =>
          setFilters((prev: any) => ({ ...prev, isFiltersOpen: val }))
        }
      >
        <CollapsibleContent className="space-y-4">
          <div className="border rounded-lg p-4 bg-muted/30">
            <div className="space-y-4">
              {/* Price Range */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Price Range</label>
                  <span className="text-sm text-muted-foreground">
                    ${priceRange[0]} - ${priceRange[1]}
                  </span>
                </div>
                <Slider
                  min={0}
                  max={1000}
                  step={10}
                  value={priceRange}
                  onValueChange={(val) =>
                    setFilters((prev: any) => ({ ...prev, priceRange: val }))
                  }
                  className="w-full"
                />
              </div>

              {/* Additional filters can be added here */}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Active Filters & Reset */}
      {hasActiveFilters && (
        <div className="flex flex-col md:flex-row md:items-center gap-2 text-sm">
          <span className="text-muted-foreground">Active filters:</span>
          <div className="flex-1 flex flex-wrap gap-2">
            {searchQuery && (
              <FilteringBadge text="Search:" filter={searchQuery} />
            )}
            {category !== 'all' && (
              <FilteringBadge text="Category:" filter={category} />
            )}
            {discount && <FilteringBadge text="Discount:" filter="On Sale" />}
            {sortBy && <FilteringBadge text="Sort by:" filter={sortBy} />}
            {(priceRange[0] !== 0 || priceRange[1] !== 1000) && (
              <FilteringBadge
                filter={`$${priceRange[0]} - $${priceRange[1]}`}
              />
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="h-8 text-muted-foreground hover:text-foreground justify-end md:justify-start"
          >
            <X className="h-4 w-4 mr-1" />
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductFilter;
