import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface Reply {
  name: string;
  text: string;
  timestamp: Date;
}

interface Review {
  name: string;
  text: string;
  rating: number;
  replies?: Reply[];
}

interface ReviewsSectionProps {
  allReviews: Review[];
  isAuthenticated: boolean;
  userRole: 'psychologist' | 'manager' | null;
  replyFormData: { name: string; text: string };
  onReplyClick: (index: number) => void;
  onEditReply: (reviewIndex: number, replyIndex: number, reply: Reply) => void;
  onDeleteReply: (reviewIndex: number, replyIndex: number) => void;
  onLogout: () => void;
  onShowReviewForm: () => void;
}

const ReviewsSection = ({ 
  allReviews, 
  isAuthenticated, 
  userRole,
  replyFormData,
  onReplyClick,
  onEditReply,
  onDeleteReply,
  onLogout,
  onShowReviewForm
}: ReviewsSectionProps) => {
  return (
    <section id="reviews" className="py-20 bg-warm-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-montserrat font-bold text-secondary mb-4">
            Отзывы клиентов
          </h2>
          <p className="text-lg text-warm-700 max-w-2xl mx-auto">
            Что говорят люди о нашей работе
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {allReviews.map((review, index) => (
            <Card key={index} className="p-6 animate-fade-in">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Icon key={i} name="Star" className="text-yellow-400 fill-current" size={16} />
                  ))}
                </div>
                <p className="text-warm-700 mb-4 italic">"{review.text}"</p>
                <p className="font-montserrat font-semibold text-secondary mb-3">{review.name}</p>
                
                {/* Replies */}
                {review.replies && review.replies.length > 0 && (
                  <div className="mt-4 space-y-3">
                    {review.replies.map((reply, replyIndex) => (
                      <div key={replyIndex} className="bg-warm-50 p-3 rounded-lg border-l-4 border-primary">
                        <p className="text-sm text-warm-700 mb-2">"{reply.text}"</p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <p className="text-xs font-medium text-primary">{reply.name}</p>
                            <p className="text-xs text-warm-500">
                              {reply.timestamp.toLocaleDateString('ru-RU')}
                            </p>
                          </div>
                          {isAuthenticated && (
                            <div className="flex items-center space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onEditReply(index, replyIndex, reply)}
                                className="h-6 w-6 p-0 text-primary hover:bg-primary hover:text-white"
                              >
                                <Icon name="Edit2" size={12} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onDeleteReply(index, replyIndex)}
                                className="h-6 w-6 p-0 text-red-500 hover:bg-red-500 hover:text-white"
                              >
                                <Icon name="Trash2" size={12} />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Reply Button */}
                <div className="mt-4 pt-3 border-t border-warm-200 flex justify-between items-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onReplyClick(index)}
                    className="text-primary border-primary hover:bg-primary hover:text-white text-xs"
                  >
                    <Icon name="MessageCircle" className="mr-1" size={14} />
                    {isAuthenticated ? 'Ответить' : 'Войти и ответить'}
                  </Button>
                  
                  {isAuthenticated && (
                    <div className="flex items-center text-xs text-primary">
                      <Icon name="User" className="mr-1" size={12} />
                      <span>{replyFormData.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={onLogout}
                        className="ml-2 text-xs h-6 px-2"
                      >
                        Выйти
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Review Button */}
        <div className="text-center">
          <Button 
            onClick={onShowReviewForm}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3"
          >
            <Icon name="Plus" className="mr-2" size={20} />
            Оставить отзыв
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;