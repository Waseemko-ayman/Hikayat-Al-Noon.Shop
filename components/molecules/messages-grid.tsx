'use client';

import { MessagesGridProps } from '@/interfaces';
import { Inbox } from 'lucide-react';
import MessageCardSkeleton from '../Skeletons/MessageCardSkeleton';
import EmptyState from './EmptyState';
import MessageCard from './message-card';

const MessagesGrid = ({
  messages,
  originalCount,
  onDelete,
  onMarkAsRead,
  isLoading,
  handleReset,
}: MessagesGridProps) => {
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <MessageCardSkeleton key={i} />
            ))
          : messages.map((message, index) => (
              <div
                key={message.id}
                className="animate-in fade-in slide-in-from-bottom-4"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animationFillMode: 'both',
                }}
              >
                <MessageCard
                  message={message}
                  onDelete={onDelete}
                  onMarkAsRead={onMarkAsRead}
                />
              </div>
            ))}
      </div>

      {!isLoading && messages?.length === 0 && (
        <EmptyState
          imageSrc="no-message.png"
          messageText="No messages found"
          description="Try adjusting your search or filter criteria"
          showButton={messages.length === 0 && originalCount === 0}
          Icon={Inbox}
          buttonText="Reset filters"
          handleClick={handleReset}
        />
      )}
    </div>
  );
};

export default MessagesGrid;
