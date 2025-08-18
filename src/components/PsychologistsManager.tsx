import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";

interface Psychologist {
  id: string;
  name: string;
  email: string;
  login: string;
  password: string;
  specialization: string;
  experience: number;
  description: string;
  photo: string;
  price: number;
  isActive: boolean;
  createdAt: string;
}

const PsychologistsManager = () => {
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPsychologist, setEditingPsychologist] = useState<Psychologist | null>(null);

  // Загружаем психологов из localStorage при монтировании
  useEffect(() => {
    const saved = localStorage.getItem("psychologists");
    if (saved) {
      setPsychologists(JSON.parse(saved));
    } else {
      // Добавляем демо данные
      const demoPsychologists: Psychologist[] = [
        {
          id: "1",
          name: "Анна Петрова",
          email: "anna@mindcare.ru",
          login: "anna_petrov",
          password: "secure123",
          specialization: "Семейная терапия",
          experience: 8,
          description: "Специализируюсь на работе с семейными парами и детско-родительскими отношениями",
          photo: "/api/placeholder/150/150",
          price: 3500,
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: "2", 
          name: "Михаил Сидоров",
          email: "mikhail@mindcare.ru",
          login: "mikhail_sid",
          password: "pass456",
          specialization: "Когнитивно-поведенческая терапия",
          experience: 12,
          description: "Помогаю справиться с тревожными расстройствами и депрессией",
          photo: "/api/placeholder/150/150",
          price: 4000,
          isActive: true,
          createdAt: new Date().toISOString()
        }
      ];
      setPsychologists(demoPsychologists);
      localStorage.setItem("psychologists", JSON.stringify(demoPsychologists));
    }
  }, []);

  // Сохраняем в localStorage при изменении
  useEffect(() => {
    localStorage.setItem("psychologists", JSON.stringify(psychologists));
  }, [psychologists]);

  const generateLogin = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
  };

  const generatePassword = () => {
    return Math.random().toString(36).slice(-8);
  };

  const handleSavePsychologist = (psychologist: Omit<Psychologist, 'id' | 'createdAt'>) => {
    if (editingPsychologist) {
      // Редактирование
      setPsychologists(prev => prev.map(p => 
        p.id === editingPsychologist.id 
          ? { ...psychologist, id: editingPsychologist.id, createdAt: editingPsychologist.createdAt }
          : p
      ));
    } else {
      // Создание нового
      const newPsychologist: Psychologist = {
        ...psychologist,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      setPsychologists(prev => [...prev, newPsychologist]);
    }
    setIsDialogOpen(false);
    setEditingPsychologist(null);
  };

  const handleEditPsychologist = (psychologist: Psychologist) => {
    setEditingPsychologist(psychologist);
    setIsDialogOpen(true);
  };

  const handleDeletePsychologist = (id: string) => {
    setPsychologists(prev => prev.filter(p => p.id !== id));
  };

  const togglePsychologistStatus = (id: string) => {
    setPsychologists(prev => prev.map(p => 
      p.id === id ? { ...p, isActive: !p.isActive } : p
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-warm-800">Управление психологами</h2>
          <p className="text-warm-600">Всего специалистов: {psychologists.length}</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-warm-600 hover:bg-warm-700"
              onClick={() => setEditingPsychologist(null)}
            >
              <Icon name="UserPlus" className="mr-2" size={16} />
              Добавить психолога
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPsychologist ? "Редактировать психолога" : "Добавить нового психолога"}
              </DialogTitle>
              <DialogDescription>
                Заполните информацию о психологе и настройте доступ к личному кабинету
              </DialogDescription>
            </DialogHeader>
            <PsychologistForm 
              psychologist={editingPsychologist}
              onSave={handleSavePsychologist}
              onCancel={() => {
                setIsDialogOpen(false);
                setEditingPsychologist(null);
              }}
              generateLogin={generateLogin}
              generatePassword={generatePassword}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {psychologists.map((psychologist) => (
          <Card key={psychologist.id} className="border-warm-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-warm-100 rounded-full overflow-hidden">
                    {psychologist.photo && psychologist.photo !== "/api/placeholder/150/150" ? (
                      <img 
                        src={psychologist.photo} 
                        alt={psychologist.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Icon name="User" className="text-warm-600" size={24} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-warm-800">{psychologist.name}</h3>
                      <Badge variant={psychologist.isActive ? "default" : "secondary"}>
                        {psychologist.isActive ? "Активен" : "Неактивен"}
                      </Badge>
                    </div>
                    <p className="text-warm-600 mb-1">{psychologist.specialization}</p>
                    <p className="text-sm text-warm-500 mb-2">{psychologist.email}</p>
                    <p className="text-sm text-warm-700">{psychologist.description}</p>
                    <div className="flex items-center space-x-4 mt-3 text-sm text-warm-600">
                      <span>Опыт: {psychologist.experience} лет</span>
                      <span>Цена: ₽{psychologist.price}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditPsychologist(psychologist)}
                    className="text-warm-600 border-warm-300 hover:bg-warm-100"
                  >
                    <Icon name="Edit" size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => togglePsychologistStatus(psychologist.id)}
                    className={psychologist.isActive 
                      ? "text-orange-600 border-orange-300 hover:bg-orange-50"
                      : "text-green-600 border-green-300 hover:bg-green-50"
                    }
                  >
                    <Icon name={psychologist.isActive ? "UserX" : "UserCheck"} size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeletePsychologist(psychologist.id)}
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              </div>
              
              {/* Данные для входа */}
              <div className="mt-4 p-4 bg-warm-50 rounded-lg border border-warm-200">
                <h4 className="text-sm font-medium text-warm-800 mb-2">Данные для входа в кабинет:</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-warm-600">Логин: </span>
                    <span className="font-mono bg-white px-2 py-1 rounded border">{psychologist.login}</span>
                  </div>
                  <div>
                    <span className="text-warm-600">Пароль: </span>
                    <span className="font-mono bg-white px-2 py-1 rounded border">{psychologist.password}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {psychologists.length === 0 && (
          <Card className="border-warm-200">
            <CardContent className="p-12 text-center">
              <Icon name="Users" className="mx-auto text-warm-400 mb-4" size={48} />
              <h3 className="text-lg font-medium text-warm-700 mb-2">Нет психологов</h3>
              <p className="text-warm-600 mb-4">Добавьте первого психолога для начала работы</p>
              <Button 
                className="bg-warm-600 hover:bg-warm-700"
                onClick={() => setIsDialogOpen(true)}
              >
                <Icon name="UserPlus" className="mr-2" size={16} />
                Добавить психолога
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

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
    login: psychologist?.login || "",
    password: psychologist?.password || "",
    specialization: psychologist?.specialization || "",
    experience: psychologist?.experience || 1,
    description: psychologist?.description || "",
    photo: psychologist?.photo || "/api/placeholder/150/150",
    price: psychologist?.price || 10,
    isActive: psychologist?.isActive || true
  });

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      login: prev.login || generateLogin(name)
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
              placeholder="логин"
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
          step="10"
          value={formData.price}
          onChange={(e) => setFormData(prev => ({ ...prev, price: parseInt(e.target.value) || 10 }))}
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

export default PsychologistsManager;