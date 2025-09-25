import type { PropsWithChildren } from 'react';
import { Header } from '@/app/components/layout/header';

export default async function MainLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8 md:px-6 lg:py-12">
            {children}
            </main>
        </div>
    );
}
