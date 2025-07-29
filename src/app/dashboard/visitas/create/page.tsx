'use client';

import React, { useEffect, useState } from 'react';
import  FormSection  from '@/components/FormSection';
import  InformacoesCooperado  from '@/components/sections/InformacoesCooperado';
import InformacoesBancarias  from '@/components/sections/InformacoesBancarias';
import InformacoesVisita from '@/components/sections/InformacoesVisita';
import FotosAnexos from '@/components/sections/FotosAnexos';
import  FormActions  from '@/components/FormActions';
import MessageContainer from '@/components/ui/MessageContainer';
import { useFormData } from '@/hooks/useFormData';
import { useMessages } from '@/hooks/useMessages';
import { useValidation } from '@/hooks/useValidation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserInfo } from '@/components/ui/UserInfo';
import { DashboardLayout } from '@/components/layout/DashboardLayout';


export default function CreateVisita () {
      const {
        formData,
        updateField,
        updateNestedField,
        addBanco,
        removeBanco,
        addParticipante,
        removeParticipante,
        resetForm,
        loadFromStorage,
        saveToStorage
      } = useFormData();
    
      const {
        messages,
        removeMessage,
        showSuccess,
        showError,
        showWarning,
        showInfo
      } = useMessages();
    
      const { validateForm, validateField } = useValidation();
    
      const [errors, setErrors] = useState<Record<string, string>>({});
      const [isLoading, setIsLoading] = useState(false);
    
      // Carregar rascunho ao inicializar
      useEffect(() => {
        const loaded = loadFromStorage();
        if (loaded) {
          showInfo('Rascunho carregado automaticamente');
        }
      }, [loadFromStorage, showInfo]);
    
      // Auto-salvar a cada 2 minutos
      useEffect(() => {
        const interval = setInterval(() => {
          if (Object.keys(formData).some(key => formData[key as keyof typeof formData])) {
            saveToStorage();
            showInfo('Rascunho salvo automaticamente');
          }
        }, 120000); // 2 minutos
    
        return () => clearInterval(interval);
      }, [formData, saveToStorage, showInfo]);
    
      const handleSaveDraft = () => {
        const success = saveToStorage();
        if (success) {
          showSuccess('Rascunho salvo com sucesso!');
        } else {
          showError('Erro ao salvar rascunho');
        }
      };
    
      const handleSubmit = async () => {
        // Validar formulário
        const validationErrors = validateForm(formData);
        
        if (validationErrors.length > 0) {
          const errorMap: Record<string, string> = {};
          validationErrors.forEach(error => {
            errorMap[error.field] = error.message;
          });
          setErrors(errorMap);
          
          showError(`Existem ${validationErrors.length} campo(s) que precisam ser corrigidos antes de enviar o relatório`);
          return;
        }
    
        setErrors({});
        setIsLoading(true);
    
        try {
          // Simular envio (em produção seria uma chamada para API)
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          showSuccess('Relatório enviado com sucesso!');
          
          // Limpar formulário e rascunho
          resetForm();
          localStorage.removeItem('sicoob-form-draft');
          
        } catch (error) {
          showError('Erro ao enviar relatório. Tente novamente.');
        } finally {
          setIsLoading(false);
        }
      };
    
      const handleFieldValidation = (field: keyof typeof formData, value: any ) => {
        const error = validateField(field, value, formData);
        setErrors(prev => ({
          ...prev,
          [field]: error || ''
        }));
      };
return (
  <ProtectedRoute>
    <DashboardLayout 
      title="Visitas"
      subtitle="Criação de Relatório de Visitas"
    >
    <div className="min-h-screen ">
      
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">

          <FormSection  title="1. Informações do Colaborador">
            <UserInfo 
              fields={['nome', 'cargo', 'email']} 
              formData={formData}
              updateField={updateField}
            />

          </FormSection>
          {/* 1. Informações do Cooperado */}
          <FormSection title="2. Informações do Cooperado">
            
            <InformacoesCooperado
              formData={formData}
              updateField={(field, value) => {
                updateField(field, value);
                handleFieldValidation(field, value);
              }}
              errors={errors}
            />
          </FormSection>

          {/* 2. Informações Bancárias */}
          <FormSection title="2. Informações Bancárias">
            <InformacoesBancarias
              formData={formData}
              updateField={updateField}
              updateNestedField={updateNestedField}
              addBanco={addBanco}
              removeBanco={removeBanco}
              errors={errors}
            />
          </FormSection>

          {/* 3. Informações da Visita */}
          <FormSection title="3. Informações da Visita">
            <InformacoesVisita
              formData={formData}
              updateField={(field, value) => {
                updateField(field, value);
                handleFieldValidation(field, value);
              }}
              addParticipante={addParticipante}
              removeParticipante={removeParticipante}
              errors={errors}
            />
          </FormSection>

          {/* 4. Fotos e Anexos */}
          <FormSection title="4. Fotos e Anexos">
            <FotosAnexos
              formData={formData}
              updateField={(field, value) => {
                updateField(field, value);
                handleFieldValidation(field, value);
              }}
              errors={errors}
            />
          </FormSection>

          {/* Botões de Ação */}
          <FormActions
            formData={formData}
            onSaveDraft={handleSaveDraft}
            onSubmit={handleSubmit}
          />
        </form>
      </div>

      {/* Container de Mensagens */}
      <MessageContainer
        messages={messages}
        onRemoveMessage={removeMessage}
      />
    </div>
    </DashboardLayout>
    </ProtectedRoute>
  );
}

