import { Button } from '@/components/ui/button';
import { Play, FileText, ExternalLink } from 'lucide-react';

interface Lesson {
  _id: string;
  title: string;
  content: string;
  videoUrl?: string;
}

interface LessonCardProps {
  lesson: Lesson;
  index: number;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson, index }) => {
  const hasVideo = lesson.videoUrl && lesson.videoUrl.trim() !== '';

  return (
    <div className="bg-card rounded-xl border border-border p-5 shadow-card hover:shadow-elevated transition-shadow duration-300 animate-fade-in">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <span className="text-lg font-bold text-primary">{index + 1}</span>
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-lg font-bold text-foreground mb-2">{lesson.title}</h4>
          <p className="text-muted-foreground text-base mb-4 line-clamp-2">
            {lesson.content}
          </p>

          <div className="flex flex-wrap gap-2">
            {hasVideo ? (
              <a href={lesson.videoUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="accent" size="sm" className="gap-2">
                  <Play className="w-4 h-4" />
                  Watch Video
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </a>
            ) : (
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <FileText className="w-4 h-4" />
                Text Lesson
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
