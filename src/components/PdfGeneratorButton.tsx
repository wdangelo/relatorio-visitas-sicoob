import React, { useState } from 'react';
import { FormData } from '@/types';

interface PdfGeneratorButtonProps {
  formData: FormData;
}

const PdfGeneratorButton: React.FC<PdfGeneratorButtonProps> = ({ formData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePDF = async () => {
    setLoading(true);
    setError(null);
    try {
      // Importa a função generatePDF dinamicamente
      const { generatePDF } = await import(
        /* webpackChunkName: "pdf-generator" */
        '../lib/pdfGenerator'
      );
      await generatePDF(formData);
    } catch (err) {
      console.error("Erro ao gerar PDF:", err);
      setError("Erro ao gerar PDF. Verifique o console para mais detalhes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={handleGeneratePDF}
        disabled={loading}
        className="btn-primary"
      >
        {loading ? (
          <span className="flex items-center">
            <div className="loading-spinner mr-2"></div>
            Gerando PDF...
          </span>
        ) : (
          "📄 Gerar PDF"
        )}
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default PdfGeneratorButton;


