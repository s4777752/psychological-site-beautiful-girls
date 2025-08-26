import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";

interface Document {
  id: string;
  name: string;
  description: string;
  category: 'agreement' | 'form' | 'certificate' | 'report' | 'other';
  uploadDate: string;
  size: string;
  fileType: string;
  visibility: 'client' | 'manager' | 'both';
}

interface PsychologistAuth {
  id: string;
  name: string;
  login: string;
}

const DocumentsTab = () => {
  const [psychologist] = useState<PsychologistAuth | null>(() => {
    const auth = localStorage.getItem("psychologistAuth");
    return auth ? JSON.parse(auth) : null;
  });

  const [documents, setDocuments] = useState<Document[]>(() => {
    const saved = localStorage.getItem(`documents_${psychologist?.id}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    name: "",
    description: "",
    category: "",
    visibility: ""
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categoryNames = {
    agreement: "Соглашения",
    form: "Формы",
    certificate: "Сертификаты", 
    report: "Отчеты",
    other: "Другое"
  };

  const visibilityNames = {
    client: "Только клиенты",
    manager: "Только управляющие",
    both: "Клиенты и управляющие"
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const newDocument: Document = {
      id: Date.now().toString(),
      name: uploadForm.name || file.name,
      description: uploadForm.description,
      category: uploadForm.category as Document['category'],
      uploadDate: new Date().toLocaleString('ru-RU'),
      size: formatFileSize(file.size),
      fileType: file.type || 'unknown',
      visibility: uploadForm.visibility as Document['visibility']
    };

    const updatedDocuments = [newDocument, ...documents];
    setDocuments(updatedDocuments);
    localStorage.setItem(`documents_${psychologist?.id}`, JSON.stringify(updatedDocuments));

    setUploadForm({
      name: "",
      description: "",
      category: "",
      visibility: ""
    });
    setIsUploadOpen(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const deleteDocument = (id: string) => {
    const updatedDocuments = documents.filter(doc => doc.id !== id);
    setDocuments(updatedDocuments);
    localStorage.setItem(`documents_${psychologist?.id}`, JSON.stringify(updatedDocuments));
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return 'FileText';
    if (fileType.includes('image')) return 'Image';
    if (fileType.includes('word') || fileType.includes('document')) return 'FileText';
    if (fileType.includes('excel') || fileType.includes('sheet')) return 'FileSpreadsheet';
    return 'File';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-warm-800">Документы</h2>
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button className="bg-warm-600 hover:bg-warm-700">
              <Icon name="Upload" className="mr-2" size={16} />
              Загрузить документ
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Загрузить новый документ</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="docName">Название документа</Label>
                <Input
                  id="docName"
                  value={uploadForm.name}
                  onChange={(e) => setUploadForm({...uploadForm, name: e.target.value})}
                  placeholder="Введите название документа"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="docDescription">Описание</Label>
                <Textarea
                  id="docDescription"
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm({...uploadForm, description: e.target.value})}
                  placeholder="Краткое описание документа..."
                  rows={3}
                />
              </div>

              <div className="grid gap-2">
                <Label>Категория</Label>
                <Select onValueChange={(value) => setUploadForm({...uploadForm, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="agreement">Соглашения</SelectItem>
                    <SelectItem value="form">Формы</SelectItem>
                    <SelectItem value="certificate">Сертификаты</SelectItem>
                    <SelectItem value="report">Отчеты</SelectItem>
                    <SelectItem value="other">Другое</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Доступ к документу</Label>
                <Select onValueChange={(value) => setUploadForm({...uploadForm, visibility: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Кто может видеть документ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client">Только клиенты</SelectItem>
                    <SelectItem value="manager">Только управляющие</SelectItem>
                    <SelectItem value="both">Клиенты и управляющие</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Файл</Label>
                <Button 
                  variant="outline" 
                  onClick={handleFileSelect}
                  className="justify-start"
                >
                  <Icon name="Upload" className="mr-2" size={16} />
                  Выбрать файл
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.xlsx,.xls"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={handleFileSelect}
                  disabled={!uploadForm.category || !uploadForm.visibility}
                  className="bg-warm-600 hover:bg-warm-700 flex-1"
                >
                  <Icon name="Upload" className="mr-2" size={16} />
                  Загрузить
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsUploadOpen(false)}
                >
                  Отмена
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {documents.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Icon name="FolderOpen" size={64} className="mx-auto mb-4 text-warm-400" />
            <h3 className="text-lg font-semibold text-warm-700 mb-2">Нет загруженных документов</h3>
            <p className="text-warm-500 mb-4">
              Загрузите документы, чтобы они были доступны клиентам и управляющим
            </p>
            <Button onClick={() => setIsUploadOpen(true)} className="bg-warm-600 hover:bg-warm-700">
              <Icon name="Upload" className="mr-2" size={16} />
              Загрузить первый документ
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {documents.map((doc) => (
            <Card key={doc.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="p-2 bg-warm-100 rounded-lg">
                      <Icon name={getFileIcon(doc.fileType) as any} size={24} className="text-warm-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-warm-800 mb-1">{doc.name}</h3>
                      {doc.description && (
                        <p className="text-sm text-warm-600 mb-2">{doc.description}</p>
                      )}
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge variant="secondary">
                          {categoryNames[doc.category]}
                        </Badge>
                        <Badge 
                          variant={doc.visibility === 'both' ? 'default' : 'outline'}
                          className={doc.visibility === 'client' ? 'bg-blue-100 text-blue-800' : 
                                   doc.visibility === 'manager' ? 'bg-green-100 text-green-800' : ''}
                        >
                          {visibilityNames[doc.visibility]}
                        </Badge>
                      </div>
                      <div className="text-xs text-warm-500">
                        <span>Загружено: {doc.uploadDate}</span>
                        <span className="ml-4">Размер: {doc.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Icon name="Download" size={16} />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="Eye" size={16} />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => deleteDocument(doc.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-warm-800">Информация о документах</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-2 text-sm text-warm-600">
            <Icon name="Info" size={16} />
            <span>Документы автоматически становятся доступны в кабинете выбранных пользователей</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-warm-600">
            <Icon name="Shield" size={16} />
            <span>Поддерживаемые форматы: PDF, DOC/DOCX, JPG/PNG, XLS/XLSX</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-warm-600">
            <Icon name="Users" size={16} />
            <span>Клиенты и управляющие увидят документы в своих личных кабинетах</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentsTab;