
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Post, PostCategory } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  // Helper function to get category badge color
  const getCategoryColor = (category: PostCategory) => {
    switch (category) {
      case PostCategory.NEWS:
        return 'bg-blue-500 hover:bg-blue-600';
      case PostCategory.RESEARCH:
        return 'bg-green-500 hover:bg-green-600';
      case PostCategory.ANNOUNCEMENT:
        return 'bg-purple-500 hover:bg-purple-600';
      case PostCategory.EVENT:
        return 'bg-yellow-500 hover:bg-yellow-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  // Format date
  const formattedDate = formatDistanceToNow(new Date(post.createdAt), { 
    addSuffix: true,
    locale: ru
  });

  return (
    <Card className={`shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden ${post.featured ? 'border-2 border-sce-primary' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg sm:text-xl">
            {post.title}
          </CardTitle>
          {post.featured && (
            <Badge className="bg-sce-primary">
              Важно
            </Badge>
          )}
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge className={getCategoryColor(post.category)}>
            {post.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
          {post.content.substring(0, 150)}
          {post.content.length > 150 ? '...' : ''}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-0">
        <div className="text-xs text-gray-500">
          {formattedDate}
        </div>
        <Link to={`/posts/${post.id}`}>
          <Button variant="outline" className="text-sce-primary hover:text-white hover:bg-sce-primary">
            Читать полностью
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
