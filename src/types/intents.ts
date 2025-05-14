
import blagues from './blagues.json';
import { getWeatherReport } from '../services/weather';

export const intents = [
  // Salutations
  {
    pattern: /bonjour|salut|hello/i,
    responses: [
      "Bonjour ! Comment puis-je vous aider ?",
    ],
  },

  // Questions générales
  {
    pattern: /comment ça va|ça va/i,
    responses: [
      "Je vais très bien, merci ! Et vous ?",
      "Je fonctionne parfaitement. Et vous, tout va bien ?",
      "Je suis juste un programme, mais je vais bien, merci de demander !",
    ],
  },
  {
    pattern: /qui es-tu|tu es qui|c'est quoi/i,
    responses: [
      "Je suis Hmax, votre assistante virtuelle personnelle.",
      "Je suis une IA créée pour vous aider dans vos tâches quotidiennes.",
      "Je m'appelle Hmax, un assistant conçu pour répondre à vos besoins.",
    ],
  },

  // Demandes d'aide
  {
    pattern: /aide|aider|besoin d'aide/i,
    responses: [
      "Bien sûr, je suis là pour vous aider. Quelle est votre question ?",
      "Je suis votre assistante virtuelle, demandez-moi ce que vous voulez.",
      "N'hésitez pas à poser une question ou demander un service, je suis prête à vous aider !",
    ],
  },
  
  // Blagues
  {
    pattern: /blague|fais-moi rire/i,
    responses: [
      () => {
        const randomIndex = Math.floor(Math.random() * blagues.blagues.length);
        return blagues.blagues[randomIndex];
      },
    ],
  },

  // Météo
  {
    pattern: /météo|temps|meteo/i,
    responses: [
      async () => await getWeatherReport(),
    ],
  },
  
  

  // Développement et apprentissage
  {
    pattern: /apprentissage|code|développement/i,
    responses: [
      "Apprendre le code est une excellente idée ! En quoi puis-je vous assister ?",
      "Le développement est fascinant. Voulez-vous que je partage des conseils ou des ressources ?",
      "Vous avez une question sur la programmation ? Je suis prête à aider.",
    ],
  },

  // Gratitude
  {
    pattern: /merci|thanks|thx/i,
    responses: [
      "Avec plaisir ! Si vous avez d'autres questions, je suis là.",
      "Je suis contente d'avoir pu vous aider !",
      "Pas de quoi ! Revenez me voir si vous avez besoin de quelque chose.",
    ],
  },

  // remerciements
  {
    pattern: /au revoir|bye|bye-bye/i,
    responses: [
      "Au revoir ! Passez une excellente journée !",
      "Bye-bye ! À bientôt !",
      "À la prochaine ! Merci de votre visite !",
    ],
  },

  // ok
  {
    pattern: /ok|d'accord|compris/i,
    responses: [
      "Parfait ! N'hésitez pas si vous avez besoin de plus d'informations.",
      "D'accord ! Je suis là si vous avez des questions supplémentaires.",
      "Compris ! Je suis prête à vous aider davantage.",
    ],
  },

  // Qui est Hassy ?
  {
    pattern: /qui est hassy|hassy/i,
    responses: [
      "Hassy est un développeur web spécialisé en back-end, avec Ruby on Rails, et je suis l'un de ses projets de développement personnel en IA. Plus d'informations ? Visitez son portfolio !",
    ],
  },

  // Qui est Hmax ?
  {
    pattern: /qui est Hmax|Hmax/i,
    responses: [
      "Je suis une assistante virtuelle personnelle (en phase de développement), conçue pour vous aider dans vos tâches quotidiennes.",
    ],
  },

  // Heure actuelle
  {
    pattern: /quelle heure est-il|heure|horloge/i,
    responses: [
      () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        return ` heure Mada, Il est ${hours}h${minutes < 10 ? '0' : ''}${minutes}.`;
      },
    ],
  },

  // manahoana
  {
    pattern: /manahoana/i,
    responses: [
      "Manahoana ! Inona no vaovao ?",
    ],
  },

  // kaiz
  {
    pattern: /kaiz/i,
    responses: [
      "Kaiza kaiz! Inona no vaovao ?",
    ],
  },

  // musique
  {
    pattern: /recommande-moi une chanson|musique/i,
    responses: [
      () => {
        const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
        const now = new Date();
        const dayOfWeek = days[now.getDay()];
        return `en ce ${dayOfWeek} 'enemy' d'imagine dragon est une excelante choix .`;
      }
    ],
  },

  // Date actuelle
  {
    pattern: /quelle date est-il|date/i,
    responses: [
      () => {
        const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
        const now = new Date();
        const day = now.getDate();
        const months = [
          'janvier', 'février', 'mars', 'avril', 'mai', 'juin', 
          'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
        ];
        const dayOfWeek = days[now.getDay()]; // Utiliser le tableau pour obtenir le nom du jour
        const month = months[now.getMonth()]; // Utiliser le tableau pour obtenir le nom du mois
        const year = now.getFullYear();
        return `Nous sommes le ${dayOfWeek} ${day} ${month} ${year}.`;
      },
    ],
  },

  {
    pattern: /.*/, // Capture tout texte
    responses: [
      (input: any) => `Je ne peut pas repondre a "${input}", mais dans une version complète, je serais connectée à une vraie API d'IA, et je pourrais vous aider davantage.`,
    ],
  },
];
