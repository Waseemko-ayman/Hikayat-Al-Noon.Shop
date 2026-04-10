'use client';

import MessagesGrid from '@/components/molecules/messages-grid';
import SearchFilterBar from '@/components/molecules/search-filter-bar';
import StatsItem from '@/components/molecules/StatsItem';
import { useUnreadMessages } from '@/context/UnreadMessagesContext';
import useAPI from '@/Hooks/useAPI';
import { useSupabaseQuery } from '@/Hooks/useSupabaseQuery';
import { Message } from '@/interfaces';
import { Mail, MailOpen, MessageSquare } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';

const ContactMessagesPage = () => {
  const [filters, setFilters] = useState({
    searchQuery: '',
    filterStatus: 'all',
  });

  const { searchQuery, filterStatus } = filters;
  const [debouncedSearchTerm] = useDebounce(searchQuery, 700);

  // API Hook
  const { del, edit } = useAPI<Message>('messages');

  // Supabase Hook
  const { data, isLoading } = useSupabaseQuery('messages', {
    message: debouncedSearchTerm
      ? debouncedSearchTerm.toLowerCase()
      : undefined,
    isRead:
      filterStatus === 'all'
        ? undefined
        : filterStatus === 'read'
          ? true
          : false,
  });

  // Context
  const { refreshUnread } = useUnreadMessages();

  const messages: Message[] = useMemo(() => data ?? [], [data]);

  const handleReset = () => {
    setFilters({
      searchQuery: '',
      filterStatus: 'all',
    });
  };

  const handleSearchChange = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: value }));
  }, []);

  const handleDelete = async (id: string) => {
    await del(id);
    refreshUnread();
  };

  const handleMarkAsRead = async (id: string) => {
    await edit(id, { isRead: true });
    refreshUnread();
  };

  const stats = useMemo(() => {
    let unread = 0;
    let read = 0;

    for (const m of messages) {
      if (m.isRead) read++;
      else unread++;
    }

    return {
      total: messages.length,
      unread,
      read,
    };
  }, [messages]);

  return (
    <div className="max-md:mt-5">
      {/* Header */}
      <header className="bg-(--forth-color) text-white rounded-lg mb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Messages</h1>
              <p className="text-sm text-white/80">Manage your inbox</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center sm:justify-between flex-wrap gap-2 md:gap-4">
            <StatsItem Icon={Mail} value={stats.total} label="Total" />
            <StatsItem dot value={stats.unread} label="Unread" />
            <StatsItem Icon={MailOpen} value={stats.read} label="Read" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div>
        {/* Search & Filter */}
        <div className="mb-6">
          <SearchFilterBar
            filters={filters}
            setFilters={setFilters}
            onSearchChange={handleSearchChange}
          />
        </div>

        {/* Results count */}
        <div className="mb-4">
          <p className="text-sm">
            Showing{' '}
            <span className="font-medium text-foreground">
              {messages.length}
            </span>{' '}
            {messages.length === 1 ? 'message' : 'messages'}
            {searchQuery && (
              <span>
                {' '}
                for &quot;<span className="text-primary">{searchQuery}</span>
                &quot;
              </span>
            )}
          </p>
        </div>

        {/* Messages Grid */}
        <MessagesGrid
          messages={messages}
          originalCount={data?.length ?? 0}
          onDelete={handleDelete}
          onMarkAsRead={handleMarkAsRead}
          isLoading={isLoading}
          handleReset={handleReset}
        />
      </div>
    </div>
  );
};

export default ContactMessagesPage;
