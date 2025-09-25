import Link from 'next/link';
import { Logo } from './logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { MOCK_USER } from '@/lib/constants';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="flex items-center gap-2">
            <Star className="text-yellow-400 fill-yellow-400" />
            <span className="font-bold text-lg">5</span>
          </div>
          <Avatar>
            <AvatarImage src="https://picsum.photos/seed/avatar/100/100" data-ai-hint="anime avatar" />
            <AvatarFallback>{MOCK_USER.childName.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
