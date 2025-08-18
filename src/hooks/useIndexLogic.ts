import { useState } from "react";

interface ReviewFormData {
  name: string;
  text: string;
  rating: number;
}

interface UserReview {
  name: string;
  text: string;
  rating: number;
  replies?: Array<{name: string, text: string, timestamp: Date}>;
}

interface LoginData {
  username: string;
  password: string;
}

interface ReplyFormData {
  name: string;
  text: string;
}

export const useIndexLogic = () => {
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewFormData, setReviewFormData] = useState<ReviewFormData>({
    name: '',
    text: '',
    rating: 5
  });
  const [userReviews, setUserReviews] = useState<UserReview[]>([]);
  const [showReplyForm, setShowReplyForm] = useState<{show: boolean, reviewIndex: number}>({show: false, reviewIndex: -1});
  const [replyFormData, setReplyFormData] = useState<ReplyFormData>({name: '', text: ''});
  const [editingReply, setEditingReply] = useState<{show: boolean, reviewIndex: number, replyIndex: number}>({show: false, reviewIndex: -1, replyIndex: -1});
  const [editReplyData, setEditReplyData] = useState<ReplyFormData>({name: '', text: ''});
  
  // Booking modal state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedPsychologist, setSelectedPsychologist] = useState<{name: string, specialty: string}>({name: '', specialty: ''});
  
  // Avatar modal state
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<{image: string, name: string}>({image: '', name: ''});

  // Payment modal state
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPaymentPsychologist, setSelectedPaymentPsychologist] = useState<{name: string, price: number}>({name: '', price: 2500});

  // Auth state
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loginData, setLoginData] = useState<LoginData>({username: '', password: ''});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'psychologist' | 'manager' | null>(null);

  // Booking functions
  const handleBookingClick = (name: string, specialty: string) => {
    setSelectedPsychologist({ name, specialty });
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedPsychologist({ name: '', specialty: '' });
  };

  // Payment functions
  const handlePaymentClick = (name: string, price: number) => {
    setSelectedPaymentPsychologist({ name, price });
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setSelectedPaymentPsychologist({ name: '', price: 2500 });
  };

  // Avatar functions
  const handleAvatarClick = (image: string, name: string) => {
    setSelectedAvatar({ image, name });
    setIsAvatarModalOpen(true);
  };

  const closeAvatarModal = () => {
    setIsAvatarModalOpen(false);
    setSelectedAvatar({ image: '', name: '' });
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewFormData.name && reviewFormData.text) {
      setUserReviews(prev => [...prev, { ...reviewFormData, replies: [] }]);
      setReviewFormData({ name: '', text: '', rating: 5 });
      setShowReviewForm(false);
      alert('Спасибо за ваш отзыв! Он появится на сайте.');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Получаем учетные данные из системы личных кабинетов
    const getPsychologists = () => {
      const psychologists = JSON.parse(localStorage.getItem("psychologists") || "[]");
      return psychologists.filter((p: any) => p.isActive).map((p: any) => ({
        username: p.login,
        password: p.password,
        name: p.name,
        role: 'psychologist' as const
      }));
    };

    const psychologistCredentials = [
      ...getPsychologists(),
      { username: 's4777752@ya.ru', password: '89024777752s', name: 'Управляющий центра', role: 'manager' as const }
    ];

    const user = psychologistCredentials.find(
      cred => cred.username === loginData.username && cred.password === loginData.password
    );

    if (user) {
      setIsAuthenticated(true);
      setUserRole(user.role);
      setReplyFormData({ name: user.name, text: '' });
      setShowLoginForm(false);
      setLoginData({ username: '', password: '' });
    } else {
      alert('Неверные данные для входа');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setReplyFormData({ name: '', text: '' });
  };

  const handleReplyClick = (reviewIndex: number) => {
    if (isAuthenticated) {
      setShowReplyForm({ show: true, reviewIndex });
    } else {
      setShowLoginForm(true);
      setShowReplyForm({ show: false, reviewIndex }); // Запоминаем индекс для позже
    }
  };

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyFormData.name && replyFormData.text && isAuthenticated) {
      const reviewIndex = showReplyForm.reviewIndex;
      
      const defaultReviews = [
        { 
          name: "Анна К.", 
          text: "Очень помогла справиться с тревожностью. Рекомендую!", 
          rating: 5,
          replies: [
            { name: "Анна Смирнова", text: "Спасибо большое за отзыв! Очень рада, что смогла помочь вам.", timestamp: new Date('2024-12-20') }
          ]
        },
        { name: "Михаил Р.", text: "Профессиональный подход и теплая атмосфера.", rating: 5 },
        { name: "Елена Д.", text: "Благодарна за поддержку в трудный период.", rating: 5 }
      ];
      
      if (reviewIndex < defaultReviews.length) {
        // Если это базовый отзыв, добавляем ответ в defaultReviews (но это временно, в реальном приложении нужна база данных)
        alert('Ответ добавлен! В реальном приложении ответы сохраняются в базе данных.');
      } else {
        // Если это пользовательский отзыв
        const userReviewIndex = reviewIndex - defaultReviews.length;
        setUserReviews(prev => prev.map((review, index) => 
          index === userReviewIndex 
            ? { 
                ...review, 
                replies: [...(review.replies || []), { 
                  name: replyFormData.name, 
                  text: replyFormData.text, 
                  timestamp: new Date() 
                }] 
              }
            : review
        ));
      }
      
      setReplyFormData({ name: replyFormData.name, text: '' }); // Оставляем имя
      setShowReplyForm({ show: false, reviewIndex: -1 });
    }
  };

  // Функция для начала редактирования ответа
  const handleEditReply = (reviewIndex: number, replyIndex: number, reply: {name: string, text: string}) => {
    setEditReplyData({name: reply.name, text: reply.text});
    setEditingReply({show: true, reviewIndex, replyIndex});
  };

  // Функция для сохранения отредактированного ответа
  const handleSaveEditReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (editReplyData.text && isAuthenticated) {
      const reviewIndex = editingReply.reviewIndex;
      const replyIndex = editingReply.replyIndex;
      
      const defaultReviews = [
        { 
          name: "Анна К.", 
          text: "Очень помогла справиться с тревожностью. Рекомендую!", 
          rating: 5,
          replies: [
            { name: "Анна Смирнова", text: "Спасибо большое за отзыв! Очень рада, что смогла помочь вам.", timestamp: new Date('2024-12-20') }
          ]
        },
        { name: "Михаил Р.", text: "Профессиональный подход и теплая атмосфера.", rating: 5 },
        { name: "Елена Д.", text: "Благодарна за поддержку в трудный период.", rating: 5 }
      ];
      
      if (reviewIndex < defaultReviews.length) {
        // Если это базовый отзыв, показываем уведомление
        alert('Ответ обновлен! В реальном приложении изменения сохраняются в базе данных.');
      } else {
        // Если это пользовательский отзыв, обновляем ответ
        const userReviewIndex = reviewIndex - defaultReviews.length;
        setUserReviews(prev => prev.map((review, index) => 
          index === userReviewIndex 
            ? { 
                ...review, 
                replies: review.replies?.map((reply, idx) => 
                  idx === replyIndex 
                    ? { ...reply, text: editReplyData.text } 
                    : reply
                ) || []
              }
            : review
        ));
      }
      
      setEditingReply({show: false, reviewIndex: -1, replyIndex: -1});
      setEditReplyData({name: '', text: ''});
    }
  };

  // Функция для удаления ответа
  const handleDeleteReply = (reviewIndex: number, replyIndex: number) => {
    if (confirm('Вы действительно хотите удалить этот ответ?')) {
      const defaultReviews = [
        { 
          name: "Анна К.", 
          text: "Очень помогла справиться с тревожностью. Рекомендую!", 
          rating: 5,
          replies: [
            { name: "Анна Смирнова", text: "Спасибо большое за отзыв! Очень рада, что смогла помочь вам.", timestamp: new Date('2024-12-20') }
          ]
        },
        { name: "Михаил Р.", text: "Профессиональный подход и теплая атмосфера.", rating: 5 },
        { name: "Елена Д.", text: "Благодарна за поддержку в трудный период.", rating: 5 }
      ];
      
      if (reviewIndex < defaultReviews.length) {
        // Если это базовый отзыв, показываем уведомление
        alert('Ответ удален! В реальном приложении изменения сохраняются в базе данных.');
      } else {
        // Если это пользовательский отзыв, удаляем ответ
        const userReviewIndex = reviewIndex - defaultReviews.length;
        setUserReviews(prev => prev.map((review, index) => 
          index === userReviewIndex 
            ? { 
                ...review, 
                replies: review.replies?.filter((_, idx) => idx !== replyIndex) || []
              }
            : review
        ));
      }
    }
  };

  return {
    // Video dialog
    isVideoDialogOpen,
    setIsVideoDialogOpen,
    
    // Review form
    showReviewForm,
    setShowReviewForm,
    reviewFormData,
    setReviewFormData,
    userReviews,
    handleSubmitReview,
    
    // Booking
    isBookingModalOpen,
    selectedPsychologist,
    handleBookingClick,
    closeBookingModal,
    
    // Avatar
    isAvatarModalOpen,
    selectedAvatar,
    handleAvatarClick,
    closeAvatarModal,
    
    // Payment
    isPaymentModalOpen,
    selectedPaymentPsychologist,
    handlePaymentClick,
    closePaymentModal,
    
    // Auth
    showLoginForm,
    setShowLoginForm,
    loginData,
    setLoginData,
    isAuthenticated,
    userRole,
    handleLogin,
    handleLogout,
    
    // Replies
    showReplyForm,
    setShowReplyForm,
    replyFormData,
    setReplyFormData,
    editingReply,
    setEditingReply,
    editReplyData,
    setEditReplyData,
    handleReplyClick,
    handleSubmitReply,
    handleEditReply,
    handleSaveEditReply,
    handleDeleteReply
  };
};