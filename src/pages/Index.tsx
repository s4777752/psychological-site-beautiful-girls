import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PsychologistsSection from "@/components/PsychologistsSection";
import ServicesSection from "@/components/ServicesSection";
import BookingSection from "@/components/BookingSection";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";
import IndexModals from "@/components/IndexModals";
import { useIndexLogic } from "@/hooks/useIndexLogic";

const Index = () => {
  const logic = useIndexLogic();

  const psychologists = [
    {
      id: 1,
      name: "Анна Смирнова",
      specialization: "Семейная терапия",
      experience: "8 лет",
      image: "/img/6e21af90-d81e-4f4e-b067-43f75a026d70.jpg",
      description: "Специалист по семейным отношениям и детской психологии",
      rating: 4.9,
      sessions: 450,
      price: 2500
    },
    {
      id: 2, 
      name: "Мария Козлова",
      specialization: "Тревожные расстройства",
      experience: "12 лет",
      image: "/img/e46f379d-2965-4b93-832b-a2aa073c0bb0.jpg",
      description: "Эксперт в области работы со стрессом и тревожностью",
      rating: 4.8,
      sessions: 720,
      price: 2500
    },
    {
      id: 3,
      name: "Елена Волкова", 
      specialization: "Личностная терапия",
      experience: "6 лет",
      image: "/img/fd3261af-65ed-4738-b175-5bb7aa8bcc4a.jpg",
      description: "Помогаю в развитии личности и самопознании",
      rating: 4.9,
      sessions: 320,
      price: 2500
    },
    {
      id: 4,
      name: "Дарья Петрова",
      specialization: "Когнитивно-поведенческая терапия",
      experience: "10 лет",
      image: "/img/507d09f6-4ed0-4a89-a012-fa2fba147e52.jpg",
      description: "Специалист по работе с депрессией и фобиями",
      rating: 4.7,
      sessions: 580,
      price: 2500
    },
    {
      id: 5,
      name: "София Романова",
      specialization: "Арт-терапия",
      experience: "7 лет", 
      image: "/img/4b2e6ff1-6a65-483d-9d56-631b510a50d3.jpg",
      description: "Творческий подход к решению внутренних конфликтов",
      rating: 4.8,
      sessions: 380,
      price: 2500
    },
    {
      id: 6,
      name: "Виктория Новикова",
      specialization: "Парная терапия",
      experience: "9 лет",
      image: "/img/b50310a6-0322-4453-a080-ed2a130fc8a9.jpg", 
      description: "Восстанавливаю гармонию в отношениях между партнерами",
      rating: 4.9,
      sessions: 490,
      price: 2500
    }
  ];

  const services = [
    { name: "Индивидуальная консультация", price: "2500 ₽/час", icon: "User" },
    { name: "Семейная терапия", price: "3000 ₽/час", icon: "Users" },
    { name: "Групповая терапия", price: "1500 ₽/час", icon: "UserCheck" },
    { name: "Экстренная помощь", price: "3500 ₽/час", icon: "Phone" }
  ];

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

  const allReviews = [...defaultReviews, ...logic.userReviews];

  return (
    <div className="min-h-screen bg-warm-50">
      <Header />
      
      <HeroSection onVideoClick={() => logic.setIsVideoDialogOpen(true)} />
      
      <PsychologistsSection 
        psychologists={psychologists}
        onBookingClick={logic.handleBookingClick}
        onAvatarClick={logic.handleAvatarClick}
      />
      
      <ServicesSection services={services} />
      
      <BookingSection />
      
      <ReviewsSection 
        allReviews={allReviews}
        isAuthenticated={logic.isAuthenticated}
        userRole={logic.userRole}
        replyFormData={logic.replyFormData}
        onReplyClick={logic.handleReplyClick}
        onEditReply={logic.handleEditReply}
        onDeleteReply={logic.handleDeleteReply}
        onLogout={logic.handleLogout}
        onShowReviewForm={() => logic.setShowReviewForm(true)}
      />
      
      <Footer />
      
      <IndexModals
        isVideoDialogOpen={logic.isVideoDialogOpen}
        setIsVideoDialogOpen={logic.setIsVideoDialogOpen}
        showReviewForm={logic.showReviewForm}
        setShowReviewForm={logic.setShowReviewForm}
        reviewFormData={logic.reviewFormData}
        setReviewFormData={logic.setReviewFormData}
        handleSubmitReview={logic.handleSubmitReview}
        isBookingModalOpen={logic.isBookingModalOpen}
        selectedPsychologist={logic.selectedPsychologist}
        closeBookingModal={logic.closeBookingModal}
        isAvatarModalOpen={logic.isAvatarModalOpen}
        selectedAvatar={logic.selectedAvatar}
        closeAvatarModal={logic.closeAvatarModal}
        isPaymentModalOpen={logic.isPaymentModalOpen}
        selectedPaymentPsychologist={logic.selectedPaymentPsychologist}
        closePaymentModal={logic.closePaymentModal}
        showLoginForm={logic.showLoginForm}
        setShowLoginForm={logic.setShowLoginForm}
        loginData={logic.loginData}
        setLoginData={logic.setLoginData}
        handleLogin={logic.handleLogin}
        showReplyForm={logic.showReplyForm}
        setShowReplyForm={logic.setShowReplyForm}
        replyFormData={logic.replyFormData}
        setReplyFormData={logic.setReplyFormData}
        userRole={logic.userRole}
        handleSubmitReply={logic.handleSubmitReply}
        editingReply={logic.editingReply}
        setEditingReply={logic.setEditingReply}
        editReplyData={logic.editReplyData}
        setEditReplyData={logic.setEditReplyData}
        handleSaveEditReply={logic.handleSaveEditReply}
      />
    </div>
  );
};

export default Index;