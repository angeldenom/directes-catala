"use client"

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTab } from '@/components/tab-provider';

export function SwitchObrir() {
    const { value, setValue } = useTab();

    return (
        <>
            <div className="flex items-center justify-center mb-6">
                <Tabs value={value} onValueChange={setValue}  className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="twitch">Veure a twitch.tv</TabsTrigger>
                        <TabsTrigger value="aqui">Veure aquí</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
        </>
    )
}