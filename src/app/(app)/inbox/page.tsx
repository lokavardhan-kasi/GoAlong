'use client';

import { useCollection, useUser } from '@/firebase';
import { useFirestore } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { Conversation, type WithId } from '@/lib/mock-data';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { PageHeader } from '@/components/common/page-header';
import { CarLoader } from '@/components/ui/CarLoader';
import { useMemo } from 'react';

function ConversationItem({ conv, currentUserId }: { conv: WithId<Conversation>; currentUserId: string }) {
  const otherParticipantId = conv.participantIds.find(p => p !== currentUserId);
  if (!otherParticipantId) return null;
  
  const otherParticipant = conv.participantDetails[otherParticipantId];
  if (!otherParticipant) return null;

  return (
    <Link href={`/inbox/${conv.id}`}>
      <Card className="hover:bg-gray-100 transition-colors cursor-pointer">
        <CardContent className="p-4 flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={otherParticipant.avatarUrl} data-ai-hint="person face" />
            <AvatarFallback>{otherParticipant.displayName?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold">{otherParticipant.displayName}</h3>
            <p className="text-sm text-muted-foreground truncate">{conv.lastMessage?.text}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}


export default function InboxPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const conversationsQuery = useMemo(() => {
    if (!user) return null;
    return query(
      collection(firestore, 'conversations'),
      where('participantIds', 'array-contains', user.uid)
    );
  }, [user, firestore]);

  const { data: conversations, isLoading: areConversationsLoading } = useCollection<Conversation>(conversationsQuery);

  if (isUserLoading || areConversationsLoading) {
    return (
      <>
        <PageHeader title="Inbox" description="Your conversations with other users." />
        <div className="flex items-center justify-center h-96 border rounded-lg bg-gray-50">
          <CarLoader />
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader title="Inbox" description="Your conversations with other users." />
      
      {conversations && conversations.length > 0 ? (
        <div className="space-y-4">
          {conversations.map(conv => (
             <ConversationItem key={conv.id} conv={conv} currentUserId={user!.uid} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-96 border rounded-lg bg-gray-50">
          <p className="text-muted-foreground">You have no conversations yet.</p>
        </div>
      )}
    </>
  );
}
