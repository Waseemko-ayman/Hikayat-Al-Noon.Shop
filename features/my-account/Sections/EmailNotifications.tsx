'use client';
import Button from '@/components/atoms/Button';
import NotificationSwitch from '@/components/molecules/NotificationSwitch';
import CardWrapper from '@/components/Template/CardWrapper';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { initialNotifications } from '@/data';
import React, { useState } from 'react';

const EmailNotifications = () => {
  const [allNotifications, setAllNotifications] = useState(true);
  const [frequency, setFrequency] = useState('instant');
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleSwitchChange = (id: string, value: boolean) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, value } : notif)),
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      allNotifications,
      // Convert notifications array to an object
      // e.g., { 'order-updates': true, 'security-alerts': false, ... }
      notifications: notifications.reduce(
        (acc, n) => ({ ...acc, [n.id]: n.value }),
        {},
      ),
      frequency,
    };
    console.log('Save changes', payload);
  };

  return (
    <CardWrapper otherClassName="mt-6">
      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <div className="flex items-center justify-between pb-6 border-b border-border">
          <div className="space-y-1">
            <label
              htmlFor="all-notifications"
              className="text-lg font-medium text-foreground"
            >
              Enable all email notifications
            </label>
            <p className="text-sm text-muted-foreground">
              Master control for all email notifications
            </p>
          </div>
          <Switch
            id="all-notifications"
            checked={allNotifications}
            onCheckedChange={setAllNotifications}
          />
        </div>

        <div className="space-y-5">
          {notifications.map((notif) => (
            <NotificationSwitch
              key={notif.id}
              id={notif.id}
              label={notif.label}
              desc={notif.desc}
              checked={notif.value}
              onChange={(value) => handleSwitchChange(notif.id, value)}
              disabled={!allNotifications}
            />
          ))}
        </div>

        <div className="pt-6 border-t border-border space-y-3">
          <label
            htmlFor="frequency"
            className="text-base font-medium text-foreground"
          >
            Notification frequency
          </label>
          <Select
            value={frequency}
            onValueChange={setFrequency}
            disabled={!allNotifications}
          >
            <SelectTrigger id="frequency" className="h-11 bg-background mt-2">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="instant">Instant</SelectItem>
              <SelectItem value="daily">Daily digest</SelectItem>
              <SelectItem value="weekly">Weekly summary</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            Choose how often you want to receive email notifications
          </p>
        </div>

        <Button type="submit" otherClassName="w-full font-medium">
          Save Changes
        </Button>
      </form>
    </CardWrapper>
  );
};

export default EmailNotifications;
