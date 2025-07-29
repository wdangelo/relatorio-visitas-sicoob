import React from 'react';
import { FormData } from '@/types';
import PdfGeneratorButton from './PdfGeneratorButton';

interface FormActionsProps {
  formData: FormData;
  onSaveDraft: () => void;
  onSubmit: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({ formData, onSaveDraft, onSubmit }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-sicoob-turquesa">
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          type="button"
          onClick={onSaveDraft}
          className="btn-outline"
        >
          Salvar Rascunho
        </button>
        
        <PdfGeneratorButton formData={formData} />
        
        <button
          type="button"
          onClick={onSubmit}
          className="btn-secondary"
        >
          Enviar Relatório
        </button>
      </div>
    </div>
  );
};

export default FormActions;