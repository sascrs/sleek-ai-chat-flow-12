
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold font-space-grotesk mb-2 bg-gradient-to-r from-primary via-indigo-500 to-purple-600 bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold">Pagina nu a fost găsită</h2>
        <p className="text-muted-foreground">
          Ne pare rău, pagina pe care încercați să o accesați nu există sau a fost mutată.
        </p>
        
        <div className="pt-4">
          <Button asChild>
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Înapoi la pagina principală
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
