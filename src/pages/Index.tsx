import React from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PsychologistsSection from "@/components/PsychologistsSection";
import ServicesSection from "@/components/ServicesSection";
import BookingSection from "@/components/BookingSection";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";
import IndexModals from "@/components/IndexModals";
import { useIndexLogic } from "@/hooks/useIndexLogic";
import { usePsychologists } from "@/hooks/usePsychologists";



const Index = () => {
  const logic = useIndexLogic();
  const { psychologists } = usePsychologists();

  // Конвертируем данные из usePsychologists в формат для PsychologistsSection
  const convertedPsychologists = psychologists
    .filter(psych => psych.isActive)  // Показываем только активных психологов
    .map(psych => ({
      id: parseInt(psych.id),
      name: psych.name,
      specialization: psych.specialization,
      experience: `${psych.experience} лет`,
      image: psych.photo || "/api/placeholder/300/300",
      description: psych.description,
      rating: 4.8, // Можно добавить рейтинг в модель Psychologist
      sessions: 350, // Можно добавить количество сессий в модель
      price: psych.price
    }));

  // Получаем среднюю цену из настроек психологов
  const getAveragePrice = () => {
    if (convertedPsychologists.length === 0) return 2500;
    const totalPrice = convertedPsychologists.reduce((sum, psych) => sum + psych.price, 0);
    return Math.round(totalPrice / convertedPsychologists.length);
  };

  const averagePrice = getAveragePrice();

  const services = [
    { name: "Индивидуальная консультация", price: `${averagePrice.toLocaleString('ru-RU')} ₽/час`, icon: "User" },
    { name: "Семейная терапия", price: `${Math.round(averagePrice * 1.2).toLocaleString('ru-RU')} ₽/час`, icon: "Users" },
    { name: "Групповая терапия", price: `${Math.round(averagePrice * 0.6).toLocaleString('ru-RU')} ₽/час`, icon: "UserCheck" },
    { name: "Экстренная помощь", price: `${Math.round(averagePrice * 1.4).toLocaleString('ru-RU')} ₽/час`, icon: "Phone" }
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
        psychologists={convertedPsychologists}
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