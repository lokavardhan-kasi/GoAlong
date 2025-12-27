'use client'
import { PageHeader } from '@/components/common/page-header'

export default function InboxPage() {
    return (
        <>
            <PageHeader title="Inbox" description="Your conversations with other users." />
            <div className="flex items-center justify-center h-96 border rounded-lg bg-gray-50">
                <p className="text-muted-foreground">Select a conversation to start messaging.</p>
            </div>
        </>
    )
}