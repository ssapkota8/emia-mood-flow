
import { ArrowLeft, TrendingUp, Calendar, Smile, Meh, Frown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MoodDashboard = ({ entries, onBack }) => {
  const getMoodEmoji = (sentiment) => {
    switch (sentiment) {
      case 'positive': return '😊';
      case 'negative': return '😞';
      default: return '😐';
    }
  };

  const getMoodColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'text-green-500 bg-green-50';
      case 'negative': return 'text-red-500 bg-red-50';
      default: return 'text-blue-500 bg-blue-50';
    }
  };

  const getStats = () => {
    if (entries.length === 0) return { positive: 0, negative: 0, neutral: 0 };
    
    const stats = entries.reduce((acc, entry) => {
      acc[entry.sentiment]++;
      return acc;
    }, { positive: 0, negative: 0, neutral: 0 });

    return stats;
  };

  const stats = getStats();
  const totalEntries = entries.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 via-transparent to-blue-100/20" />
      
      <div className="relative max-w-4xl mx-auto pt-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Mood Dashboard
          </h1>
        </div>

        {totalEntries === 0 ? (
          <Card className="backdrop-blur-lg bg-white/40 border-white/30 shadow-xl text-center">
            <CardContent className="p-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No entries yet</h3>
              <p className="text-gray-600 mb-6">Start journaling to see your emotional patterns</p>
              <Button 
                onClick={onBack}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
              >
                Write Your First Entry
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="backdrop-blur-lg bg-gradient-to-br from-green-100 to-emerald-50 border-green-200 shadow-lg">
                <CardContent className="p-6 text-center">
                  <Smile className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-700">{stats.positive}</div>
                  <div className="text-sm text-green-600">Positive Days</div>
                  {totalEntries > 0 && (
                    <div className="text-xs text-green-500 mt-1">
                      {Math.round((stats.positive / totalEntries) * 100)}%
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="backdrop-blur-lg bg-gradient-to-br from-blue-100 to-indigo-50 border-blue-200 shadow-lg">
                <CardContent className="p-6 text-center">
                  <Meh className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-700">{stats.neutral}</div>
                  <div className="text-sm text-blue-600">Neutral Days</div>
                  {totalEntries > 0 && (
                    <div className="text-xs text-blue-500 mt-1">
                      {Math.round((stats.neutral / totalEntries) * 100)}%
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="backdrop-blur-lg bg-gradient-to-br from-red-100 to-pink-50 border-red-200 shadow-lg">
                <CardContent className="p-6 text-center">
                  <Frown className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-red-700">{stats.negative}</div>
                  <div className="text-sm text-red-600">Challenging Days</div>
                  {totalEntries > 0 && (
                    <div className="text-xs text-red-500 mt-1">
                      {Math.round((stats.negative / totalEntries) * 100)}%
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Recent Entries */}
            <Card className="backdrop-blur-lg bg-white/40 border-white/30 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-800">
                  <TrendingUp className="w-5 h-5 mr-2 text-purple-500" />
                  Recent Journal Entries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {entries.slice(0, 5).map((entry, index) => (
                    <div 
                      key={entry.id}
                      className="flex items-start space-x-4 p-4 bg-white/50 rounded-lg border border-white/30"
                    >
                      <div className={`text-2xl p-2 rounded-full ${getMoodColor(entry.sentiment)}`}>
                        {getMoodEmoji(entry.sentiment)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getMoodColor(entry.sentiment)}`}>
                            {entry.sentiment.charAt(0).toUpperCase() + entry.sentiment.slice(1)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {entry.timestamp.toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm line-clamp-2">
                          {entry.text}
                        </p>
                        <p className="text-purple-600 text-xs mt-2 font-medium">
                          "{entry.insight.tip}"
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Progress Insight */}
            <Card className="backdrop-blur-lg bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-amber-800 mb-2">Your Journey So Far</h3>
                <p className="text-amber-700">
                  You've completed {totalEntries} journal {totalEntries === 1 ? 'entry' : 'entries'}. 
                  {stats.positive > stats.negative ? 
                    " You're showing great emotional resilience with money! Keep up the positive momentum." :
                    " Remember, every challenge is an opportunity to grow. Your awareness is already a huge step forward."
                  }
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodDashboard;
