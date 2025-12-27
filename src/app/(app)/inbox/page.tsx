'use client';

import { useCollection, useUser, useMemoFirebase } from '@/firebase';
import { useFirestore } from '@/firebase';
import { collection, query, where, doc, deleteDoc } from 'firebase/firestore';
import { Conversation, type WithId } from '@/lib/mock-data';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { PageHeader } from '@/components/common/page-header';
import { CarLoader } from '@/components/ui/CarLoader';
import { Trash } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

function ConversationItem({ conv, currentUserId, firestore }: { conv: WithId<Conversation>; currentUserId: string; firestore: any }) {
  const otherParticipantId = conv.participantIds.find(p => p !== currentUserId);
  const { toast } = useToast();

  if (!otherParticipantId) return null;
  
  const otherParticipant = conv.participantDetails[otherParticipantId];
  if (!otherParticipant) return null;
  
  const handleDelete = async () => {
    if (!firestore) return;
    try {
      const conversationRef = doc(firestore, 'conversations', conv.id);
      await deleteDoc(conversationRef);
      toast({
        title: "Conversation Deleted",
        description: "The conversation has been successfully deleted.",
      });
    } catch (error: any) {
       toast({
        title: "Error Deleting Conversation",
        description: error.message,
        variant: "destructive",
      });
    }
  };


  return (
      <Card className="hover:bg-gray-100 transition-colors">
        <div className="p-4 flex items-center justify-between gap-4">
          <Link href={`/inbox/${conv.id}`} className="flex-1 flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={otherParticipant.avatarUrl} data-ai-hint="person face" />
              <AvatarFallback>{otherParticipant.displayName?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold">{otherParticipant.displayName}</h3>
              <p className="text-sm text-muted-foreground truncate">{conv.lastMessage?.text}</p>
            </div>
          </Link>
           <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive active:scale-95">
                <Trash className="h-5 w-5" />
                <span className="sr-only">Delete conversation</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete this conversation and all of its messages. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </Card>
  );
}


export default function InboxPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const conversationsQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
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
             <ConversationItem key={conv.id} conv={conv} currentUserId={user!.uid} firestore={firestore} />
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
