import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export async function extractTextFromFile(file) {
    const extension = file.name.split('.').pop().toLowerCase();
    const mime = file.type;

    const isPdf = extension === 'pdf' || mime === 'application/pdf';
    const isDocx = extension === 'docx' || mime === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

    try {
        if (isPdf) {
            return await extractTextFromPDF(file);
        } else if (isDocx) {
            return await extractTextFromDocx(file);
        } else {
            return 'Formato de arquivo não suportado.';
        }
    } catch (error) {
        console.error('Erro ao extrair texto:', error);
        return 'Ocorreu um erro ao ler o arquivo.';
    }
}

async function extractTextFromPDF(file) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let text = '';

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map((item) => item.str).join(' ');
        text += pageText + '\n';
    }

    return text.replace(/\s+/g, ' ').trim();
}

async function extractTextFromDocx(file) {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value.replace(/\s+/g, ' ').trim();
}
