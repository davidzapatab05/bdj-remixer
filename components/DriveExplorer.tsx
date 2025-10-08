// components/DriveExplorer.tsx
'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from '@/components/ui/breadcrumb';
import { 
  Search, 
  ArrowLeft, 
  Folder, 
  ExternalLink,
  HardDrive,
  FolderOpen,
  FileText,
  Image,
  Video,
  Music,
  Archive,
  Code,
  FileSpreadsheet,
  Presentation,
  Loader2
} from 'lucide-react';
import WhatsAppModal from '@/components/WhatsAppModal';

type SharedDrive = { id: string; name: string };
type DriveFolder = { id: string; name: string; driveId?: string };
type DriveFile = { id: string; name: string; mimeType: string; webViewLink?: string; thumbnailLink?: string; driveId?: string };

export default function DriveExplorer() {
  const [drives, setDrives] = useState<SharedDrive[]>([]);
  const [currentDrive, setCurrentDrive] = useState<SharedDrive | null>(null);
  const [folders, setFolders] = useState<DriveFolder[]>([]);
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [stack, setStack] = useState<Array<{ id: string; name: string; driveId?: string }>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<DriveFile[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [searchCache, setSearchCache] = useState<Map<string, DriveFile[]>>(new Map());

  useEffect(() => {
    fetchDrives();
  }, []);

  const performSearch = useCallback(async (query: string) => {
    try {
      const driveId = currentDrive?.id;
      const cacheKey = `${query.toLowerCase()}-${driveId || 'all'}`;
      
      // Verificar caché primero
      if (searchCache.has(cacheKey)) {
        const cachedResults = searchCache.get(cacheKey) || [];
        setSearchResults(cachedResults);
        setIsSearching(false);
        return;
      }
      
      const res = await fetch(`/api/drive?action=search&query=${encodeURIComponent(query)}${driveId ? `&driveId=${encodeURIComponent(driveId)}` : ''}`);
      const json = await res.json();
      
      const results = json.files || [];
      
      // Guardar en caché
      setSearchCache(prev => new Map(prev).set(cacheKey, results));
      
      // Actualizar resultados y estado de búsqueda al mismo tiempo
      setSearchResults(results);
      setIsSearching(false);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error searching files';
      setError(errorMessage);
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [currentDrive?.id, searchCache]);

  // Función de búsqueda con debounce optimizado
  const debouncedSearch = useCallback((query: string) => {
    const timeoutId = setTimeout(async () => {
      if (query.trim().length > 2) {
        await performSearch(query.trim());
      } else {
        setSearchResults([]);
        setIsSearching(false);
      }
    }, 200); // Reducido de 300ms a 200ms para mayor velocidad
    
    return () => clearTimeout(timeoutId);
  }, [performSearch]);

  useEffect(() => {
    if (searchQuery && searchQuery.trim().length > 2) {
      setIsSearching(true);
      setSearchResults([]); // Limpiar resultados anteriores inmediatamente
      debouncedSearch(searchQuery);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [searchQuery, debouncedSearch]);

  async function fetchDrives() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/drive?action=shared-drives');
      const json = await res.json();
      setDrives(json.sharedDrives || []);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error fetching drives';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  async function openDrive(driveId: string, name: string) {
    console.log('🚀 Opening drive:', driveId, name);
    
    // Limpiar completamente todos los estados
    setCurrentDrive({ id: driveId, name });
    setStack([{ id: driveId, name, driveId }]);
    setFolders([]);
    setFiles([]);
    setSearchResults([]);
    setSearchQuery('');
    setError(null);
    
    await fetchFolders(driveId);
  }

  async function fetchFolders(driveId: string) {
    setLoading(true);
    setError(null);
    setFiles([]);
    try {
      console.log('🔍 Fetching folders for drive:', driveId);
      
      const res = await fetch(`/api/drive?action=folders&driveId=${encodeURIComponent(driveId)}`);
      const json = await res.json();
      
      console.log('📁 Folders API Response:', json);
      
      const folders = json.folders || [];
      console.log('📂 Folders found:', folders.length);
      
      setFolders(folders);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error fetching folders';
      console.error('❌ Error fetching folders:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  async function openFolder(folderId: string, name: string) {
    const driveId = currentDrive?.id;
    if (!driveId) return;
    
    console.log('📁 Opening folder:', folderId, name, 'in drive:', driveId);
    
    // Limpiar completamente todos los estados
    setFolders([]);
    setFiles([]);
    setSearchResults([]);
    setSearchQuery('');
    setError(null);
    
    // Agregar al stack de navegación
    setStack(prev => {
      const exists = prev.some(item => item.id === folderId);
      if (exists) return prev;
      return [...prev, { id: folderId, name, driveId }];
    });
    
    // Cargar contenido de la carpeta
    await fetchFiles(folderId, driveId);
  }

  async function fetchFiles(folderId: string, driveId?: string) {
    setLoading(true);
    setError(null);
    try {
      console.log('🔍 Fetching files for folder:', folderId, 'driveId:', driveId);
      
      // Obtener tanto archivos como carpetas dentro de la carpeta
      const url = `/api/drive?action=files&folderId=${encodeURIComponent(folderId)}` + (driveId ? `&driveId=${encodeURIComponent(driveId)}` : '');
      const res = await fetch(url);
      const json = await res.json();
      
      console.log('📁 API Response:', json);
      
      const allItems = json.files || [];
      
      // Separar carpetas y archivos correctamente
      const folders = allItems.filter((item: DriveFile) => item.mimeType === 'application/vnd.google-apps.folder');
      const files = allItems.filter((item: DriveFile) => item.mimeType !== 'application/vnd.google-apps.folder');
      
      console.log('📂 Folders found:', folders.length);
      console.log('📄 Files found:', files.length);
      
      // Establecer los datos directamente
      setFolders(folders);
      setFiles(files);
      
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error fetching files';
      console.error('❌ Error fetching files:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  function goBackTo(index: number) {
    // index refers to stack position to go to (0 is drive root)
    const target = stack[index];
    if (!target) return;
    
    console.log('🔙 Going back to:', target.name, 'at index:', index);
    
    // Limpiar completamente todos los estados
    setFolders([]);
    setFiles([]);
    setSearchResults([]);
    setSearchQuery('');
    setError(null);
    
    // truncate stack
    const newStack = stack.slice(0, index + 1);
    setStack(newStack);
    
    // If target is the drive root (index 0), load folders
    if (index === 0) {
      fetchFolders(target.id);
    } else {
      // Otherwise target is a folder: load its content
      fetchFiles(target.id, target.driveId);
    }
  }

  // Función para obtener el icono según el tipo de archivo
  function getFileIcon(mimeType: string) {
    if (mimeType.includes('folder')) return <Folder className="h-5 w-5" />;
    if (mimeType.includes('image')) return <Image className="h-5 w-5" />;
    if (mimeType.includes('video')) return <Video className="h-5 w-5" />;
    if (mimeType.includes('audio')) return <Music className="h-5 w-5" />;
    if (mimeType.includes('zip') || mimeType.includes('rar') || mimeType.includes('7z')) return <Archive className="h-5 w-5" />;
    if (mimeType.includes('text') || mimeType.includes('javascript') || mimeType.includes('json')) return <Code className="h-5 w-5" />;
    if (mimeType.includes('spreadsheet') || mimeType.includes('excel')) return <FileSpreadsheet className="h-5 w-5" />;
    if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) return <Presentation className="h-5 w-5" />;
    return <FileText className="h-5 w-5" />;
  }


  function openFileInDrive(file: DriveFile) {
    try {
      // Usar URL de solo visualización (preview) que no permite descarga
      const url = `https://drive.google.com/file/d/${file.id}/preview`;
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Error opening file in Drive:', error);
      // Fallback URL
      const url = `https://drive.google.com/file/d/${file.id}/preview`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }

  function openFolderInDrive(folderId: string) {
    try {
      // Usar URL que abre en modo de solo visualización
      const url = `https://drive.google.com/drive/folders/${folderId}?usp=sharing`;
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Error opening folder in Drive:', error);
    }
  }

  function resetToDrives() {
    setCurrentDrive(null);
    setStack([]);
    setFolders([]);
    setFiles([]);
    setSearchQuery('');
    setSearchResults([]);
    fetchDrives();
  }


  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Header Principal */}
      <div className="bg-gradient-to-r from-red-900 to-black shadow-2xl border-b border-red-800 relative overflow-hidden">
        {/* Partículas naranjas/amarillas de fondo */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-4 left-8 w-2 h-2 bg-orange-400 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute top-12 right-16 w-1 h-1 bg-yellow-400 rounded-full animate-bounce opacity-80"></div>
          <div className="absolute top-20 left-1/4 w-1.5 h-1.5 bg-orange-300 rounded-full animate-pulse opacity-70"></div>
          <div className="absolute top-8 right-1/3 w-1 h-1 bg-yellow-300 rounded-full animate-bounce opacity-60"></div>
          <div className="absolute top-16 left-1/2 w-2 h-2 bg-orange-500 rounded-full animate-pulse opacity-50"></div>
          <div className="absolute top-6 right-8 w-1 h-1 bg-yellow-500 rounded-full animate-bounce opacity-90"></div>
        </div>
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-1 sm:py-2">
          <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
            {/* Logo BDJ Remixer */}
            <div className="flex items-center justify-center sm:justify-start">
              <img 
                src="/LOGO_RECORTADO.png" 
                alt="BDJ Remixer Logo" 
                className="h-6 sm:h-8 md:h-10 lg:h-12 xl:h-14 2xl:h-16 w-auto object-contain brightness-0 invert"
              />
            </div>

            {/* Barra de búsqueda central */}
            <div className="relative w-full sm:flex-1 sm:max-w-2xl sm:mx-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar archivos, carpetas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10 py-3 text-sm bg-white/10 border border-red-700 rounded-xl shadow-lg focus:bg-white/20 focus:ring-2 focus:ring-red-400 text-white placeholder-gray-300 w-full"
                />
                {isSearching && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                    <Loader2 className="h-4 w-4 animate-spin text-red-400" />
                    <span className="text-red-400 text-xs font-medium hidden sm:inline">Buscando...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Botón Comprar Acceso */}
            <Button 
              onClick={() => setIsWhatsAppModalOpen(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-semibold shadow-lg text-sm w-full sm:w-auto"
            >
              💬 Comprar Acceso
            </Button>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="flex-1">
        <div className="max-w-7xl mx-auto p-3 sm:p-6 relative z-10">
        

        {/* Navegación - Solo se muestra cuando hay breadcrumbs */}
        {stack.length > 0 && (
          <div className="mb-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-3 sm:p-4 border border-gray-700">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                {/* Botón de regresar */}
                <Button 
                  variant="outline"
                  onClick={() => {
                    if (stack.length > 1) {
                      goBackTo(stack.length - 2);
                    } else {
                      resetToDrives();
                    }
                  }}
                  className="flex items-center gap-2 bg-gray-700/50 hover:bg-gray-600/50 text-white border-gray-600 w-full sm:w-auto justify-center sm:justify-start"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Regresar
                </Button>
                
                {/* Breadcrumbs */}
                <div className="flex-1 min-w-0">
                  <Breadcrumb>
                    <BreadcrumbList className="flex-wrap">
                      <BreadcrumbItem>
                        <BreadcrumbLink 
                          onClick={resetToDrives} 
                          className="cursor-pointer text-red-400 hover:text-red-300 font-medium text-sm"
                        >
                          🏠 Unidades
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      {stack.map((item, index) => (
                        <React.Fragment key={`${item.id}-${index}`}>
                          <BreadcrumbItem>
                            {index === stack.length - 1 ? (
                              <BreadcrumbPage className="text-white font-semibold text-sm break-words">
                                {item.name}
                              </BreadcrumbPage>
                            ) : (
                              <BreadcrumbLink 
                                onClick={() => goBackTo(index)} 
                                className="cursor-pointer text-red-400 hover:text-red-300 font-medium text-sm break-words"
                              >
                                {item.name}
                              </BreadcrumbLink>
                            )}
                          </BreadcrumbItem>
                          {index < stack.length - 1 && <BreadcrumbSeparator />}
                        </React.Fragment>
                      ))}
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mb-6 bg-red-900/20 border border-red-700 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-red-300 font-medium">⚠️ Error: {error}</div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="space-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-gray-700">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-lg bg-gray-700" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-3/4 mb-2 bg-gray-700" />
                    <Skeleton className="h-3 w-1/2 bg-gray-700" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Vista Unificada - Lista Vertical */}
        {!loading && (
          <div>
            {/* Resultados de búsqueda */}
            {searchQuery && (
              <div className="mb-8">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-700 mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    🔍 Resultados de búsqueda para &quot;{searchQuery}&quot;
                  </h3>
                  {searchResults.length > 0 && (
                    <Badge className="bg-red-600 text-white border-red-500">
                      {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''}
                    </Badge>
                  )}
                </div>
                {isSearching ? (
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-12 text-center border border-gray-700">
                    <div className="relative">
                      <Loader2 className="h-16 w-16 mx-auto text-red-400 mb-4 animate-spin" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 border-4 border-red-200 border-t-red-500 rounded-full animate-spin"></div>
                      </div>
                    </div>
                    <p className="text-gray-300 text-lg font-semibold">Buscando...</p>
                    <p className="text-gray-400 text-sm mt-2">Por favor espera mientras buscamos en tu Google Drive</p>
                    
                    {/* Barra de progreso animada */}
                    <div className="mt-6 w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full animate-pulse" style={{width: '100%'}}></div>
                    </div>
                    
                    <div className="mt-4 flex justify-center space-x-1">
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                ) : !isSearching && searchResults.length === 0 && searchQuery ? (
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-12 text-center border border-gray-700">
                    <Search className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-300 text-lg">No se encontraron resultados.</p>
                    <p className="text-gray-400 text-sm mt-2">Intenta con otros términos de búsqueda</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {searchResults.map(file => (
                      <div key={file.id} className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700 group">
                        <div className="p-4">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-red-600/20 rounded-lg group-hover:bg-red-600/30 transition-colors">
                              <div className="text-red-400">
                                {getFileIcon(file.mimeType)}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-white text-lg break-words">{file.name}</h4>
                              <p className="text-sm text-gray-300">
                                {file.mimeType.includes('folder') ? 'Carpeta' : 'Archivo'}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge className={`${
                                file.mimeType.includes('folder') 
                                  ? 'bg-orange-600 text-white border-orange-500' 
                                  : 'bg-gray-600 text-gray-200 border-gray-500'
                              }`}>
                                {file.mimeType.includes('folder') ? '📁 Carpeta' : '📄 Archivo'}
                              </Badge>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => openFileInDrive(file)}
                                className="border-red-500 text-red-400 hover:bg-red-600/20"
                                title="Ver en Google Drive (solo visualización)"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Contenido Principal - Lista Vertical */}
            {!searchQuery && (
              <div className="space-y-3">
                {/* Unidades Compartidas */}
                {!currentDrive && drives.map(drive => (
                  <div 
                    key={drive.id} 
                    className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700 cursor-pointer group"
                    onClick={() => openDrive(drive.id, drive.name)}
                  >
                    <div className="p-3 sm:p-4">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="p-2 sm:p-3 bg-gradient-to-br from-red-600 to-red-800 rounded-lg group-hover:from-red-700 group-hover:to-red-900 transition-all flex-shrink-0">
                          <HardDrive className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-white text-base sm:text-lg break-words leading-tight">{drive.name}</h4>
                          <p className="text-xs sm:text-sm text-gray-300">Unidad Compartida</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Badge className="bg-red-600 text-white border-red-500 text-xs hidden sm:inline-flex">
                            💾 Unidad Compartida
                          </Badge>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              openFolderInDrive(drive.id);
                            }}
                            className="border-red-500 text-red-400 hover:bg-red-600/20 p-2"
                            title="Ver en Google Drive (solo visualización)"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Carpetas */}
                {folders.map(folder => (
                  <div 
                    key={folder.id} 
                    className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700 cursor-pointer group"
                    onClick={() => openFolder(folder.id, folder.name)}
                  >
                    <div className="p-3 sm:p-4">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="p-2 sm:p-3 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg group-hover:from-yellow-600 group-hover:to-orange-700 transition-all flex-shrink-0">
                          <Folder className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-white text-base sm:text-lg break-words leading-tight">{folder.name}</h4>
                          <p className="text-xs sm:text-sm text-gray-300">Carpeta</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Badge className="bg-orange-600 text-white border-orange-500 text-xs hidden sm:inline-flex">
                            📁 Carpeta
                          </Badge>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              openFolderInDrive(folder.id);
                            }}
                            className="border-red-500 text-red-400 hover:bg-red-600/20 p-2"
                            title="Ver en Google Drive (solo visualización)"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Archivos */}
                {files.map(file => (
                  <div key={file.id} className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700 group">
                    <div className="p-3 sm:p-4">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="p-2 sm:p-3 bg-gradient-to-br from-gray-500 to-gray-700 rounded-lg group-hover:from-gray-600 group-hover:to-gray-800 transition-all flex-shrink-0">
                          <div className="text-white">
                            {getFileIcon(file.mimeType)}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-white text-base sm:text-lg break-words leading-tight">{file.name}</h4>
                          <p className="text-xs sm:text-sm text-gray-300">
                            {file.mimeType.includes('image') ? 'Imagen' :
                             file.mimeType.includes('video') ? 'Video' :
                             file.mimeType.includes('audio') ? 'Audio' :
                             file.mimeType.includes('document') ? 'Documento' :
                             file.mimeType.includes('spreadsheet') ? 'Hoja de cálculo' :
                             file.mimeType.includes('presentation') ? 'Presentación' :
                             'Archivo'}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Badge className={`text-xs hidden sm:inline-flex ${
                            file.mimeType.includes('image') ? 'bg-pink-600 text-white border-pink-500' :
                            file.mimeType.includes('video') ? 'bg-red-600 text-white border-red-500' :
                            file.mimeType.includes('audio') ? 'bg-purple-600 text-white border-purple-500' :
                            file.mimeType.includes('document') ? 'bg-red-600 text-white border-red-500' :
                            file.mimeType.includes('spreadsheet') ? 'bg-green-600 text-white border-green-500' :
                            file.mimeType.includes('presentation') ? 'bg-orange-600 text-white border-orange-500' :
                            'bg-gray-600 text-white border-gray-500'
                          }`}>
                            {file.mimeType.includes('image') ? '🖼️ Imagen' :
                             file.mimeType.includes('video') ? '🎥 Video' :
                             file.mimeType.includes('audio') ? '🎵 Audio' :
                             file.mimeType.includes('document') ? '📄 Documento' :
                             file.mimeType.includes('spreadsheet') ? '📊 Hoja de cálculo' :
                             file.mimeType.includes('presentation') ? '📋 Presentación' :
                             '📄 Archivo'}
                          </Badge>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => openFileInDrive(file)}
                            className="border-red-500 text-red-400 hover:bg-red-600/20"
                            title="Ver en Google Drive (solo visualización)"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Estado vacío */}
                {drives.length === 0 && folders.length === 0 && files.length === 0 && (
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-12 text-center border border-gray-700">
                    <FolderOpen className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-300 text-lg">
                      {!currentDrive ? 'No se encontraron unidades compartidas.' : 'Esta carpeta está vacía.'}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        </div>
      </div>

      {/* Footer simplificado */}
      <footer className="bg-black border-t border-red-800 mt-12 relative overflow-hidden">
        {/* Partículas naranjas/amarillas de fondo */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-2 left-8 w-1 h-1 bg-orange-400 rounded-full animate-pulse opacity-40"></div>
          <div className="absolute top-4 right-16 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce opacity-60"></div>
          <div className="absolute top-6 left-1/4 w-1 h-1 bg-orange-300 rounded-full animate-pulse opacity-50"></div>
          <div className="absolute top-3 right-1/3 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-bounce opacity-40"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
          <div className="text-center">
            <p className="text-white text-sm font-medium">
              © {new Date().getFullYear()} BDJ Remixer. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Modal de WhatsApp */}
      <WhatsAppModal 
        isOpen={isWhatsAppModalOpen} 
        onClose={() => setIsWhatsAppModalOpen(false)} 
      />
    </div>
  );
}
