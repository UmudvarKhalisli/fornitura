interface WhatsAppMessageParams {
  productName: string;
  partNumber: string;
  productUrl: string;
  locale: string;
}

const messages: Record<string, (p: WhatsAppMessageParams) => string> = {
  az: ({ productName, partNumber, productUrl }) =>
    `Salam, Fornitura saytında bu ehtiyat hissəsi ilə maraqlanıram:\n\nMəhsul: ${productName}\nKod: ${partNumber}\nLink: ${productUrl}\n\nZəhmət olmasa qiymət və mövcudluq barədə məlumat verin.`,
  en: ({ productName, partNumber, productUrl }) =>
    `Hello, I am interested in this spare part from Fornitura website:\n\nProduct: ${productName}\nPart Number: ${partNumber}\nLink: ${productUrl}\n\nPlease provide information about price and availability.`,
  ru: ({ productName, partNumber, productUrl }) =>
    `Здравствуйте, меня интересует эта запчасть с сайта Fornitura:\n\nТовар: ${productName}\nКод: ${partNumber}\nСсылка: ${productUrl}\n\nПожалуйста, сообщите информацию о цене и наличии.`,
};

export function buildWhatsAppMessage(params: WhatsAppMessageParams): string {
  const builder = messages[params.locale] || messages.en;
  return encodeURIComponent(builder(params));
}

export function getWhatsAppUrl(phone: string, message: string): string {
  const clean = (phone || '994502107920').replace(/[^\d]/g, '');
  return `https://wa.me/${clean || '994502107920'}?text=${message}`;
}
