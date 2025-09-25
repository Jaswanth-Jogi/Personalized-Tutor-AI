import Link from 'next/link';
import { Logo } from './logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Star, Menu, Award } from 'lucide-react';
import { MOCK_USER } from '@/lib/constants';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
          </Link>
          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            <Link
                href={`/`}
                className="transition-colors hover:text-foreground/80 text-foreground/60 flex items-center gap-1"
              >
                Dashboard
              </Link>
            <Link
                href={`/badges`}
                className="transition-colors hover:text-foreground/80 text-foreground/60 flex items-center gap-1"
              >
                <Award className="h-4 w-4" />
                Badges
              </Link>
          </nav>
        </div>
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <div className="p-4">
                        <Logo />
                        <nav className="mt-8 flex flex-col space-y-4">
                          <Link href="/" className="font-medium text-foreground">Dashboard</Link>
                          <Link href="/badges" className="font-medium text-muted-foreground flex items-center gap-1">
                            <Award className="h-4 w-4" />
                            Badges
                          </Link>
                        </nav>
                    </div>
                </SheetContent>
            </Sheet>
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
