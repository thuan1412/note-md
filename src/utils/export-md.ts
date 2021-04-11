import MarkdownIt from 'markdown-it';
import wkhtmltopdf from 'wkhtmltopdf';
import fs from 'fs';

const md = MarkdownIt();
export const toPdf = (mdContent: string) => {
  const htmlContent = md.render(mdContent);
  const exportFileName = Date.now().toString() + '.pdf';
  wkhtmltopdf(htmlContent, {pageSize: 'Letter'}).pipe(
    fs.createWriteStream('./exports/' + exportFileName),
  );
  return './exports/' + exportFileName;
};
