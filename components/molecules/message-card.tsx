'use client';

import { useState } from 'react';
import { Mail, Trash2, CheckCheck, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MessageCardProps } from '@/interfaces';

const MessageCard = ({ message, onDelete, onMarkAsRead }: MessageCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const createdAt = new Date(message?.created_at || '').toLocaleDateString(
    'en-US',
    {
      year: '2-digit',
      month: 'short',
      day: 'numeric',
    },
  );

  return (
    <article
      className={cn(
        'group relative rounded-xl border border-border bg-card p-6',
        'transition-all duration-300 ease-out',
        'hover:border-(--third-color) hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1',
        'flex flex-col h-full min-h-[220px]',
        !message.isRead && 'border-l-4 border-l-(--forth-color)',
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <header className="mb-4 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 w-full">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-(--forth-color)">
            <User className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold text-foreground">
                {message.username}
              </h3>
              {message?.created_at && (
                <time
                  dateTime={message.created_at}
                  className="text-xs text-muted-foreground"
                >
                  {createdAt}
                </time>
              )}
            </div>
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Mail className="h-3.5 w-3.5" />
              {message.email}
            </p>
          </div>
        </div>
      </header>
      {/* Content */}
      <div>
        {/* Subject */}
        <h4 className="mb-2 font-medium text-foreground">{message.subject}</h4>

        {/* Message */}
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground mb-4">
          {message.message}
        </p>
      </div>
      {/* Actions */}
      <footer
        className={cn(
          'flex items-center gap-2 pt-4 border-t border-border transition-opacity duration-200 mt-auto',
          isHovered ? 'opacity-100' : 'opacity-0',
        )}
      >
        {!message.isRead && onMarkAsRead && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onMarkAsRead(message.id)}
            className="h-8 gap-1.5 text-xs hover:bg-primary/10 hover:text-primary"
          >
            <CheckCheck className="h-3.5 w-3.5" />
            Mark as read
          </Button>
        )}
        {onDelete && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(message.id)}
            className="h-8 gap-1.5 text-xs hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </Button>
        )}
      </footer>
      {/* Unread indicator */}
      {!message.isRead && (
        <>
          <div className="absolute right-4 top-4 h-2 w-2 rounded-full bg-green-600 animate-ping"></div>
          <div className="absolute right-4 top-4 h-2 w-2 rounded-full bg-green-600"></div>
        </>
      )}
    </article>
  );
};

export default MessageCard;
