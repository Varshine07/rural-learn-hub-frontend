import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { lessonsAPI } from '@/services/api';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { FileText, Video, Loader2, ArrowLeft, Save, Plus } from 'lucide-react';

const AddLesson = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast({
        title: 'Please fill required fields',
        description: 'Title and content are required.',
        variant: 'destructive',
      });
      return;
    }

    if (!courseId) {
      toast({
        title: 'Course not found',
        description: 'Unable to add lesson without a course.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      await lessonsAPI.create(courseId, { title, content, videoUrl: videoUrl.trim() || undefined });
      toast({
        title: 'Lesson Created!',
        description: 'Your lesson has been added to the course.',
      });
      navigate(`/lessons/${courseId}`);
    } catch (error: any) {
      toast({
        title: 'Failed to create lesson',
        description: error.response?.data?.message || 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Navbar />

      <main className="content-container">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 mx-auto flex items-center justify-center mb-4">
              <Plus className="w-9 h-9 text-accent" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Add New Lesson</h1>
            <p className="text-muted-foreground mt-2">Create educational content for your students</p>
          </div>

          <div className="form-container">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="title" className="input-label">
                  <FileText className="w-4 h-4 inline-block mr-2" />
                  Lesson Title <span className="text-destructive">*</span>
                </label>
                <Input
                  id="title"
                  type="text"
                  placeholder="e.g., Introduction to Variables"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="content" className="input-label">
                  Lesson Content <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="content"
                  placeholder="Write the lesson content here... Explain concepts clearly for rural students."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  disabled={loading}
                  rows={6}
                  className="flex w-full rounded-xl border-2 border-input bg-card px-4 py-3 text-base font-medium ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200 resize-none"
                />
              </div>

              <div>
                <label htmlFor="videoUrl" className="input-label">
                  <Video className="w-4 h-4 inline-block mr-2" />
                  Video URL (Optional)
                </label>
                <Input
                  id="videoUrl"
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  disabled={loading}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Add a YouTube or other video link for visual learning
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                  disabled={loading}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Add Lesson
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddLesson;
