import type { PropsWithChildren } from 'react';
import { Header } from '@/app/components/layout/header';
import { getSubjects } from '@/lib/actions';

export default async function MainLayout({ children }: PropsWithChildren) {
    const subjects = await getSubjects();
    return (
        <div className="flex flex-col min-h-screen">
            <Header subjects={subjects} />
            <main className="flex-1 container mx-auto px-4 py-8 md:px-6 lg:py-12">
            {children}
            </main>
        </div>
    );
}
