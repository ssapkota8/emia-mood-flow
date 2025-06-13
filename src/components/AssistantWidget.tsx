
import { useState, useEffect } from 'react';
import { MessageCircle, X, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const AssistantWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Show the assistant message after 3 seconds
    const timer = setTimeout(() => {
      if (!hasShown) {
        setIsOpen(true);
        setHasShown(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [hasShown]);

  const assistantMessages = [
    "Hi Sudarshan! 👋 I noticed you're feeling a bit anxious. Want to review last week's habits together?",
    "You've been doing great with your journal entries! Your emotional awareness is improving. 🌟",
    "Remember: small steps lead to big changes. Every entry brings you closer to financial wellness. 💪",
    "Feeling stressed about money? Let's explore what's behind those emotions together. 🤗"
  ];

  const [currentMessage] = useState(assistantMessages[0]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Bubble */}
      {isOpen && (
        <Card className="mb-4 max-w-sm backdrop-blur-lg bg-white/90 border-white/30 shadow-xl animate-fade-in">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {currentMessage}
                </p>
                <div className="flex space-x-2 mt-3">
                  <Button size="sm" variant="outline" className="text-xs">
                    Yes, let's review
                  </Button>
                  <Button size="sm" variant="ghost" className="text-xs" onClick={() => setIsOpen(false)}>
                    Not now
                  </Button>
                </div>
              </div>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setIsOpen(false)}
                className="w-6 h-6 p-0 flex-shrink-0"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Assistant Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 relative"
      >
        <MessageCircle className="w-6 h-6 text-white" />
        {!hasShown && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
        )}
      </Button>
    </div>
  );
};

export default AssistantWidget;
