"use client"

import React, { useEffect, useState } from 'react';
import { Card2, CardDescription2, CardHeader2, CardTitle2 } from '@/components/ui/card2';
import { ImatgeCarta } from "@/components/ui/imatgeCarta"
import Enllac from "@/components/enllac";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface FreeformTags {
  name: string;
}

interface TwitchGame {
  displayName: string;
}

interface TwitchBroadcaster {
  login: string;
  displayName: string;
  profileImageURL: string;
  primaryColorHex: string | null;
}

interface TwitchNode {
  title: string;
  viewersCount: number;
  previewImageURL: string;
  broadcaster: TwitchBroadcaster;
  game: TwitchGame;
  tags: FreeformTags[] | null;
}

const FetchComponent: React.FC = () => {
  const [data, setData] = useState<TwitchNode[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/consulta', { method: 'GET', credentials: 'include' });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result: TwitchNode[] = await response.json();
        setData(result);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    /*<div className="container mx-auto p-4">
      {data && data.length > 0 ? (
        data.map((node) => (
          <div key={node.title} className="bg-white shadow-md rounded-lg p-4 mb-4">
            <h2 className="text-xl font-bold mb-2">{node.title}</h2>
            <p className="text-gray-700 mb-2">Viewers: {node.viewersCount}</p>
            <img src={node.previewImageURL} alt={node.title} className="w-full h-auto mb-2" />
            <div className="flex items-center mb-2">
              <img src={node.broadcaster.profileImageURL} alt={node.broadcaster.displayName} className="w-10 h-10 rounded-full mr-2" />
              <div>
                <p className="text-gray-900 font-semibold">{node.broadcaster.displayName}</p>
                <p className="text-gray-600">@{node.broadcaster.login}</p>
              </div>
            </div>
            <p className="text-gray-700 mb-2">Game: {node.game.displayName}</p>
            {node.tags && node.tags.length > 0 && (
              <div className="flex flex-wrap">
                {node.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-200 text-gray-800 text-sm font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded">
                    {tag.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">No streams found</div>
      )}
    </div>*/
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {data && data.length > 0 ? (
        data.map((stream) => (
          <div key={stream.broadcaster.login}>
          <Enllac streamer={stream.broadcaster.login}>
          <Card2 className="flex flex-col justify-start hover:scale-105 transition">
            <ImatgeCarta src={stream.previewImageURL} alt="Descripció de la imatge" viewers={stream.viewersCount} />
            <CardHeader2 className="flex-row gap-4">
              <Avatar>
                <AvatarImage src={stream.broadcaster.profileImageURL} alt={stream.broadcaster.displayName} />
                <AvatarFallback>{stream.broadcaster.displayName[0]}</AvatarFallback>
              </Avatar>
              <div style={{ marginTop: 0 }}>
                <CardTitle2>{stream.title}</CardTitle2>
                <CardDescription2>{stream.broadcaster.displayName}</CardDescription2>
                <CardDescription2>{stream.game.displayName}</CardDescription2>
                <div className="mb-0 badge-container">
                  {stream.FreeformTags.map((tag, index) => (
                    <Badge variant="outline" key={tag.name} className="mr-2 mb-0 badge">{ tag.name }</Badge>
                  ))}
                </div>
              </div>
            </CardHeader2>
          </Card2>
          </Enllac></div>
        ))
      ) : (
        <div className="text-center text-gray-500">No streams found</div>
      )}
      </div>
  );
};

export default FetchComponent;