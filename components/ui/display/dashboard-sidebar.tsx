'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import useIsMobile from '@/Hooks/useIsMobile';
import { Button } from '../button';
import SidebarContent from '@/components/molecules/SidebarContent';

export function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const rawPathname = usePathname();
  const pathname = rawPathname.replace(/^\/(en|ar)(?=\/|$)/, '') || '/';
  const isMobile = useIsMobile(639);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {isMobile && (
        <div className="fixed right-4 top-4 z-40">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="shadow-xl">
                <Menu className="h-5 w-5 text-black" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="p-0 w-64 bg-white" closeIconColor="black">
              <SidebarContent pathname={pathname} />
            </SheetContent>
          </Sheet>
        </div>
      )}

      {!isMobile && (
        <div className="hidden sm:flex h-screen w-16 lg:w-64 flex-col justify-between border border-gray-300 bg-white rounded-br-lg">
          <SidebarContent pathname={pathname} />
        </div>
      )}
    </>
  );
}
