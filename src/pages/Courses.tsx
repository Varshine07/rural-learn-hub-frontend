import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { coursesAPI } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import CourseCard from '@/components/CourseCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import { Button } from '@/components/ui/button';
import { PlusCircle, BookOpen, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Course {
  _id: string;
  title: string;
  description: string;
  category: string;
  instructor?: {
    name: string;
  };
}

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { isInstructor } = useAuth();

  const fetchCourses = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await coursesAPI.getAll();
      setCourses(response.data);
      setFilteredCourses(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load courses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCourses(courses);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredCourses(
        courses.filter(
          (course) =>
            course.title.toLowerCase().includes(query) ||
            course.category.toLowerCase().includes(query) ||
            course.description.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery, courses]);

  return (
    <div className="page-container">
      <Navbar />

      <main className="content-container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-primary" />
              All Courses
            </h1>
            <p className="text-muted-foreground mt-1">
              {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} available
            </p>
          </div>

          {isInstructor && (
            <Link to="/add-course">
              <Button size="lg" className="gap-2">
                <PlusCircle className="w-5 h-5" />
                Add New Course
              </Button>
            </Link>
          )}
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search courses by title, category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12"
          />
        </div>

        {/* Content */}
        {loading ? (
          <LoadingSpinner message="Loading courses..." />
        ) : error ? (
          <ErrorMessage message={error} onRetry={fetchCourses} />
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
              <BookOpen className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              {searchQuery ? 'No courses found' : 'No courses yet'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery
                ? 'Try a different search term'
                : isInstructor
                ? 'Be the first to create a course!'
                : 'Check back later for new courses.'}
            </p>
            {isInstructor && !searchQuery && (
              <Link to="/add-course">
                <Button className="gap-2">
                  <PlusCircle className="w-5 h-5" />
                  Create Course
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Courses;
