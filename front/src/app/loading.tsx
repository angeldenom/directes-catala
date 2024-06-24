import SkeletonCard from "@/components/SkeletonCard";

export default function loading() {
    return (
        <main className="px-4 mx-auto my-12 max-w-6xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {"abcdefghi".split('').map(i => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        </main>
    )
}