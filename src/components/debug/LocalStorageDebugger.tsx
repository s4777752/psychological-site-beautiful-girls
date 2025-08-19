import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LocalStorageDebugger = () => {
  const [debugInfo, setDebugInfo] = useState<string>("");
  const [autoRefresh, setAutoRefresh] = useState(false);

  const checkLocalStorage = () => {
    const psychologistsData = localStorage.getItem("psychologists");
    const authData = localStorage.getItem("psychologistAuth");
    
    let info = "=== localStorage DEBUG INFO ===\n\n";
    info += `Timestamp: ${new Date().toLocaleTimeString()}\n\n`;
    
    if (psychologistsData) {
      try {
        const psychologists = JSON.parse(psychologistsData);
        info += `Psychologists found: ${psychologists.length}\n`;
        info += `Active: ${psychologists.filter((p: any) => p.isActive).length}\n`;
        info += `Inactive: ${psychologists.filter((p: any) => !p.isActive).length}\n\n`;
        
        psychologists.forEach((p: any, index: number) => {
          info += `${index + 1}. ${p.name} (${p.id}) - ${p.isActive ? 'ACTIVE' : 'INACTIVE'}\n`;
        });
        
        info += "\n=== RAW DATA ===\n";
        info += JSON.stringify(psychologists, null, 2);
        
      } catch (error) {
        info += `Error parsing psychologists data: ${error}\n`;
        info += `Raw data: ${psychologistsData.substring(0, 200)}...\n`;
      }
    } else {
      info += "No psychologists data found in localStorage\n";
    }
    
    if (authData) {
      info += `\n=== AUTH DATA ===\n`;
      info += `Auth data exists: ${authData}\n`;
    }
    
    setDebugInfo(info);
  };

  const clearLocalStorage = () => {
    if (confirm("Clear all localStorage data?")) {
      localStorage.removeItem("psychologists");
      localStorage.removeItem("psychologistAuth");
      localStorage.removeItem("managerAuth");
      checkLocalStorage();
      console.log("🧹 [Debug] localStorage cleared");
    }
  };

  const toggleFirstPsychologist = () => {
    const psychologistsData = localStorage.getItem("psychologists");
    if (psychologistsData) {
      try {
        const psychologists = JSON.parse(psychologistsData);
        if (psychologists.length > 0) {
          const updated = psychologists.map((p: any, index: number) => {
            if (index === 0) {
              console.log(`🔄 [Debug] Toggling ${p.name} from ${p.isActive} to ${!p.isActive}`);
              return { ...p, isActive: !p.isActive };
            }
            return p;
          });
          localStorage.setItem("psychologists", JSON.stringify(updated));
          checkLocalStorage();
        }
      } catch (error) {
        console.error("Error toggling psychologist:", error);
      }
    }
  };

  useEffect(() => {
    checkLocalStorage();
    
    let interval: NodeJS.Timeout;
    if (autoRefresh) {
      interval = setInterval(checkLocalStorage, 1000);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [autoRefresh]);

  // Listen for storage events
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "psychologists") {
        console.log("🔔 [Debug] Storage event detected for psychologists");
        setTimeout(checkLocalStorage, 100); // Small delay to ensure consistency
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardHeader>
        <CardTitle className="text-blue-800">🐛 localStorage Debugger</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button onClick={checkLocalStorage} variant="outline" size="sm">
            🔍 Check State
          </Button>
          <Button onClick={toggleFirstPsychologist} variant="outline" size="sm">
            🔄 Toggle First
          </Button>
          <Button onClick={clearLocalStorage} variant="outline" size="sm">
            🧹 Clear All
          </Button>
          <Button 
            onClick={() => setAutoRefresh(!autoRefresh)} 
            variant={autoRefresh ? "default" : "outline"} 
            size="sm"
          >
            {autoRefresh ? "⏸️ Stop Auto" : "▶️ Auto Refresh"}
          </Button>
        </div>
        
        <pre className="bg-gray-900 text-green-400 p-4 rounded text-xs overflow-auto max-h-96 whitespace-pre-wrap">
          {debugInfo || "Click 'Check State' to see localStorage data..."}
        </pre>
      </CardContent>
    </Card>
  );
};

export default LocalStorageDebugger;