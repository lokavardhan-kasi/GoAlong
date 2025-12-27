'use client'

import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Save } from "lucide-react";


export default function SettingsPage() {
    return (
        <>
            <PageHeader title="Settings" description="Manage your account and notification preferences." />

            <div className="max-w-2xl mx-auto space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Notifications</CardTitle>
                        <CardDescription>Choose how you want to be notified.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="email-notifications" className="flex flex-col gap-1">
                                <span>Email Notifications</span>
                                <span className="font-normal text-muted-foreground">Receive emails about new messages and ride requests.</span>
                            </Label>
                            <Switch id="email-notifications" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                             <Label htmlFor="push-notifications" className="flex flex-col gap-1">
                                <span>Push Notifications</span>
                                <span className="font-normal text-muted-foreground">Get push notifications on your devices.</span>
                            </Label>
                            <Switch id="push-notifications" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Account</CardTitle>
                        <CardDescription>Manage your account settings.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div>
                            <Label>Email</Label>
                            <p className="text-muted-foreground text-sm">jane.doe@example.com</p>
                        </div>
                        <Button variant="outline">Change Password</Button>
                    </CardContent>
                </Card>
                <div className="flex justify-end">
                    <Button><Save className="mr-2"/>Save Changes</Button>
                </div>
            </div>
        </>
    )
}