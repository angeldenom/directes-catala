"use client"

import { useTab } from '@/components/tab-provider';

export default function Enllac({
    children,
    streamer,
}: {
    children: React.ReactNode;
    streamer: string;
}) {

    const { value, setValue } = useTab();
    let url = "https://www.twitch.tv/";
    if (value === "aqui") {
        url = "https://app.twitch.cat/";
    }

    return (
        <a href={url + streamer} rel="noopener noreferrer">
            {children}
        </a>
    );
}