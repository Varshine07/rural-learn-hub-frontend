import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { coursesAPI } from '@/services/api';
import Navbar from '@/components/Navbar';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Edit, FileText, FolderOpen, Loader2, ArrowLeft, Save, Trash2 } from 'lucide-react';

const EditCourse = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;
      try {
        const response = await coursesAPI.getById(id);
        const course = response.data;
        setTitle(course.title);
        setDescription(course.description);
        setCategory(course.category);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load course.');
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

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

    setSaving(true);
    try {
      await coursesAPI.update(id!, { title, description, category });
      toast({
        title: 'Course Updated!',
        description: 'Your changes have been saved.',
      });
      navigate('/courses');
    } catch (error: any) {
      toast({
        title: 'Failed to update course',
        description: error.response?.data?.message || 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this course? This cannot be undone.')) {
      return;
    }

    setDeleting(true);
    try {
      await coursesAPI.delete(id!);
      toast({
        title: 'Course Deleted',
        description: 'The course has been removed.',
      });
      navigate('/courses');
    } catch (error: any) {
      toast({
        title: 'Failed to delete course',
        description: error.response?.data?.message || 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <Navbar />
        <main className="content-container">
          <LoadingSpinner message="Loading course..." />
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <Navbar />
        <main className="content-container">
          <ErrorMessage message={error} onRetry={() => window.location.reload()} />
        </main>
      </div>
    );
  }

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
              <Edit className="w-9 h-9 text-accent" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Edit Course</h1>
            <p className="text-muted-foreground mt-2">Update your course details</p>
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
                  disabled={saving || deleting}
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
                  disabled={saving || deleting}
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
                  disabled={saving || deleting}
                  rows={5}
                  className="flex w-full rounded-xl border-2 border-input bg-card px-4 py-3 text-base font-medium ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={saving || deleting}
                  className="gap-2"
                >
                  {deleting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Trash2 className="w-5 h-5" />
                  )}
                  Delete
                </Button>
                <Button
                  type="submit"
                  disabled={saving || deleting}
                  className="flex-1 gap-2"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Save Changes
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

export default EditCourse;
