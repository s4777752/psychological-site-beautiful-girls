import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const ManagerContentTab = () => {
  const [heroTitle, setHeroTitle] = useState("Профессиональная психологическая помощь онлайн");
  const [heroDescription, setHeroDescription] = useState("Получите квалифицированную поддержку от лицензированных психологов не выходя из дома");

  return (
    <div className="space-y-6">
      <Card className="border-warm-200">
        <CardHeader>
          <CardTitle className="text-warm-800">Редактирование главной страницы</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="hero-title">Заголовок Hero секции</Label>
            <Input
              id="hero-title"
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              className="border-warm-300 focus:border-warm-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hero-desc">Описание Hero секции</Label>
            <Textarea
              id="hero-desc"
              value={heroDescription}
              onChange={(e) => setHeroDescription(e.target.value)}
              className="border-warm-300 focus:border-warm-500"
              rows={3}
            />
          </div>
          <Button className="bg-warm-600 hover:bg-warm-700">
            <Icon name="Save" className="mr-2" size={16} />
            Сохранить изменения
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManagerContentTab;