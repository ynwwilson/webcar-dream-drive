// WebCar — informações de contato
// Fonte única de verdade. Dados extraídos do site real webcarmg.com.br

export const CONTACT = {
  // Identidade
  name: "WebCar Veículos",
  city: "Patos de Minas",
  state: "MG",
  founded: 2014, // placeholder — confirmar com dono
  description:
    "Webcar Veículos é referência em credibilidade e qualidade no mercado de veículos. Com uma história pautada na transparência e no compromisso com a satisfação dos clientes, oferecemos um atendimento diferenciado e uma seleção rigorosa de automóveis.",

  // Endereço
  address: {
    street: "Praça Alexina Cândida Conceição, 5",
    neighborhood: "Centro",
    city: "Patos de Minas",
    state: "MG",
    zip: "38700-022",
    full: "Praça Alexina Cândida Conceição, 5 — Centro — Patos de Minas/MG — CEP 38700-022",
    short: "Praça Alexina Cândida Conceição, 5 — Centro",
  },

  // Contato
  phone: {
    raw: "5534381411 44".replace(" ", ""), // 553438141144
    display: "(34) 3814-1144",
    e164: "+55 34 3814-1144",
  },
  email: "webcarveiculosmg@gmail.com",

  // WhatsApp
  whatsapp: {
    raw: "553438141144",
    display: "(34) 3814-1144",
    baseUrl: "https://api.whatsapp.com/send?phone=553438141144",
    defaultText: "Olá, vim pelo site da WebCar",
  },

  // Redes sociais
  social: {
    instagram: {
      url: "https://www.instagram.com/webcarmg",
      handle: "@webcarmg",
    },
    facebook: {
      url: "https://www.facebook.com/webcamg",
      handle: "facebook.com/webcamg",
    },
  },

  // Horário (placeholder padrão — confirmar com dono)
  hours: {
    weekdays: "Segunda a Sexta · 8h às 18h",
    saturday: "Sábado · 8h às 13h",
    sunday: "Domingo · Fechado",
    short: "Seg–Sex 8h às 18h · Sáb 8h às 13h",
  },

  // Google Maps embed (usa o endereço real)
  mapsEmbed:
    "https://www.google.com/maps?q=Pra%C3%A7a+Alexina+C%C3%A2ndida+Concei%C3%A7%C3%A3o+5+Centro+Patos+de+Minas+MG&output=embed",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=Pra%C3%A7a+Alexina+C%C3%A2ndida+Concei%C3%A7%C3%A3o+5+Patos+de+Minas+MG",
};

// Helper pra montar link de WhatsApp com mensagem custom
export const waLink = (text?: string): string => {
  const message = text || CONTACT.whatsapp.defaultText;
  return `${CONTACT.whatsapp.baseUrl}&text=${encodeURIComponent(message)}`;
};
