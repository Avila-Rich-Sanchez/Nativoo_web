// Use the international phone number without a plus sign, spaces, or dashes.
const NATIVO_WHATSAPP_NUMBER = '';
const whatsappMessage = 'Hola, quiero hacer un pedido en NATIVOO. ¿Me ayudan a coordinarlo?';
const whatsappPhone = NATIVO_WHATSAPP_NUMBER.replace(/\D/g, '');
const whatsappQuery = new URLSearchParams({ text: whatsappMessage });
const whatsappUrl = whatsappPhone
    ? `https://wa.me/${whatsappPhone}?${whatsappQuery}`
    : `https://wa.me/?${whatsappQuery}`;

document.querySelectorAll('[data-whatsapp-link]').forEach((link) => {
    link.href = whatsappUrl;
});