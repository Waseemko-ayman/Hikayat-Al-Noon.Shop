import Input from '@/components/atoms/Input';
import { PostsFiltersProps, PostFiltersProps } from '@/interfaces';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, X } from 'lucide-react';
import { postsScope } from '@/data';
import FilteringBadge from '@/components/atoms/FilteringBadge';
import { Button } from '@/components/ui/button';

const PostsFilters = ({
  filters,
  setFilters,
  onSearchChange,
  handleReset,
  hasActiveFilters,
  categories = [],
}: PostsFiltersProps) => {
  const { searchQuery, postScope, category } = filters;

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col justify-center md:flex-row md:justify-between gap-3 mb-8">
        {/* Search Input */}
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Search post..."
            inputName="Search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            otherClassName="!w-full pr-8 !h-[36px] !rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64 transition-colors"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>

        <Select
          value={postScope}
          onValueChange={(val) =>
            setFilters((prev: PostFiltersProps) => ({
              ...prev,
              postScope: val,
            }))
          }
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="postScope" />
          </SelectTrigger>
          <SelectContent>
            {postsScope.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={category}
          onValueChange={(val) =>
            setFilters((prev: PostFiltersProps) => ({
              ...prev,
              category: val,
            }))
          }
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.name}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Active Filters & Reset */}
      {hasActiveFilters && (
        <div className="flex flex-col md:flex-row md:items-center gap-2 text-sm">
          <span className="text-muted-foreground">Active filters:</span>
          <div className="flex-1 flex flex-wrap gap-2">
            {searchQuery && (
              <FilteringBadge text="Search:" filter={searchQuery} />
            )}
            {postScope !== 'all' && (
              <FilteringBadge text="Post Scope:" filter={postScope} />
            )}
            {category !== 'all' && (
              <FilteringBadge text="Category:" filter={category} />
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

export default PostsFilters;
