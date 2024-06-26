import SkeletonCard from "@/components/SkeletonCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
    return (
        <main className="px-4 mx-auto my-12 max-w-6xl">
            <div className="flex items-center justify-center mb-6"><Skeleton className="w-[400px] h-[40px]" /></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {"abcdefghi".split('').map(i => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        </main>
    )
}