'use client';

import React from 'react';
import FileInput from '@/components/ui/FileInput';
import Textarea from '@/components/ui/Textarea';
import FormGrid from '@/components/FormGrid';
import { FormData } from '@/types';

interface FotosAnexosProps {
  formData: FormData;
  updateField: (field: keyof FormData, value: any) => void;
  errors: Record<string, string>;
}

const FotosAnexos: React.FC<FotosAnexosProps> = ({
  formData,
  updateField,
  errors
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fotos da Fachada */}
        <FileInput
          label="Fotos da Fachada"
          files={formData.fotosFachada}
          onChange={(files) => updateField('fotosFachada', files)}
          accept="image/*"
          multiple
          required
          error={errors.fotosFachada}
        />

        {/* Fotos do Interior */}
        <FileInput
          label="Fotos do Interior"
          files={formData.fotosInterior}
          onChange={(files) => updateField('fotosInterior', files)}
          accept="image/*"
          multiple
          error={errors.fotosInterior}
        />

        {/* Fotos do Estoque */}
        <FileInput
          label="Fotos do Estoque"
          files={formData.fotosEstoque}
          onChange={(files) => updateField('fotosEstoque', files)}
          accept="image/*"
          multiple
          error={errors.fotosEstoque}
        />

        {/* Outras Fotos */}
        <FileInput
          label="Outras Fotos"
          files={formData.fotosOutros}
          onChange={(files) => updateField('fotosOutros', files)}
          accept="image/*"
          multiple
          error={errors.fotosOutros}
        />
      </div>

      {/* Observações */}
      <Textarea
        label="Observações"
        value={formData.observacoes}
        onChange={(e) => updateField('observacoes', e.target.value)}
        placeholder="Adicione observações gerais sobre a visita, pontos importantes observados, recomendações, etc..."
        rows={6}
        error={errors.observacoes}
      />

      {/* Resumo dos anexos */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-gray-900 mb-2">
          Resumo dos Anexos
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
          <div>
            <span className="font-medium">Fachada:</span>
            <span className="ml-1">{formData.fotosFachada.length} arquivo(s)</span>
          </div>
          <div>
            <span className="font-medium">Interior:</span>
            <span className="ml-1">{formData.fotosInterior.length} arquivo(s)</span>
          </div>
          <div>
            <span className="font-medium">Estoque:</span>
            <span className="ml-1">{formData.fotosEstoque.length} arquivo(s)</span>
          </div>
          <div>
            <span className="font-medium">Outros:</span>
            <span className="ml-1">{formData.fotosOutros.length} arquivo(s)</span>
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          <span className="font-medium">Total:</span>
          <span className="ml-1">
            {formData.fotosFachada.length + 
             formData.fotosInterior.length + 
             formData.fotosEstoque.length + 
             formData.fotosOutros.length} arquivo(s)
          </span>
        </div>
      </div>
    </div>
  );
};

export default FotosAnexos;

