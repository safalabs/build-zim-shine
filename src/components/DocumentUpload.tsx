import { Upload, FileText, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const DocumentUpload = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-6">Upload Documents</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ID Document Upload */}
        <Card className="border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer">
          <CardContent className="flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <h4 className="font-medium mb-2">Identity Document</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Drag & drop or browse
            </p>
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Choose File
            </Button>
          </CardContent>
        </Card>

        {/* Profile Photo Upload */}
        <Card className="border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer">
          <CardContent className="flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mb-4">
              <User className="w-8 h-8 text-muted-foreground" />
            </div>
            <h4 className="font-medium mb-2">Profile Photo</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Drag & drop or browse
            </p>
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Choose File
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Uploaded Document Preview */}
      <div className="mt-6">
        <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
          <div className="w-12 h-12 bg-background rounded border flex items-center justify-center">
            <User className="w-6 h-6 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <p className="font-medium">profile_photo.jpg</p>
            <p className="text-sm text-muted-foreground">Uploaded successfully</p>
          </div>
          <Button variant="ghost" size="sm">
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;