import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, User, FolderOpen, ArrowRight, Edit } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface Course {
  _id: string;
  title: string;
  description: string;
  category: string;
  instructor?: {
    name: string;
  };
}

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { isInstructor } = useAuth();

  return (
    <div className="bg-card rounded-2xl border border-border p-6 shadow-card hover:shadow-elevated transition-shadow duration-300 animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
          <BookOpen className="w-7 h-7 text-primary" />
        </div>
        <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-semibold">
          {course.category}
        </span>
      </div>

      <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">
        {course.title}
      </h3>

      <p className="text-muted-foreground text-base mb-4 line-clamp-3">
        {course.description}
      </p>

      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
        <User className="w-4 h-4" />
        <span>{course.instructor?.name || 'Unknown Instructor'}</span>
      </div>

      <div className="flex gap-3">
        <Link to={`/lessons/${course._id}`} className="flex-1">
          <Button className="w-full gap-2" size="default">
            <FolderOpen className="w-5 h-5" />
            View Lessons
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
        
        {isInstructor && (
          <Link to={`/edit-course/${course._id}`}>
            <Button variant="outline" size="icon">
              <Edit className="w-5 h-5" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
