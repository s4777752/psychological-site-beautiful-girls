// Утилита для централизованного управления записями
// Объединяет данные из разных источников: онлайн бронирования, записи психологов, записи управляющего

export interface UnifiedBooking {
  id: string;
  clientName: string;
  clientEmail?: string;
  clientPhone?: string;
  psychologistName: string;
  psychologistSpecialty?: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  sessionType?: string;
  duration: string;
  price: number;
  status: 'scheduled' | 'completed' | 'cancelled' | 'paid' | 'in_progress';
  paymentStatus?: 'pending' | 'completed' | 'failed';
  notes?: string;
  createdAt: string;
  source: 'online' | 'psychologist' | 'manager'; // источник записи
}

class BookingsManager {
  private static instance: BookingsManager;

  private constructor() {}

  static getInstance(): BookingsManager {
    if (!BookingsManager.instance) {
      BookingsManager.instance = new BookingsManager();
    }
    return BookingsManager.instance;
  }

  // Получить все записи из всех источников
  getAllBookings(): UnifiedBooking[] {
    const allBookings: UnifiedBooking[] = [];

    // Получаем онлайн бронирования с главной страницы
    const onlineBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    allBookings.push(...onlineBookings.map((booking: any) => ({
      id: booking.id,
      clientName: booking.clientName,
      clientEmail: booking.clientEmail,
      clientPhone: booking.clientPhone,
      psychologistName: booking.psychologistName,
      psychologistSpecialty: booking.psychologistSpecialty,
      date: booking.date,
      time: booking.time,
      sessionType: 'Онлайн консультация',
      duration: '50 мин',
      price: booking.amount || 2500,
      status: booking.status === 'paid' ? 'scheduled' : booking.status,
      paymentStatus: booking.paymentStatus,
      notes: '',
      createdAt: booking.createdAt,
      source: 'online' as const
    })));

    // Получаем записи от психологов
    const manualRecords = JSON.parse(localStorage.getItem('manualRecords') || '[]');
    allBookings.push(...manualRecords.map((record: any) => ({
      id: record.id,
      clientName: record.clientName,
      clientEmail: record.clientEmail,
      clientPhone: record.clientPhone,
      psychologistName: this.getCurrentPsychologistName(), // получаем из контекста
      date: record.sessionDate,
      time: record.sessionTime,
      sessionType: record.sessionType,
      duration: '50 мин',
      price: record.price,
      status: record.status,
      notes: record.notes,
      createdAt: record.createdAt,
      source: 'psychologist' as const
    })));

    // Получаем записи от управляющего (из ManagerSessionsTab)
    const managerSessions = JSON.parse(localStorage.getItem('managerSessions') || '[]');
    allBookings.push(...managerSessions.map((session: any) => ({
      id: session.id.toString(),
      clientName: session.clientName,
      psychologistName: session.psychologistName,
      date: session.date,
      time: session.time,
      sessionType: session.type,
      duration: session.duration,
      price: session.price,
      status: this.mapManagerStatus(session.status),
      notes: '',
      createdAt: session.createdAt || new Date().toISOString(),
      source: 'manager' as const
    })));

    // Сортируем по дате создания (новые сначала)
    return allBookings.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  // Добавить новую запись и синхронизировать во всех источниках
  addBooking(booking: Omit<UnifiedBooking, 'id' | 'createdAt'>): string {
    const newBooking: UnifiedBooking = {
      ...booking,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    // Сохраняем в соответствующий источник
    switch (booking.source) {
      case 'online':
        this.saveOnlineBooking(newBooking);
        break;
      case 'psychologist':
        this.saveManualRecord(newBooking);
        break;
      case 'manager':
        this.saveManagerSession(newBooking);
        break;
    }

    // Блокируем слот в расписании психолога
    this.blockPsychologistSlot(newBooking.psychologistName, newBooking.date, newBooking.time);

    return newBooking.id;
  }

  // Обновить статус записи
  updateBookingStatus(id: string, status: UnifiedBooking['status']): void {
    // Находим запись во всех источниках и обновляем
    const allBookings = this.getAllBookings();
    const booking = allBookings.find(b => b.id === id);
    
    if (!booking) return;

    // Если отменяем, удаляем запись
    if (status === 'cancelled') {
      this.removeBooking(id);
      return;
    }

    // Обновляем в соответствующем источнике
    switch (booking.source) {
      case 'online':
        this.updateOnlineBooking(id, status);
        break;
      case 'psychologist':
        this.updateManualRecord(id, status);
        break;
      case 'manager':
        this.updateManagerSession(id, status);
        break;
    }
  }

  // Удалить запись
  removeBooking(id: string): void {
    const allBookings = this.getAllBookings();
    const booking = allBookings.find(b => b.id === id);
    
    if (!booking) return;

    // Освобождаем слот в расписании
    this.freePsychologistSlot(booking.psychologistName, booking.date, booking.time);

    // Удаляем из соответствующего источника
    switch (booking.source) {
      case 'online':
        this.removeOnlineBooking(id);
        break;
      case 'psychologist':
        this.removeManualRecord(id);
        break;
      case 'manager':
        this.removeManagerSession(id);
        break;
    }
  }

  // Получить записи для конкретного психолога
  getBookingsForPsychologist(psychologistName: string): UnifiedBooking[] {
    return this.getAllBookings().filter(booking => 
      booking.psychologistName === psychologistName
    );
  }

  // Получить записи по дате
  getBookingsByDate(date: string): UnifiedBooking[] {
    return this.getAllBookings().filter(booking => booking.date === date);
  }

  // Статистика
  getStats() {
    const bookings = this.getAllBookings();
    return {
      total: bookings.length,
      scheduled: bookings.filter(b => b.status === 'scheduled').length,
      completed: bookings.filter(b => b.status === 'completed').length,
      cancelled: bookings.filter(b => b.status === 'cancelled').length,
      totalRevenue: bookings
        .filter(b => b.status === 'completed')
        .reduce((sum, b) => sum + b.price, 0)
    };
  }

  // Вспомогательные методы
  private getCurrentPsychologistName(): string {
    const psychologist = JSON.parse(localStorage.getItem('currentPsychologist') || '{}');
    return psychologist.name || 'Неизвестный психолог';
  }

  private mapManagerStatus(status: string): UnifiedBooking['status'] {
    switch (status) {
      case 'upcoming': return 'scheduled';
      case 'in_progress': return 'in_progress';
      case 'completed': return 'completed';
      case 'cancelled': return 'cancelled';
      default: return 'scheduled';
    }
  }

  private saveOnlineBooking(booking: UnifiedBooking): void {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push({
      id: booking.id,
      clientName: booking.clientName,
      clientEmail: booking.clientEmail,
      clientPhone: booking.clientPhone,
      psychologistName: booking.psychologistName,
      psychologistSpecialty: booking.psychologistSpecialty,
      date: booking.date,
      time: booking.time,
      amount: booking.price,
      status: booking.status,
      paymentStatus: booking.paymentStatus || 'completed',
      createdAt: booking.createdAt
    });
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }

  private saveManualRecord(booking: UnifiedBooking): void {
    const records = JSON.parse(localStorage.getItem('manualRecords') || '[]');
    records.push({
      id: booking.id,
      clientName: booking.clientName,
      clientEmail: booking.clientEmail,
      clientPhone: booking.clientPhone,
      sessionDate: booking.date,
      sessionTime: booking.time,
      sessionType: booking.sessionType,
      price: booking.price,
      status: booking.status,
      notes: booking.notes,
      createdAt: booking.createdAt
    });
    localStorage.setItem('manualRecords', JSON.stringify(records));
  }

  private saveManagerSession(booking: UnifiedBooking): void {
    const sessions = JSON.parse(localStorage.getItem('managerSessions') || '[]');
    sessions.push({
      id: parseInt(booking.id),
      clientName: booking.clientName,
      psychologistName: booking.psychologistName,
      date: booking.date,
      time: booking.time,
      type: booking.sessionType,
      duration: booking.duration,
      price: booking.price,
      status: booking.status === 'scheduled' ? 'upcoming' : booking.status,
      createdAt: booking.createdAt
    });
    localStorage.setItem('managerSessions', JSON.stringify(sessions));
  }

  private updateOnlineBooking(id: string, status: UnifiedBooking['status']): void {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const updated = bookings.map((booking: any) => 
      booking.id === id ? { ...booking, status } : booking
    );
    localStorage.setItem('bookings', JSON.stringify(updated));
  }

  private updateManualRecord(id: string, status: UnifiedBooking['status']): void {
    const records = JSON.parse(localStorage.getItem('manualRecords') || '[]');
    const updated = records.map((record: any) => 
      record.id === id ? { ...record, status } : record
    );
    localStorage.setItem('manualRecords', JSON.stringify(updated));
  }

  private updateManagerSession(id: string, status: UnifiedBooking['status']): void {
    const sessions = JSON.parse(localStorage.getItem('managerSessions') || '[]');
    const mappedStatus = status === 'scheduled' ? 'upcoming' : status;
    const updated = sessions.map((session: any) => 
      session.id.toString() === id ? { ...session, status: mappedStatus } : session
    );
    localStorage.setItem('managerSessions', JSON.stringify(updated));
  }

  private removeOnlineBooking(id: string): void {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const filtered = bookings.filter((booking: any) => booking.id !== id);
    localStorage.setItem('bookings', JSON.stringify(filtered));
  }

  private removeManualRecord(id: string): void {
    const records = JSON.parse(localStorage.getItem('manualRecords') || '[]');
    const filtered = records.filter((record: any) => record.id !== id);
    localStorage.setItem('manualRecords', JSON.stringify(filtered));
  }

  private removeManagerSession(id: string): void {
    const sessions = JSON.parse(localStorage.getItem('managerSessions') || '[]');
    const filtered = sessions.filter((session: any) => session.id.toString() !== id);
    localStorage.setItem('managerSessions', JSON.stringify(filtered));
  }

  private blockPsychologistSlot(psychologistName: string, date: string, time: string): void {
    const scheduleKey = `psychologistSchedule_${psychologistName.replace(/\s+/g, '_')}`;
    const scheduleData = JSON.parse(localStorage.getItem(scheduleKey) || '{}');
    
    if (scheduleData[date]) {
      scheduleData[date] = scheduleData[date].map((slot: any) => {
        if (slot.time === time) {
          return { ...slot, booked: true };
        }
        return slot;
      });
      localStorage.setItem(scheduleKey, JSON.stringify(scheduleData));
    }
  }

  private freePsychologistSlot(psychologistName: string, date: string, time: string): void {
    const scheduleKey = `psychologistSchedule_${psychologistName.replace(/\s+/g, '_')}`;
    const scheduleData = JSON.parse(localStorage.getItem(scheduleKey) || '{}');
    
    if (scheduleData[date]) {
      scheduleData[date] = scheduleData[date].map((slot: any) => {
        if (slot.time === time) {
          return { ...slot, booked: false };
        }
        return slot;
      });
      localStorage.setItem(scheduleKey, JSON.stringify(scheduleData));
    }
  }
}

export default BookingsManager;