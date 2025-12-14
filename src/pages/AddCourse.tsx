import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { coursesAPI } from '@/services/api';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { BookOpen, FileText, FolderOpen, Loader2, ArrowLeft, Save } from 'lucide-react';

const AddCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !category.trim()) {
      toast({
        title: 'Please fill all fields',
        description: 'Title, description, and category are required.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      await coursesAPI.create({ title, description, category });
      toast({
        title: 'Course Created!',
        description: 'Your course has been successfully created.',
      });
      navigate('/courses');
    } catch (error: any) {
      toast({
        title: 'Failed to create course',
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
            <div className="w-16 h-16 rounded-2xl bg-primary/10 mx-auto flex items-center justify-center mb-4">
              <BookOpen className="w-9 h-9 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Create New Course</h1>
            <p className="text-muted-foreground mt-2">Share your knowledge with students</p>
          </div>

          <div className="form-container">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="title" className="input-label">
                  <FileText className="w-4 h-4 inline-block mr-2" />
                  Course Title
                </label>
                <Input
                  id="title"
                  type="text"
                  placeholder="e.g., Introduction to Web Development"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="category" className="input-label">
                  <FolderOpen className="w-4 h-4 inline-block mr-2" />
                  Category
                </label>
                <Input
                  id="category"
                  type="text"
                  placeholder="e.g., Programming, Science, Arts"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="description" className="input-label">
                  Description
                </label>
                <textarea
                  id="description"
                  placeholder="Describe what students will learn in this course..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={loading}
                  rows={5}
                  className="flex w-full rounded-xl border-2 border-input bg-card px-4 py-3 text-base font-medium ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200 resize-none"
                />
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
                      Create Course
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

export default AddCourse;
