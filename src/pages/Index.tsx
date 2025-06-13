
import { useState } from 'react';
import { ArrowDown, Brain, Heart, TrendingUp, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import JournalEntry from '@/components/JournalEntry';
import AIInsight from '@/components/AIInsight';
import MoodDashboard from '@/components/MoodDashboard';
import AssistantWidget from '@/components/AssistantWidget';

const Index = () => {
  const [currentView, setCurrentView] = useState('home');
  const [journalEntries, setJournalEntries] = useState([]);
  const [currentInsight, setCurrentInsight] = useState(null);

  const handleJournalSubmit = (entry) => {
    // Simulate AI processing
    const sentiments = ['positive', 'negative', 'neutral'];
    const randomSentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
    
    const insights = {
      positive: {
        sentiment: 'positive',
        message: "Great job! Your positive mindset about money is your superpower. Keep building those healthy financial habits!",
        tip: "Consider setting up automatic savings to maintain this momentum."
      },
      negative: {
        sentiment: 'negative', 
        message: "I understand money stress can feel overwhelming. Remember, every small step towards financial wellness counts.",
        tip: "Try the 50/30/20 budgeting rule to regain control over your finances."
      },
      neutral: {
        sentiment: 'neutral',
        message: "You're taking a balanced approach to money. This awareness is the first step towards financial growth.",
        tip: "Consider tracking your spending for a week to identify patterns."
      }
    };

    const newEntry = {
      id: Date.now(),
      text: entry,
      sentiment: randomSentiment,
      timestamp: new Date(),
      insight: insights[randomSentiment]
    };

    setJournalEntries(prev => [newEntry, ...prev]);
    setCurrentInsight(insights[randomSentiment]);
    setCurrentView('insight');
  };

  const renderView = () => {
    switch(currentView) {
      case 'journal':
        return <JournalEntry onSubmit={handleJournalSubmit} onBack={() => setCurrentView('home')} />;
      case 'insight':
        return <AIInsight insight={currentInsight} onContinue={() => setCurrentView('dashboard')} />;
      case 'dashboard':
        return <MoodDashboard entries={journalEntries} onBack={() => setCurrentView('home')} />;
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 via-transparent to-blue-100/20" />
            
            {/* Hero Section */}
            <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
              <div className="text-center space-y-8 max-w-4xl mx-auto">
                {/* Logo/Brand */}
                <div className="flex items-center justify-center space-x-3 mb-8">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    E.M.I.A
                  </h1>
                </div>

                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-gray-600 font-light">
                  Emotional Money Intelligence Assistant
                </p>

                {/* Mission Statement */}
                <div className="max-w-2xl mx-auto">
                  <Card className="backdrop-blur-lg bg-white/30 border-white/20 shadow-xl">
                    <CardContent className="p-8">
                      <p className="text-lg text-gray-700 leading-relaxed">
                        Transform your relationship with money through emotional awareness. 
                        Journal your feelings, understand your patterns, and build healthier financial habits with AI-powered insights.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Feature Cards */}
                <div className="grid md:grid-cols-3 gap-6 mt-16">
                  <Card className="backdrop-blur-lg bg-white/20 border-white/30 hover:bg-white/30 transition-all duration-300 group">
                    <CardContent className="p-6 text-center">
                      <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Emotional Journaling</h3>
                      <p className="text-gray-600 text-sm">Express your money feelings freely</p>
                    </CardContent>
                  </Card>

                  <Card className="backdrop-blur-lg bg-white/20 border-white/30 hover:bg-white/30 transition-all duration-300 group">
                    <CardContent className="p-6 text-center">
                      <Brain className="w-12 h-12 text-purple-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">AI Insights</h3>
                      <p className="text-gray-600 text-sm">Get personalized financial guidance</p>
                    </CardContent>
                  </Card>

                  <Card className="backdrop-blur-lg bg-white/20 border-white/30 hover:bg-white/30 transition-all duration-300 group">
                    <CardContent className="p-6 text-center">
                      <TrendingUp className="w-12 h-12 text-blue-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Mood Tracking</h3>
                      <p className="text-gray-600 text-sm">Visualize your emotional patterns</p>
                    </CardContent>
                  </Card>
                </div>

                {/* CTA Button */}
                <div className="pt-8">
                  <Button 
                    onClick={() => setCurrentView('journal')}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Start Your Journey
                    <ArrowDown className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
              <Card className="backdrop-blur-lg bg-white/30 border-white/20">
                <CardContent className="p-2">
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => setCurrentView('journal')}>
                      Journal
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setCurrentView('dashboard')}>
                      Dashboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="relative">
      {renderView()}
      <AssistantWidget />
    </div>
  );
};

export default Index;
