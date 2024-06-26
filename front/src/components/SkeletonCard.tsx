import {
    Card2,
    CardContent2,
    CardDescription2,
    CardFooter2,
    CardHeader2,
    CardTitle2,
    CardImageWithOverlay
  } from "@/components/ui/card2"
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
  import { Badge } from "@/components/ui/badge"
  import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonCard() {
    return (
        <Card2 className="flex flex-col justify-start hover:scale-105 transition">
            <Skeleton className="w-full aspect-[55/31] rounded-none" />
            <CardHeader2 className="flex-row gap-4"> {/* Modified className */}
              <Skeleton className="w-[40px] h-[40px] rounded-full"/>
              <Skeleton className="h-[132px] flex-grow mt-4" />
            </CardHeader2>
          </Card2>
    )
}