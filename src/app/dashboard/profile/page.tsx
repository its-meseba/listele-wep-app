"use client";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "~/lib/firebase";
import { signOut as firebaseSignOut, User, deleteUser as deleteFirebaseUser } from "firebase/auth";
import { toast } from "sonner";
import { deleteUser as deleteFirestoreUser, getUserProfile, UserProfile } from "~/lib/firestore";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "~/components/ui/alert-dialog";
import Link from "next/link";
import { getPlanBySlug } from "~/lib/plans";
import { BarChart, Mic, Package, CheckCircle2 } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const profile = await getUserProfile(currentUser.uid);
        setUserProfile(profile as UserProfile);
      } else {
        router.push('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await firebaseSignOut(auth);
      // Clear the cookie
      document.cookie = 'firebase-auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      router.push('/');
      toast.success('Signed out successfully');
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('An error occurred while signing out');
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    
    setIsDeleting(true);
    try {
      // First delete from Firestore
      await deleteFirestoreUser(user.uid);
      
      // Then delete auth user
      await deleteFirebaseUser(user);
      
      toast.success('Your account has been deleted successfully');
      router.push('/');
    } catch (error) {
      console.error('Delete account error:', error);
      toast.error('An error occurred while deleting your account');
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  const currentPlan = userProfile ? getPlanBySlug(userProfile.plan) : null;
  const maxProjectsFeature = currentPlan?.features.find(f => f.includes("page") || f.includes("Page"));
  const maxProjects = maxProjectsFeature ? (maxProjectsFeature.toLowerCase().includes("unlimited") ? Infinity : parseInt(maxProjectsFeature.split(" ")[0]) || 1) : (currentPlan?.slug === 'free' ? 1 : Infinity);
  const voiceCreditsFeature = currentPlan?.features.find(f => f.includes("Voice") || f.includes("voice"));
  const voiceCredits = voiceCreditsFeature ? (voiceCreditsFeature.toLowerCase().includes("unlimited") ? Infinity : parseInt(voiceCreditsFeature.split(" ")[0]) || 0) : (currentPlan?.slug === 'free' ? 0 : Infinity);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your basic account information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="mt-1">{user.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Plan and Usage</CardTitle>
                <CardDescription>Your current subscription plan and usage limits.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex justify-between items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                    <div>
                        <p className="font-semibold text-lg">{currentPlan?.name}</p>
                        <p className="text-sm text-muted-foreground">Your Active Plan</p>
                    </div>
                    {currentPlan?.name !== "Unlimited" && (
                        <Button asChild>
                            <Link href="/pricing">Upgrade Plan</Link>
                        </Button>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border">
                        <div className="flex items-center gap-3">
                            <Package className="h-6 w-6 text-muted-foreground" />
                            <p className="font-semibold">Projects</p>
                        </div>
                        <p className="text-2xl font-bold mt-2">
                            {userProfile?.projectsCount ?? 0} / {maxProjects === Infinity ? 'Unlimited' : maxProjects}
                        </p>
                    </div>
                    <div className="p-4 rounded-lg border">
                         <div className="flex items-center gap-3">
                            <Mic className="h-6 w-6 text-muted-foreground" />
                            <p className="font-semibold">Voice Creation Credits</p>
                        </div>
                         <p className="text-2xl font-bold mt-2">
                           {userProfile?.voiceCreditsUsed ?? 0} / {voiceCredits === 0 ? 'None' : voiceCredits}
                        </p>
                    </div>
                </div>

                 <div className="space-y-2 pt-4">
                    <h4 className="font-semibold">Plan Features:</h4>
                    {currentPlan?.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                            <span>{feature}</span>
                        </div>
                    ))}
                 </div>
            </CardContent>
        </Card>

        <Card className="border-red-200 dark:border-red-900">
          <CardHeader>
            <CardTitle className="text-red-600">Danger Zone</CardTitle>
            <CardDescription>These actions cannot be undone</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Button variant="outline" onClick={handleSignOut} className="w-full sm:w-auto">
                  Sign Out
                </Button>
              </div>
              <div>
                <Button 
                  variant="destructive" 
                  onClick={() => setShowDeleteDialog(true)}
                  className="w-full sm:w-auto"
                >
                  Delete My Account
                </Button>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Deleting your account will permanently delete all your data.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delete Account Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete your account?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. All your projects and data will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <Button 
              variant="destructive" 
              onClick={handleDeleteAccount}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Yes, Delete My Account'}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
