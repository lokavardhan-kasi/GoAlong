'use client';

import { useParams } from 'next/navigation';
import { useCollection, useDoc, useFirestore, useUser, useMemoFirebase } from '@/firebase';
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { collection, doc, orderBy, query, serverTimestamp, addDoc, increment, updateDoc } from 'firebase/firestore';
import { WithId, Conversation, Message } from '@/lib/mock-data';
import { PageHeader } from '@/components/common/page-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { CarLoader } from '@/components/ui/CarLoader';
import { cn } from '@/lib/utils';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';

export default function ConversationPage() {
  const params = useParams();
  const { id: conversationId } = params;
  const { user } = useUser();
  const firestore = useFirestore();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const conversationRef = useMemoFirebase(() => {
    if (!firestore || typeof conversationId !== 'string') return null;
    return doc(firestore, 'conversations', conversationId);
  }, [firestore, conversationId]);

  const { data: conversation, isLoading: isConversationLoading } = useDoc<Conversation>(conversationRef);

  const messagesQuery = useMemoFirebase(() => {
    if (!conversationRef) return null;
    return query(collection(conversationRef, 'messages'), orderBy('timestamp', 'asc'));
  }, [conversationRef]);

  const { data: messages, isLoading: areMessagesLoading } = useCollection<Message>(messagesQuery);
  
  const otherParticipant = useMemo(() => {
    if (!conversation || !user) return null;
    const otherId = conversation.participantIds.find(id => id !== user.uid);
    return otherId ? conversation.participantDetails[otherId] : null;
  }, [conversation, user]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (user && conversationRef && firestore) {
      // Mark messages as read by setting the user's unread count to 0
      const unreadCountKey = `unreadCounts.${user.uid}`;
      updateDoc(conversationRef, {
        [unreadCountKey]: 0,
      });
    }
  }, [user, conversationRef, firestore, messages]);


  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!firestore || !user || !conversationRef || !newMessage.trim() || !otherParticipant) return;

    const otherParticipantId = conversation.participantIds.find(id => id !== user.uid);
    if (!otherParticipantId) return;

    const messagesCol = collection(conversationRef, 'messages');
    
    await addDoc(messagesCol, {
      text: newMessage,
      senderId: user.uid,
      timestamp: serverTimestamp(),
    });
    
    // Increment unread count for the other participant and update last message
    const unreadCountKey = `unreadCounts.${otherParticipantId}`;
    setDocumentNonBlocking(
      conversationRef,
      { 
        lastMessage: { text: newMessage, senderId: user.uid, timestamp: serverTimestamp() },
        [unreadCountKey]: increment(1),
      },
      { merge: true }
    );

    setNewMessage('');
  };

  if (isConversationLoading || areMessagesLoading) {
    return <div className="flex h-full items-center justify-center"><CarLoader /></div>;
  }
  
  if (!conversation) {
    return <PageHeader title="Conversation not found" showBackButton/>;
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <PageHeader title={otherParticipant?.displayName || 'Chat'} showBackButton />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages?.map(msg => (
          <div key={msg.id} className={cn('flex items-end gap-2', msg.senderId === user?.uid ? 'justify-end' : 'justify-start')}>
             {msg.senderId !== user?.uid && (
                <Avatar className="h-8 w-8">
                    <AvatarImage src={otherParticipant?.avatarUrl} />
                    <AvatarFallback>{otherParticipant?.displayName?.charAt(0)}</AvatarFallback>
                </Avatar>
             )}
            <div className={cn(
              'max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-2xl',
              msg.senderId === user?.uid ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-muted rounded-bl-none'
            )}>
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
         <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t bg-background">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Input 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!newMessage.trim()}>
            <Send />
          </Button>
        </form>
      </div>
    </div>
  );
}

    