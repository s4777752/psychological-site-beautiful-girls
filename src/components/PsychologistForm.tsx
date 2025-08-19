import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import { Psychologist } from "@/types/psychologist";

interface PsychologistFormProps {
  psychologist: Psychologist | null;
  onSave: (psychologist: Omit<Psychologist, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
  generateLogin: (name: string) => string;
  generatePassword: () => string;
}

const PsychologistForm = ({ psychologist, onSave, onCancel, generateLogin, generatePassword }: PsychologistFormProps) => {
  const [formData, setFormData] = useState({
    name: psychologist?.name || "",
    email: psychologist?.email || "",
    login: psychologist?.login || "сергей",
    password: psychologist?.password || "1234",
    specialization: psychologist?.specialization || "",
    experience: psychologist?.experience || 1,
    description: psychologist?.description || "",
    photo: psychologist?.photo || "/api/placeholder/150/150",
    price: psychologist?.price || 2500,
    isActive: psychologist?.isActive || true
  });

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      // Автогенерация только если редактируем существующего психолога и поле логина пустое
      login: psychologist && !prev.login ? generateLogin(name) : prev.login
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">ФИО *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Введите ФИО"
            required
            className="border-warm-300 focus:border-warm-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="email@example.com"
            required
            className="border-warm-300 focus:border-warm-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="login">Логин для входа *</Label>
          <div className="flex space-x-2">
            <Input
              id="login"
              value={formData.login}
              onChange={(e) => setFormData(prev => ({ ...prev, login: e.target.value }))}
              placeholder="сергей"
              required
              className="border-warm-300 focus:border-warm-500"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => setFormData(prev => ({ ...prev, login: generateLogin(formData.name) }))}
              className="shrink-0"
            >
              <Icon name="RefreshCw" size={16} />
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Пароль *</Label>
          <div className="flex space-x-2">
            <Input
              id="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              placeholder="пароль"
              required
              className="border-warm-300 focus:border-warm-500"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => setFormData(prev => ({ ...prev, password: generatePassword() }))}
              className="shrink-0"
            >
              <Icon name="RefreshCw" size={16} />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="specialization">Специализация *</Label>
          <Select value={formData.specialization} onValueChange={(value) => setFormData(prev => ({ ...prev, specialization: value }))}>
            <SelectTrigger className="border-warm-300 focus:border-warm-500">
              <SelectValue placeholder="Выберите специализацию" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Семейная терапия">Семейная терапия</SelectItem>
              <SelectItem value="Когнитивно-поведенческая терапия">Когнитивно-поведенческая терапия</SelectItem>
              <SelectItem value="Гештальт-терапия">Гештальт-терапия</SelectItem>
              <SelectItem value="Психоанализ">Психоанализ</SelectItem>
              <SelectItem value="Детская психология">Детская психология</SelectItem>
              <SelectItem value="Травмотерапия">Травмотерапия</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="experience">Опыт работы (лет) *</Label>
          <Input
            id="experience"
            type="number"
            min="1"
            max="50"
            value={formData.experience}
            onChange={(e) => setFormData(prev => ({ ...prev, experience: parseInt(e.target.value) || 1 }))}
            className="border-warm-300 focus:border-warm-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Стоимость сессии (₽) *</Label>
        <Input
          id="price"
          type="number"
          min="10"
          max="20000"
          step="100"
          value={formData.price}
          onChange={(e) => setFormData(prev => ({ ...prev, price: parseInt(e.target.value) || 2500 }))}
          className="border-warm-300 focus:border-warm-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="photo">Фото профиля</Label>
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-warm-100 rounded-full overflow-hidden">
            {formData.photo && formData.photo !== "/api/placeholder/150/150" ? (
              <img 
                src={formData.photo} 
                alt="Фото психолога"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Icon name="User" className="text-warm-600" size={24} />
              </div>
            )}
          </div>
          <div className="flex-1 space-y-2">
            <Input
              id="photo"
              type="url"
              value={formData.photo}
              onChange={(e) => setFormData(prev => ({ ...prev, photo: e.target.value }))}
              placeholder="https://example.com/photo.jpg или оставьте пустым"
              className="border-warm-300 focus:border-warm-500"
            />
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/*';
                  input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        const result = e.target?.result as string;
                        setFormData(prev => ({ ...prev, photo: result }));
                      };
                      reader.readAsDataURL(file);
                    }
                  };
                  input.click();
                }}
                className="border-warm-300 text-warm-600 hover:bg-warm-100"
              >
                <Icon name="Upload" className="mr-2" size={14} />
                Загрузить файл
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setFormData(prev => ({ ...prev, photo: "/api/placeholder/150/150" }))}
                className="border-warm-300 text-warm-600 hover:bg-warm-100"
              >
                <Icon name="X" className="mr-2" size={14} />
                Удалить фото
              </Button>
            </div>
            <p className="text-xs text-warm-600">
              Вы можете вставить ссылку на изображение или загрузить файл с компьютера
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Описание и подход к работе</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Расскажите о своем подходе к работе..."
          className="border-warm-300 focus:border-warm-500"
          rows={3}
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isActive"
          checked={formData.isActive}
          onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
          className="rounded border-warm-300"
        />
        <Label htmlFor="isActive">Активный психолог (доступен для записи)</Label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Отмена
        </Button>
        <Button type="submit" className="bg-warm-600 hover:bg-warm-700">
          <Icon name="Save" className="mr-2" size={16} />
          {psychologist ? "Сохранить изменения" : "Добавить психолога"}
        </Button>
      </div>
    </form>
  );
};

export default PsychologistForm;