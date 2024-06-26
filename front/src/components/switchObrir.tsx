"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SwitchObrir() {
    return (
        <Tabs defaultValue="account" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Veure a twitch.tv</TabsTrigger>
                <TabsTrigger value="password">Veure aquí</TabsTrigger>
            </TabsList>
        </Tabs>
    )
}