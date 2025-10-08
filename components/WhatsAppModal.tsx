// components/WhatsAppModal.tsx
'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Array de números de WhatsApp - fácil de modificar
const whatsappNumbers = [
  {
    id: 1,
    number: '51945270604',
    display: '+51 945 270 604',
    label: 'WhatsApp'
  },
  {
    id: 2,
    number: '51945227780',
    display: '+51 945 227 780',
    label: 'WhatsApp'
  },
  {
    id: 3,
    number: '51970776957',
    display: '+51 970 776 957',
    label: 'WhatsApp'
  }
];

// Función para mezclar array aleatoriamente
const shuffleArray = (array: typeof whatsappNumbers) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const defaultMessage = '¡Hola! Me interesa obtener acceso al material de BDJ Remixer. ¿Podrías proporcionarme más información sobre los planes disponibles?';

export default function WhatsAppModal({ isOpen, onClose }: WhatsAppModalProps) {
  if (!isOpen) return null;

  // Mezclar números aleatoriamente cada vez que se abre el modal
  const shuffledNumbers = shuffleArray(whatsappNumbers);

  const handleWhatsAppClick = (number: string) => {
    const message = encodeURIComponent(defaultMessage);
    window.open(`https://wa.me/${number}?text=${message}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-black rounded-xl shadow-2xl max-w-md w-full border border-red-800 relative overflow-hidden">
        {/* Partículas naranjas/amarillas de fondo */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-4 left-8 w-1 h-1 bg-orange-400 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute top-8 right-12 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce opacity-80"></div>
          <div className="absolute top-12 left-1/4 w-1 h-1 bg-orange-300 rounded-full animate-pulse opacity-70"></div>
          <div className="absolute top-6 right-1/3 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-bounce opacity-60"></div>
        </div>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-red-800 relative z-10">
          <h2 className="text-xl font-bold text-white">💬 Comprar Acceso</h2>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 relative z-10">
          <p className="text-white mb-6 text-center">
            Selecciona un número de WhatsApp para contactarnos:
          </p>

          <div className="space-y-3">
            {shuffledNumbers.map((contact) => (
              <Button
                key={contact.id}
                onClick={() => handleWhatsAppClick(contact.number)}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-semibold shadow-lg transition-all duration-200 hover:scale-105"
              >
                <div className="flex items-center justify-center gap-3">
                  <span className="text-lg">💬</span>
                  <div className="text-left">
                    <div className="font-semibold">{contact.label}</div>
                    <div className="text-sm opacity-90">{contact.display}</div>
                  </div>
                </div>
              </Button>
            ))}
          </div>

          <div className="mt-6 p-4 bg-red-900/20 rounded-lg border border-red-700">
            <p className="text-sm text-red-200 text-center">
              📱 Todos nuestros números están disponibles 24/7
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
