'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';

interface DeleteProductButtonProps {
  productId: string;
}

export function DeleteProductButton({ productId }: DeleteProductButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Bu məhsulu silməyə əminsiniz?')) return;
    
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/products?id=${productId}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) {
        throw new Error('Silinmə xətası');
      }
      
      router.refresh();
    } catch (err) {
      console.error(err);
      alert('Məhsulu silmək mümkün olmadı.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className={`p-2 rounded-xl transition-colors ${
        isDeleting 
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
          : 'hover:bg-red-50 hover:text-red-600'
      }`}
      title="Sil"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}