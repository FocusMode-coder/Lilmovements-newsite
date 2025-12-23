'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import GlassButton from '@/components/GlassButton';

// Types
interface SuggestedMember {
  id: string;
  name: string | null;
  createdAt: string;
}

interface ContactRequestData {
  id: string;
  fromUser: {
    id: string;
    name: string | null;
  };
  createdAt: string;
}

interface ConversationData {
  id: string;
  otherParticipant: {
    id: string;
    name: string | null;
  };
  lastMessage?: {
    content: string;
    createdAt: string;
    senderId: string;
  };
}

interface MessageData {
  id: string;
  content: string;
  createdAt: string;
  sender: {
    id: string;
    name: string | null;
  };
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect unauthenticated users to join page
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/join');
    }
  }, [status, router]);

  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#fffaf6] to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-900 mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render content if not authenticated (prevents flash)
  if (!session) {
    return null;
  }

  return <AuthenticatedDashboard session={session} />;
}

function AuthenticatedDashboard({ session }: { session: any }) {
  const router = useRouter();

  // Social state
  const [suggestedMembers, setSuggestedMembers] = useState<SuggestedMember[]>([]);
  const [contactRequests, setContactRequests] = useState<ContactRequestData[]>([]);
  const [conversations, setConversations] = useState<ConversationData[]>([]);
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);

  // Fetch social data and user profile
  useEffect(() => {
    if (session?.user?.id) {
      fetchUserData();
    }
  }, [session?.user?.id]);

  const fetchUserData = async () => {
    try {
      // Fetch user profile with onboarding data
      const profileRes = await fetch('/api/user/profile');
      if (profileRes.ok) {
        const profile = await profileRes.json();
        setUserProfile(profile);
      }

      const [membersRes, requestsRes, conversationsRes] = await Promise.all([
        fetch('/api/social/suggested-members'),
        fetch('/api/social/contact-requests'),
        fetch('/api/social/conversations')
      ]);

      if (membersRes.ok) {
        setSuggestedMembers(await membersRes.json());
      }
      if (requestsRes.ok) {
        setContactRequests(await requestsRes.json());
      }
      if (conversationsRes.ok) {
        setConversations(await conversationsRes.json());
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContactRequest = async (toUserId: string) => {
    try {
      const response = await fetch('/api/contact-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toUserId })
      });

      if (response.ok) {
        // Remove from suggested members
        setSuggestedMembers(prev => prev.filter(member => member.id !== toUserId));
      }
    } catch (error) {
      console.error('Failed to send contact request:', error);
    }
  };

  const handleRequestResolution = async (requestId: string, action: 'accept' | 'reject') => {
    try {
      const response = await fetch('/api/contact-requests/resolve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId, action })
      });

      if (response.ok) {
        // Remove from contact requests
        setContactRequests(prev => prev.filter(req => req.id !== requestId));
        // Refresh conversations if accepted
        if (action === 'accept') {
          fetchUserData();
        }
      }
    } catch (error) {
      console.error('Failed to resolve request:', error);
    }
  };

  const loadMessages = async (conversationId: string) => {
    try {
      const response = await fetch(`/api/messages?conversationId=${conversationId}`);
      if (response.ok) {
        const messagesData = await response.json();
        setMessages(messagesData);
        setActiveConversation(conversationId);
      }
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConversation) return;

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId: activeConversation,
          content: newMessage.trim()
        })
      });

      if (response.ok) {
        const message = await response.json();
        setMessages(prev => [...prev, message]);
        setNewMessage('');
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  // Personalize classes based on user interests
  const getPersonalizedClasses = () => {
    const userInterests = userProfile?.classInterests || [];
    const userGoals = userProfile?.goals || [];
    const experienceLevel = userProfile?.experienceLevel || 'Complete Beginner';
    
    const allClasses = [
      {
        title: "Morning Flow",
        duration: "25 min",
        description: "Gentle awakening movements to start your day with intention and energy.",
        badge: { text: "25 min", color: "bg-green-100 text-green-800" },
        tags: ["Contemporary Flow", "Mindfulness & Mental Health", "Gentle Movement"],
        level: ["Complete Beginner", "Some Experience"]
      },
      {
        title: "Strength & Flow", 
        duration: "Dynamic",
        description: "Build functional strength while honoring your body's natural wisdom.",
        badge: { text: "Dynamic", color: "bg-orange-100 text-orange-800" },
        tags: ["Strength Training", "Contemporary Flow", "Build Strength"],
        level: ["Some Experience", "Intermediate", "Advanced"]
      },
      {
        title: "Evening Unwind",
        duration: "Gentle", 
        description: "Release the day's tension and prepare your body for restful sleep.",
        badge: { text: "Gentle", color: "bg-blue-100 text-blue-800" },
        tags: ["Yoga & Mindfulness", "Stress Reduction", "Better Sleep"],
        level: ["Complete Beginner", "Some Experience", "Intermediate"]
      },
      {
        title: "Dance Expression",
        duration: "Creative", 
        description: "Express yourself through free-flowing dance and creative movement.",
        badge: { text: "Creative", color: "bg-purple-100 text-purple-800" },
        tags: ["Dance Movement", "Dance & Expression", "Contemporary Flow"],
        level: ["Some Experience", "Intermediate", "Advanced"]
      },
      {
        title: "Mindful Meditation",
        duration: "20 min", 
        description: "Center yourself with guided breathwork and meditation practices.",
        badge: { text: "20 min", color: "bg-blue-100 text-blue-800" },
        tags: ["Meditation", "Breathwork", "Mindfulness & Mental Health"],
        level: ["Complete Beginner", "Some Experience", "Intermediate", "Advanced"]
      }
    ];

    // Filter and sort classes based on user preferences
    return allClasses
      .filter(cls => {
        const hasMatchingInterest = cls.tags.some(tag => userInterests.includes(tag)) || userInterests.length === 0;
        const hasMatchingGoal = cls.tags.some(tag => userGoals.includes(tag)) || userGoals.length === 0;
        const hasMatchingLevel = cls.level.includes(experienceLevel);
        
        return hasMatchingLevel && (hasMatchingInterest || hasMatchingGoal);
      })
      .slice(0, 3); // Show top 3 personalized classes
  };

  const getPersonalizedWelcome = () => {
    const goals = userProfile?.goals || [];
    const practiceTime = userProfile?.practiceTime || '';
    const firstName = session.user?.name?.split(' ')[0] || 'Beautiful Soul';
    
    let welcomeMessage = `Welcome back, ${firstName}!`;
    
    if (practiceTime.includes('Morning')) {
      welcomeMessage = `Good morning, ${firstName}!`;
    } else if (practiceTime.includes('Evening')) {
      welcomeMessage = `Good evening, ${firstName}!`;
    }
    
    let subtitle = "Ready to move with intention today?";
    
    if (goals.includes('Stress Reduction')) {
      subtitle = "Ready to release some tension and find your center?";
    } else if (goals.includes('Build Strength')) {
      subtitle = "Ready to build strength and feel empowered?";
    } else if (goals.includes('Increase Flexibility')) {
      subtitle = "Ready to flow and increase your flexibility?";
    }
    
    return { welcomeMessage, subtitle };
  };

  const personalizedClasses = getPersonalizedClasses();
  const { welcomeMessage, subtitle } = getPersonalizedWelcome();

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-neutral-900">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 z-0 w-full h-full object-cover"
      >
        <source src="/assets/dronshot.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Soft Overlay */}
      <div className="absolute inset-0 z-10 bg-black/25 backdrop-blur-[2px]"></div>

      {/* Foreground Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 py-10 space-y-8">
        
        {/* TOP HERO CARD - Personalized */}
        <div className="rounded-3xl bg-white/70 backdrop-blur-md border border-white/60 shadow-xl p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Left Side - Personalized Welcome */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-2">
              {welcomeMessage}
            </h1>
            <p className="text-lg text-neutral-600 mb-2">
              {subtitle}
            </p>
            
            {/* Show personalization based on user data */}
            {userProfile && (
              <div className="flex flex-wrap gap-2 mt-3">
                {userProfile.experienceLevel && (
                  <span className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                    {userProfile.experienceLevel}
                  </span>
                )}
                {userProfile.sessionDuration && (
                  <span className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                    Prefers {userProfile.sessionDuration}
                  </span>
                )}
                {userProfile.practiceTime && (
                  <span className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                    {userProfile.practiceTime}
                  </span>
                )}
              </div>
            )}
          </div>
          
          {/* Right Side - Action Buttons */}
          <div className="flex flex-col gap-3 md:min-w-[200px]">
            <button className="bg-white/90 backdrop-blur-md border border-white/70 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-white transition-all duration-200 transform hover:scale-105 shadow-lg w-full">
              Start Today's Practice
            </button>
            <button className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 shadow-lg w-full">
              Explore All Classes  
            </button>
          </div>
        </div>

        {/* PERSONALIZED CLASSES SECTION */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white drop-shadow-lg">
              Recommended for You
            </h2>
            {userProfile?.goals && userProfile.goals.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {JSON.parse(userProfile.goals).slice(0, 2).map((goal: string) => (
                  <span key={goal} className="px-3 py-1 text-xs bg-white/20 text-white rounded-full backdrop-blur-md">
                    {goal}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {personalizedClasses.map((classItem) => (
              <div key={classItem.title} className="rounded-2xl bg-white/65 backdrop-blur-md border border-white/50 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-neutral-900">{classItem.title}</h3>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${classItem.badge.color}`}>
                    {classItem.badge.text}
                  </span>
                </div>
                <p className="text-neutral-600 text-sm mb-4">
                  {classItem.description}
                </p>
                
                {/* Show why this class was recommended */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">Perfect for:</p>
                  <div className="flex flex-wrap gap-1">
                    {classItem.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button className="bg-white/90 backdrop-blur-md border border-white/70 text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-white transition-all duration-200 w-full text-sm">
                  Start Class
                </button>
              </div>
            ))}
          </div>
          
          {personalizedClasses.length === 0 && (
            <div className="text-center py-8">
              <p className="text-white/80 mb-4">Complete your profile to get personalized recommendations!</p>
              <button className="bg-white/20 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/30 transition-all duration-200 backdrop-blur-md">
                Update Preferences
              </button>
            </div>
          )}
        </div>

        {/* COMMUNITY SECTION */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white drop-shadow-lg">
            Community
          </h2>
          
          {/* Suggested Members */}
          <div className="overflow-x-auto">
            <div className="flex gap-4 pb-2">
              {suggestedMembers.map((member) => (
                <div key={member.id} className="flex flex-col items-center gap-2 min-w-[70px]">
                  <button
                    onClick={() => handleContactRequest(member.id)}
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-300 to-orange-300 flex items-center justify-center text-white font-semibold text-lg shadow-lg hover:scale-110 transition-transform duration-200"
                  >
                    {(member.name?.[0] || 'M').toUpperCase()}
                  </button>
                  <span className="text-white text-sm font-medium drop-shadow">
                    {member.name?.split(' ')[0] || 'Member'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Contact Requests Card */}
            <div className="rounded-2xl bg-white/65 backdrop-blur-md border border-white/50 shadow-md p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                Connection Requests ({contactRequests.length})
              </h3>
              {contactRequests.length === 0 ? (
                <p className="text-neutral-600 text-sm">No pending requests</p>
              ) : (
                <div className="space-y-3">
                  {contactRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-3 rounded-xl bg-white/50">
                      <span className="font-medium text-neutral-900">
                        {request.fromUser.name || 'Member'}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleRequestResolution(request.id, 'accept')}
                          className="px-3 py-1 text-xs bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleRequestResolution(request.id, 'reject')}
                          className="px-3 py-1 text-xs bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Messages Card */}
            <div className="rounded-2xl bg-white/80 backdrop-blur-md border border-white/60 shadow-xl p-4 flex flex-col h-[400px]">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                Messages
              </h3>
              <div className="flex gap-4 flex-1 min-h-0">
                {/* Conversations List */}
                <div className="w-1/3 border-r border-white/30 pr-4">
                  <div className="space-y-2 max-h-full overflow-y-auto">
                    {conversations.map((conv) => (
                      <button
                        key={conv.id}
                        onClick={() => loadMessages(conv.id)}
                        className={`w-full text-left p-2 rounded-lg transition-colors ${
                          activeConversation === conv.id 
                            ? 'bg-white/80' 
                            : 'bg-white/40 hover:bg-white/60'
                        }`}
                      >
                        <div className="font-medium text-sm text-neutral-900">
                          {conv.otherParticipant.name || 'Member'}
                        </div>
                        <div className="text-xs text-neutral-600 truncate">
                          {conv.lastMessage?.content || 'Start chatting...'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Chat */}
                <div className="flex-1 flex flex-col min-h-0">
                  {activeConversation ? (
                    <>
                      {/* Messages Area */}
                      <div className="flex-1 overflow-y-auto space-y-2 text-sm mb-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${
                              message.sender.id === session?.user?.id ? 'justify-end' : 'justify-start'
                            }`}
                          >
                            <div
                              className={`max-w-[70%] px-3 py-2 rounded-lg ${
                                message.sender.id === session?.user?.id
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-white/80 text-neutral-900'
                              }`}
                            >
                              {message.content}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Message Input */}
                      <form onSubmit={sendMessage} className="flex gap-2">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type a message..."
                          className="flex-1 px-3 py-2 rounded-lg bg-white/70 border border-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                        >
                          Send
                        </button>
                      </form>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center text-neutral-600 text-sm">
                      Select a conversation to start chatting
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sign Out */}
        <div className="flex justify-center pt-4">
          <GlassButton
            label="Sign Out"
            onClick={handleSignOut}
            variant="secondary"
            className="opacity-80"
          />
        </div>
      </div>
    </div>
  );
}