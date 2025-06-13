
import { useState } from 'react';
import { ArrowLeft, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

const JournalEntry = ({ onSubmit, onBack }) => {
  const [entry, setEntry] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!entry.trim()) return;

    setIsSubmitting(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    onSubmit(entry);
    setIsSubmitting(false);
    setEntry('');
  };

  const prompts = [
    "How did spending money today make you feel?",
    "What emotions come up when you think about your savings?",
    "Describe your relationship with money in one word.",
    "What financial decision are you worried about?",
    "How do you feel about your financial progress?"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 via-transparent to-blue-100/20" />
      
      <div className="relative max-w-2xl mx-auto pt-8">
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
            Money Journal
          </h1>
        </div>

        {/* Main Form */}
        <Card className="backdrop-blur-lg bg-white/40 border-white/30 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-800">
              <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
              How are you feeling about money today?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Textarea
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                placeholder="I've been feeling anxious about my spending lately. Every time I check my bank account..."
                className="min-h-[200px] bg-white/50 border-white/50 focus:bg-white/70 transition-all duration-300"
                disabled={isSubmitting}
              />
              
              <Button 
                type="submit" 
                disabled={!entry.trim() || isSubmitting}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Analyzing your emotions...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Send className="w-4 h-4 mr-2" />
                    Get AI Insight
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Writing Prompts */}
        <Card className="mt-6 backdrop-blur-lg bg-white/20 border-white/30">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Need inspiration? Try these prompts:</h3>
            <div className="grid gap-2">
              {prompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setEntry(prompt + " ")}
                  className="text-left text-sm text-gray-600 hover:text-purple-600 hover:bg-white/30 p-2 rounded transition-all duration-200"
                  disabled={isSubmitting}
                >
                  "{prompt}"
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JournalEntry;
