'use client';

import React from 'react';
import Image from 'next/image';

const FormHeader: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-sicoob-turquesa to-sicoob-verde-escuro shadow-lg mb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-center space-x-6">
          <Image
            src="/logo-sicoob.png"
            alt="Logo Sicoob"
            width={120}
            height={60}
            className="h-14 w-auto filter brightness-0 invert"
          />
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">
              Relatório de Visitas
            </h1>
            <p className="text-lg text-sicoob-verde-claro mt-2 font-medium">
              UniMais Centro Leste Paulista
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormHeader;

