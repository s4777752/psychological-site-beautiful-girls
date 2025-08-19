import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";
import PsychologistCard from "@/components/PsychologistCard";
import PsychologistForm from "@/components/PsychologistForm";
import EmptyPsychologistState from "@/components/EmptyPsychologistState";
import { usePsychologists } from "@/hooks/usePsychologists";
import { Psychologist } from "@/types/psychologist";
import LocalStorageDebugger from "@/components/debug/LocalStorageDebugger";

const PsychologistsManager = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPsychologist, setEditingPsychologist] = useState<Psychologist | null>(null);

  const {
    psychologists,
    generateLogin,
    generatePassword,
    savePsychologist,
    deletePsychologist,
    togglePsychologistStatus,
    updateAvatars,
    resetToDefaultData
  } = usePsychologists();

  const handleSavePsychologist = (psychologist: Omit<Psychologist, 'id' | 'createdAt'>) => {
    savePsychologist(psychologist, editingPsychologist);
    setIsDialogOpen(false);
    setEditingPsychologist(null);
  };

  const handleEditPsychologist = (psychologist: Psychologist) => {
    setEditingPsychologist(psychologist);
    setIsDialogOpen(true);
  };

  const handleAddPsychologist = () => {
    setEditingPsychologist(null);
    setIsDialogOpen(true);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setEditingPsychologist(null);
  };

  return (
    <div className="space-y-6">
      {/* Debug Component - Remove in production */}
      <LocalStorageDebugger />
      
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-warm-800">Управление психологами</h2>
          <p className="text-warm-600">Всего специалистов: {psychologists.length}</p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline"
            onClick={updateAvatars}
            className="border-warm-300 text-warm-700 hover:bg-warm-50"
          >
            <Icon name="Camera" className="mr-2" size={16} />
            Обновить фото
          </Button>
          <Button 
            variant="outline"
            onClick={resetToDefaultData}
            className="border-warm-300 text-warm-700 hover:bg-warm-50"
          >
            <Icon name="RotateCcw" className="mr-2" size={16} />
            Сбросить цены
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                className="bg-warm-600 hover:bg-warm-700"
                onClick={handleAddPsychologist}
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
                onCancel={handleCancel}
                generateLogin={generateLogin}
                generatePassword={generatePassword}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6">
        {psychologists.map((psychologist) => (
          <PsychologistCard
            key={psychologist.id}
            psychologist={psychologist}
            onEdit={handleEditPsychologist}
            onToggleStatus={togglePsychologistStatus}
            onDelete={deletePsychologist}
          />
        ))}
        
        {psychologists.length === 0 && (
          <EmptyPsychologistState onAddPsychologist={handleAddPsychologist} />
        )}
      </div>
    </div>
  );
};

export default PsychologistsManager;