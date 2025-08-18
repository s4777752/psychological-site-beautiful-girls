import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";
import BookingModal from "@/components/BookingModal";
import PaymentForm from "@/components/PaymentForm";

interface IndexModalsProps {
  // Video dialog
  isVideoDialogOpen: boolean;
  setIsVideoDialogOpen: (open: boolean) => void;
  
  // Review form
  showReviewForm: boolean;
  setShowReviewForm: (show: boolean) => void;
  reviewFormData: { name: string; text: string; rating: number };
  setReviewFormData: (data: any) => void;
  handleSubmitReview: (e: React.FormEvent) => void;
  
  // Booking
  isBookingModalOpen: boolean;
  selectedPsychologist: { name: string; specialty: string };
  closeBookingModal: () => void;
  
  // Avatar
  isAvatarModalOpen: boolean;
  selectedAvatar: { image: string; name: string };
  closeAvatarModal: () => void;
  
  // Payment
  isPaymentModalOpen: boolean;
  selectedPaymentPsychologist: { name: string; price: number };
  closePaymentModal: () => void;
  
  // Auth
  showLoginForm: boolean;
  setShowLoginForm: (show: boolean) => void;
  loginData: { username: string; password: string };
  setLoginData: (data: any) => void;
  handleLogin: (e: React.FormEvent) => void;
  
  // Replies
  showReplyForm: { show: boolean; reviewIndex: number };
  setShowReplyForm: (data: any) => void;
  replyFormData: { name: string; text: string };
  setReplyFormData: (data: any) => void;
  userRole: 'psychologist' | 'manager' | null;
  handleSubmitReply: (e: React.FormEvent) => void;
  
  // Edit reply
  editingReply: { show: boolean; reviewIndex: number; replyIndex: number };
  setEditingReply: (data: any) => void;
  editReplyData: { name: string; text: string };
  setEditReplyData: (data: any) => void;
  handleSaveEditReply: (e: React.FormEvent) => void;
}

const IndexModals = ({ 
  isVideoDialogOpen, setIsVideoDialogOpen,
  showReviewForm, setShowReviewForm, reviewFormData, setReviewFormData, handleSubmitReview,
  isBookingModalOpen, selectedPsychologist, closeBookingModal,
  isAvatarModalOpen, selectedAvatar, closeAvatarModal,
  isPaymentModalOpen, selectedPaymentPsychologist, closePaymentModal,
  showLoginForm, setShowLoginForm, loginData, setLoginData, handleLogin,
  showReplyForm, setShowReplyForm, replyFormData, setReplyFormData, userRole, handleSubmitReply,
  editingReply, setEditingReply, editReplyData, setEditReplyData, handleSaveEditReply
}: IndexModalsProps) => {
  return (
    <>
      {/* Video Dialog */}
      <Dialog open={isVideoDialogOpen} onOpenChange={setIsVideoDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] p-0">
          <DialogHeader className="px-6 py-4">
            <DialogTitle>Как работает психологическая помощь онлайн</DialogTitle>
          </DialogHeader>
          <div className="px-6 pb-6">
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Как работает психологическая помощь онлайн"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
            <div className="mt-4 space-y-3">
              <h3 className="font-semibold text-lg">Простые шаги к психологической поддержке:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-start space-x-2">
                  <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">1</div>
                  <div>
                    <p className="font-medium">Регистрация</p>
                    <p className="text-gray-600">Создайте аккаунт и заполните профиль</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">2</div>
                  <div>
                    <p className="font-medium">Выбор специалиста</p>
                    <p className="text-gray-600">Найдите психолога по специализации</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">3</div>
                  <div>
                    <p className="font-medium">Онлайн сеанс</p>
                    <p className="text-gray-600">Проведите сеанс через видеосвязь</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Review Form Modal */}
      {showReviewForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-secondary">Оставить отзыв</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowReviewForm(false)}
                className="p-1"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Ваше имя
                </label>
                <input
                  type="text"
                  value={reviewFormData.name}
                  onChange={(e) => setReviewFormData((prev: any) => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Введите ваше имя"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Оценка
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewFormData((prev: any) => ({ ...prev, rating: star }))}
                      className="focus:outline-none"
                    >
                      <Icon 
                        name="Star" 
                        className={`${star <= reviewFormData.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} transition-colors`}
                        size={24} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Ваш отзыв
                </label>
                <textarea
                  value={reviewFormData.text}
                  onChange={(e) => setReviewFormData((prev: any) => ({ ...prev, text: e.target.value }))}
                  className="w-full px-3 py-2 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  rows={4}
                  placeholder="Поделитесь вашим опытом..."
                  required
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowReviewForm(false)}
                  className="flex-1"
                >
                  Отменить
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary/90 text-white"
                >
                  Отправить отзыв
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={closeBookingModal}
        psychologistName={selectedPsychologist.name}
        psychologistSpecialty={selectedPsychologist.specialty}
      />

      {/* Avatar Modal */}
      {isAvatarModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={closeAvatarModal}
        >
          <div className="relative max-w-4xl max-h-[90vh] flex flex-col items-center">
            <button
              onClick={closeAvatarModal}
              className="absolute -top-12 right-0 text-white hover:text-warm-300 transition-colors z-10"
            >
              <Icon name="X" size={32} />
            </button>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-2xl max-w-full max-h-full">
              <img
                src={selectedAvatar.image}
                alt={selectedAvatar.name}
                className="max-w-full max-h-[80vh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="p-4 text-center bg-white">
                <h3 className="text-xl font-montserrat font-semibold text-secondary">
                  {selectedAvatar.name}
                </h3>
                <p className="text-warm-600 text-sm mt-1">
                  Нажмите в любом месте, чтобы закрыть
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <Dialog open={isPaymentModalOpen} onOpenChange={closePaymentModal}>
          <DialogContent className="max-w-md">
            <PaymentForm
              psychologistName={selectedPaymentPsychologist.name}
              sessionPrice={selectedPaymentPsychologist.price}
              onClose={closePaymentModal}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Login Form Modal */}
      {showLoginForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-secondary">Вход для специалистов</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowLoginForm(false)}
                className="p-1"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Логин
                </label>
                <input
                  type="text"
                  value={loginData.username}
                  onChange={(e) => setLoginData((prev: any) => ({ ...prev, username: e.target.value }))}
                  className="w-full px-3 py-2 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Введите логин"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Пароль
                </label>
                <input
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData((prev: any) => ({ ...prev, password: e.target.value }))}
                  className="w-full px-3 py-2 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Введите пароль"
                  required
                />
              </div>

              <div className="bg-warm-50 p-3 rounded-lg text-sm text-warm-700">
                <p className="font-medium mb-2">Учетные данные из личных кабинетов:</p>
                <p><strong>Психологи:</strong> anna_petrov / secure123</p>
                <p><strong></strong> mikhail_sid / pass456</p>
                <p><strong>Управляющий:</strong> s4777752@ya.ru / 89024777752s</p>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowLoginForm(false)}
                  className="flex-1"
                >
                  Отменить
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary/90 text-white"
                >
                  Войти
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reply Form Modal */}
      {showReplyForm.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-secondary">Ответить на отзыв</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowReplyForm({ show: false, reviewIndex: -1 })}
                className="p-1"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            <form onSubmit={handleSubmitReply} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Имя специалиста
                </label>
                <input
                  type="text"
                  value={replyFormData.name}
                  className="w-full px-3 py-2 border border-warm-300 rounded-lg bg-warm-50 text-warm-700"
                  readOnly
                />
                <p className="text-xs text-warm-600 mt-1">
                  Вы вошли как {userRole === 'psychologist' ? 'психолог' : 'управляющий'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Ваш ответ
                </label>
                <textarea
                  value={replyFormData.text}
                  onChange={(e) => setReplyFormData((prev: any) => ({ ...prev, text: e.target.value }))}
                  className="w-full px-3 py-2 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  rows={4}
                  placeholder="Напишите ваш ответ..."
                  required
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowReplyForm({ show: false, reviewIndex: -1 })}
                  className="flex-1"
                >
                  Отменить
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary/90 text-white"
                >
                  Отправить ответ
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Reply Form Modal */}
      {editingReply.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-secondary">Редактировать ответ</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingReply({show: false, reviewIndex: -1, replyIndex: -1})}
                className="text-warm-500 hover:text-warm-700"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            <form onSubmit={handleSaveEditReply} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Имя специалиста
                </label>
                <input
                  type="text"
                  value={editReplyData.name}
                  className="w-full px-3 py-2 border border-warm-300 rounded-lg bg-warm-50 text-warm-700"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Редактировать ответ
                </label>
                <textarea
                  value={editReplyData.text}
                  onChange={(e) => setEditReplyData((prev: any) => ({ ...prev, text: e.target.value }))}
                  className="w-full px-3 py-2 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  rows={4}
                  placeholder="Отредактируйте ваш ответ..."
                  required
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingReply({show: false, reviewIndex: -1, replyIndex: -1})}
                  className="flex-1"
                >
                  Отменить
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary/90 text-white"
                >
                  Сохранить
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default IndexModals;