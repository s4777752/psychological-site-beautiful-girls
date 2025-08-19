import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";

interface PsychologistAuth {
  id: string;
  name: string;
  login: string;
}

interface ProfileTabProps {
  psychologist: PsychologistAuth;
}

const ProfileTab = ({ psychologist }: ProfileTabProps) => {
  const [profileData, setProfileData] = useState({
    name: psychologist.name,
    email: "",
    specialization: "",
    experience: "",
    description: "",
    price: ""
  });

  useEffect(() => {
    // Загружаем данные профиля из списка психологов
    const psychologists = JSON.parse(localStorage.getItem("psychologists") || "[]");
    const currentPsychologist = psychologists.find((p: any) => p.id === psychologist.id);
    
    if (currentPsychologist) {
      setProfileData({
        name: currentPsychologist.name,
        email: currentPsychologist.email,
        specialization: currentPsychologist.specialization,
        experience: currentPsychologist.experience.toString(),
        description: currentPsychologist.description,
        price: currentPsychologist.price.toString()
      });
    }
  }, [psychologist.id]);

  const handleSaveProfile = () => {
    // Обновляем данные в localStorage
    const psychologists = JSON.parse(localStorage.getItem("psychologists") || "[]");
    const updatedPsychologists = psychologists.map((p: any) => {
      if (p.id === psychologist.id) {
        const updated = {
          ...p,
          name: profileData.name,
          email: profileData.email,
          specialization: profileData.specialization,
          experience: parseInt(profileData.experience),
          description: profileData.description,
          price: parseInt(profileData.price)
        };
        return updated;
      }
      return p;
    });
    
    localStorage.setItem("psychologists", JSON.stringify(updatedPsychologists));
    
    // Обновляем данные авторизации
    const updatedAuth = { ...psychologist, name: profileData.name };
    localStorage.setItem("psychologistAuth", JSON.stringify(updatedAuth));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-warm-800">Мой профиль</h2>
      
      <Card className="border-warm-200">
        <CardHeader>
          <CardTitle className="text-warm-800">Основная информация</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="profile-name">ФИО</Label>
              <Input
                id="profile-name"
                value={profileData.name}
                onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                className="border-warm-300 focus:border-warm-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-email">Email</Label>
              <Input
                id="profile-email"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                className="border-warm-300 focus:border-warm-500"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="profile-specialization">Специализация</Label>
              <Input
                id="profile-specialization"
                value={profileData.specialization}
                onChange={(e) => setProfileData(prev => ({ ...prev, specialization: e.target.value }))}
                className="border-warm-300 focus:border-warm-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-experience">Опыт работы (лет)</Label>
              <Input
                id="profile-experience"
                type="number"
                value={profileData.experience}
                onChange={(e) => setProfileData(prev => ({ ...prev, experience: e.target.value }))}
                className="border-warm-300 focus:border-warm-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile-price">Стоимость сессии (₽)</Label>
            <Input
              id="profile-price"
              type="number"
              value={profileData.price}
              onChange={(e) => setProfileData(prev => ({ ...prev, price: e.target.value }))}
              className="border-warm-300 focus:border-warm-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile-description">О себе</Label>
            <Textarea
              id="profile-description"
              value={profileData.description}
              onChange={(e) => setProfileData(prev => ({ ...prev, description: e.target.value }))}
              className="border-warm-300 focus:border-warm-500"
              rows={4}
            />
          </div>

          <Button onClick={handleSaveProfile} className="bg-warm-600 hover:bg-warm-700">
            <Icon name="Save" className="mr-2" size={16} />
            Сохранить изменения
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileTab;