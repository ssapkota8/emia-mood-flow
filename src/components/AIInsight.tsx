
import { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, Heart, AlertTriangle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AIInsight = ({ insight, onContinue }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => setShowTip(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return <Heart className="w-8 h-8 text-green-500" />;
      case 'negative':
        return <AlertTriangle className="w-8 h-8 text-red-500" />;
      default:
        return <TrendingUp className="w-8 h-8 text-blue-500" />;
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'from-green-100 to-emerald-50 border-green-200';
      case 'negative':
        return 'from-red-100 to-pink-50 border-red-200';
      default:
        return 'from-blue-100 to-indigo-50 border-blue-200';
    }
  };

  const getSentimentEmoji = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return '😊';
      case 'negative':
        return '😞';
      default:
        return '😐';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 via-transparent to-blue-100/20" />
      
      <div className="relative max-w-2xl mx-auto pt-16">
        {/* AI Processing Animation */}
        <div className={`text-center mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="relative inline-block">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Sparkles className="w-8 h-8 text-white animate-pulse" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-bounce"></div>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            AI Analysis Complete
          </h1>
        </div>

        {/* Sentiment Result */}
        <Card className={`backdrop-blur-lg bg-gradient-to-br ${getSentimentColor(insight.sentiment)} border shadow-xl mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              {getSentimentIcon(insight.sentiment)}
              <span className="text-4xl ml-3">{getSentimentEmoji(insight.sentiment)}</span>
            </div>
            <CardTitle className="text-xl font-semibold text-gray-800 capitalize">
              {insight.sentiment} Emotional State Detected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 text-center leading-relaxed">
              {insight.message}
            </p>
          </CardContent>
        </Card>

        {/* Financial Tip */}
        {showTip && (
          <Card className="backdrop-blur-lg bg-white/40 border-white/30 shadow-xl mb-8 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-800">
                <TrendingUp className="w-5 h-5 mr-2 text-purple-500" />
                Personalized Financial Tip
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border-l-4 border-purple-400">
                <p className="text-gray-700 font-medium">
                  {insight.tip}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            onClick={onContinue}
            className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            View Mood Dashboard
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => window.location.reload()}
            className="flex-1 bg-white/50 border-white/50 hover:bg-white/70 py-3 rounded-lg transition-all duration-300"
          >
            Journal Again
          </Button>
        </div>

        {/* Motivational Quote */}
        <Card className="mt-8 backdrop-blur-lg bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <CardContent className="p-6 text-center">
            <p className="text-amber-800 italic">
              "Emotional awareness is the first step toward financial freedom."
            </p>
            <p className="text-amber-600 text-sm mt-2">- E.M.I.A</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIInsight;
