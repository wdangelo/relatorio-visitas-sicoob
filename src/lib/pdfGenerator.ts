// Gerador de PDF para o relatório de visitas
import { FormData } from "@/types";

// Importar jsPDF dinamicamente para garantir que seja carregado apenas no cliente
// e evitar problemas de SSR (Server-Side Rendering)
const importJsPDF = async () => {
  if (typeof window !== "undefined") { // Garante que o código só rode no lado do cliente
    const jspdfModule = await import("jspdf");
    // Tenta importar como named export 'jsPDF' ou como default
    // Alguns ambientes podem ter o jsPDF como propriedade do módulo importado
    return (jspdfModule as any).jsPDF || jspdfModule.default || jspdfModule;
  }
  return null; // Retorna null se não estiver no lado do cliente
};


export const generatePDF = async (formData: FormData): Promise<void> => {
  const JsPDF = await importJsPDF();

  if (!JsPDF) {
    console.error("jsPDF não pode ser carregado no ambiente atual (provavelmente SSR).");
    return;
  }

  const pdf = new JsPDF();
  
  let yPosition = 20;
  const pageHeight = pdf.internal.pageSize.height;
  const margin = 20;
  const lineHeight = 7;

  // Cores Sicoob (RGB)
  const sicoobColors = {
    turquesa: [0, 160, 145],      // #00AE9D - Cor principal
    verdeEscuro: [0, 54, 65],     // #003641 - Cor principal
    verdeClaro: [201, 210, 0],    // #C9D200 - Cor de apoio
    verdeMedio: [125, 182, 28],   // #7DB61C - Cor de apoio
    roxo: [73, 71, 157],          // #49479D - Cor de apoio
    branco: [255, 255, 255],      // #FFFFFF
    cinzaTexto: [64, 64, 64]      // Para textos
  };

  // Função para adicionar nova página se necessário
  const checkPageBreak = (requiredSpace: number = 20) => {
    if (yPosition + requiredSpace > pageHeight - margin) {
      pdf.addPage();
      yPosition = 20;
    }
  };

  // Cabeçalho com estilo Sicoob
  // Faixa turquesa no topo
  pdf.setFillColor(...sicoobColors.turquesa);
  pdf.rect(0, 0, pdf.internal.pageSize.width, 15, 'F');
  
  // Título principal em branco sobre a faixa turquesa
  pdf.setTextColor(...sicoobColors.branco);
  pdf.setFontSize(16);
  pdf.setFont("helvetica", "bold");
  pdf.text("RELATÓRIO DE VISITAS", margin, 10);
  
  // Logo/Marca Sicoob (texto estilizado)
  pdf.setTextColor(...sicoobColors.verdeEscuro);
  pdf.setFontSize(14);
  pdf.setFont("helvetica", "bold");
  pdf.text("SICOOB", pdf.internal.pageSize.width - 40, 10);
  
  yPosition = 25;
  
  // Data de geração
  pdf.setTextColor(...sicoobColors.cinzaTexto);
  pdf.setFontSize(9);
  pdf.setFont("helvetica", "normal");
  pdf.text(`Gerado em: ${new Date().toLocaleString("pt-BR")}`, margin, yPosition);
  yPosition += 15;

  // Função para adicionar seção com estilo Sicoob
  const addSection = (title: string) => {
    checkPageBreak(20);
    
    // Fundo verde claro para o título da seção
    pdf.setFillColor(...sicoobColors.verdeEscuro);
    pdf.rect(margin - 5, yPosition - 5, 180, 12, 'F');
    
    // Título da seção em verde escuro
    pdf.setTextColor(...sicoobColors.branco);
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.text(title, margin, yPosition + 2);
    yPosition += 15;
    
    // Resetar cor do texto para o padrão
    pdf.setTextColor(...sicoobColors.cinzaTexto);
    pdf.setFontSize(9);
    pdf.setFont("helvetica", "normal");
  };

  // Função para adicionar campo com estilo Sicoob
  const addField = (label: string, value: string) => {
    checkPageBreak();
    
    // Label em verde médio e negrito
    pdf.setTextColor(...sicoobColors.verdeEscuro);
    pdf.setFont("helvetica", "bold");
    const labelText = `${label}:`;
    pdf.text(labelText, margin, yPosition);
    
    // Valor em cinza normal
    pdf.setTextColor(...sicoobColors.cinzaTexto);
    pdf.setFont("helvetica", "normal");
    const valueText = value || "Não informado";
    const labelWidth = pdf.getTextWidth(labelText) + 3;
    
    const lines = pdf.splitTextToSize(valueText, 170 - labelWidth);
    pdf.text(lines, margin + labelWidth, yPosition);
    yPosition += Math.max(lines.length * lineHeight, lineHeight);
  };

  // Função para adicionar imagens com estilo Sicoob
  const addImages = async (title: string, files: File[]) => {
    if (files.length > 0) {
      addSection(title);
      for (const file of files) {
        checkPageBreak(80); // Espaço para a imagem e título

        const reader = new FileReader();
        reader.readAsDataURL(file);

        await new Promise<void>((resolve) => {
          reader.onload = (e) => {
            const imgData = e.target?.result as string;
            const imgWidth = 60;
            const imgHeight = 60;
            
            // Borda turquesa ao redor da imagem
            pdf.setDrawColor(...sicoobColors.turquesa);
            pdf.setLineWidth(1);
            pdf.rect(margin - 1, yPosition - 1, imgWidth + 2, imgHeight + 2);
            
            pdf.addImage(imgData, "JPEG", margin, yPosition, imgWidth, imgHeight);
            yPosition += imgHeight + 8; // Espaço após a imagem
            resolve();
          };
        });
      }
      yPosition += 10;
    }
  };

  // 1. Informações do Cooperado

  addSection("1. Informações do Colaborador")
  addField("Nome", formData.nome)
  addField("Cargo", formData.cargo)
  addField("E-mail", formData.email)


  addSection("2. INFORMAÇÕES DO COOPERADO");
  
  addField("É Cooperado", formData.eCooperado);
  addField("CPF/CNPJ", formData.cpfCnpj);
  addField("PA", formData.pa);
  addField("Gerente de Relacionamento", formData.gerenteRelacionamento);
  addField("Nome/Razão Social", formData.nomeRazaoSocial);
  addField("CEP", formData.cep);
  addField("Logradouro", formData.logradouro);
  addField("Número", formData.numero);
  addField("Complemento", formData.complemento);
  addField("Bairro", formData.bairro);
  addField("UF", formData.uf);
  addField("Município", formData.municipio);
  addField("Data Nascimento/Constituição", formData.dataNascimentoConstituicao);
  addField("Renda/Faturamento", formData.rendaFaturamento);
  addField("Aplicações", formData.aplicacoes);
  addField("Capital Social", formData.capitalSocial);
  addField("Telefone", formData.telefone);
  addField("Site", formData.site);
  addField("Forma de Gestão", formData.formaGestao);
  addField("Patrimônio", formData.patrimonio);
  addField("Tipo de Imóvel", formData.tipoImovel);
  addField("Alteração de Sócios", formData.alteracaoSocios);
  
  if (formData.alteracaoSocios === "Sim") {
    addField("Descrição da Alteração", formData.descricaoAlteracaoSocios);
  }

  yPosition += 10;

  // 2. Informações Bancárias
  addSection("3. INFORMAÇÕES BANCÁRIAS");
  
  if (formData.bancos.length > 0) {
    formData.bancos.forEach((banco, index) => {
      checkPageBreak(25);
      pdf.setFont(undefined, "bold");
      pdf.text(`Banco ${index + 1}:`, margin, yPosition);
      yPosition += lineHeight;
      pdf.setFont(undefined, "normal");
      
      addField("  Nome do Banco", banco.banco);
      addField("  Responsabilidade Total", banco.responsabilidadeTotal);
      
      const servicos = [];
      if (banco.previdencia) servicos.push("Previdência");
      if (banco.aplicacoes) servicos.push("Aplicações");
      if (banco.cobranca) servicos.push("Cobrança");
      if (banco.seguros) servicos.push("Seguros");
      
      addField("  Serviços", servicos.join(", ") || "Nenhum");
      yPosition += 5;
    });
  } else {
    addField("Bancos", "Nenhum banco informado");
  }

  yPosition += 10;

  // 3. Informações da Visita
  addSection("4. INFORMAÇÕES DA VISITA");
  
  addField("Data da Visita", formData.dataVisita);
  addField("Objetivo da Visita", formData.objetivoVisita);
  addField("A visita é no endereço cadastrado", formData.visitaEnderecoRegistrado);
  
  if (formData.visitaEnderecoRegistrado === "Não") {
    addField("Endereço da Visita", formData.enderecoVisita);
  }
  
  addField("Atividades Exercidas", formData.atividadesExercidas);
  addField("Número de Funcionários", formData.numeroFuncionarios);
  addField("Estado Físico/Visual da Empresa", formData.estadoFisicoVisual);

  // Participantes
  if (formData.participantes.length > 0) {
    checkPageBreak(15);
    pdf.setFont(undefined, "bold");
    pdf.text("Participantes da Visita:", margin, yPosition);
    yPosition += lineHeight;
    pdf.setFont(undefined, "normal");
    
    formData.participantes.forEach((participante, index) => {
      addField(`  ${index + 1}`, participante);
    });
  }

  yPosition += 10;

  // 4. Fotos e Anexos
  await addImages("4.1. Fotos da Fachada", formData.fotosFachada);
  await addImages("4.2. Fotos do Interior", formData.fotosInterior);
  await addImages("4.3. Fotos do Estoque", formData.fotosEstoque);
  await addImages("4.4. Outras Fotos", formData.fotosOutros);
  
  if (formData.observacoes) {
    yPosition += 5;
    addField("Observações", formData.observacoes);
  }

  // Rodapé com estilo Sicoob
  const totalPages = pdf.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    
    // Linha turquesa no rodapé
    pdf.setDrawColor(...sicoobColors.turquesa);
    pdf.setLineWidth(0.5);
    pdf.line(margin, pageHeight - 15, pdf.internal.pageSize.width - margin, pageHeight - 15);
    
    // Texto do rodapé
    pdf.setTextColor(...sicoobColors.verdeEscuro);
    pdf.setFontSize(8);
    pdf.setFont("helvetica", "normal");
    pdf.text(
      `Página ${i} de ${totalPages}`,
      margin,
      pageHeight - 8
    );
    
    pdf.text(
      "Relatório de Visitas Sicoob",
      pdf.internal.pageSize.width - 60,
      pageHeight - 8
    );
  }

  // Salvar o PDF
  const fileName = `relatorio-visita-${formData.nomeRazaoSocial || "cooperado"}-${new Date().toISOString().split("T")[0]}.pdf`;
  pdf.save(fileName);
};

