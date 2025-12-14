import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { lessonsAPI, coursesAPI } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import LessonCard from '@/components/LessonCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import { Button } from '@/components/ui/button';
import { ArrowLeft, PlusCircle, BookOpen, FolderOpen } from 'lucide-react';

interface Lesson {
  _id: string;
  title: string;
  content: string;
  videoUrl?: string;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  category: string;
}

const Lessons = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isInstructor } = useAuth();
  const navigate = useNavigate();

  const fetchData = async () => {
    if (!courseId) return;
    setLoading(true);
    setError('');
    try {
      const [lessonsResponse, courseResponse] = await Promise.all([
        lessonsAPI.getByCourse(courseId),
        coursesAPI.getById(courseId),
      ]);
      setLessons(lessonsResponse.data);
      setCourse(courseResponse.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load lessons.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [courseId]);

  return (
    <div className="page-container">
      <Navbar />

      <main className="content-container">
        <Button
          variant="ghost"
          onClick={() => navigate('/courses')}
          className="mb-4 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Courses
        </Button>

        {loading ? (
          <LoadingSpinner message="Loading lessons..." />
        ) : error ? (
          <ErrorMessage message={error} onRetry={fetchData} />
        ) : (
          <>
            {/* Course Header */}
            {course && (
              <div className="bg-card rounded-2xl border border-border p-6 mb-6 shadow-card">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <BookOpen className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-semibold">
                      {course.category}
                    </span>
                    <h1 className="text-2xl font-bold text-foreground mt-2">{course.title}</h1>
                    <p className="text-muted-foreground mt-1">{course.description}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Lessons Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <FolderOpen className="w-6 h-6 text-primary" />
                  Course Lessons
                </h2>
                <p className="text-muted-foreground">
                  {lessons.length} lesson{lessons.length !== 1 ? 's' : ''} in this course
                </p>
              </div>

              {isInstructor && (
                <Link to={`/add-lesson/${courseId}`}>
                  <Button className="gap-2">
                    <PlusCircle className="w-5 h-5" />
                    Add Lesson
                  </Button>
                </Link>
              )}
            </div>

            {/* Lessons List */}
            {lessons.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
                  <FolderOpen className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">No lessons yet</h3>
                <p className="text-muted-foreground mb-4">
                  {isInstructor
                    ? 'Start adding lessons to this course!'
                    : 'Lessons will appear here once added.'}
                </p>
                {isInstructor && (
                  <Link to={`/add-lesson/${courseId}`}>
                    <Button className="gap-2">
                      <PlusCircle className="w-5 h-5" />
                      Add First Lesson
                    </Button>
                  </Link>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {lessons.map((lesson, index) => (
                  <LessonCard key={lesson._id} lesson={lesson} index={index} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Lessons;
