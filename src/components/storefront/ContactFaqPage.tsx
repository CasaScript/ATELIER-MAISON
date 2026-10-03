import React, { useState } from 'react';
import { ChevronDown, Send, MessageCircle, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';

export const ContactFaqPage: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [contactSubmitted, setContactSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Question sur une commande',
    message: '',
  });

  const faqs = [
    {
      question: "Comment se déroule le paiement à la livraison (Cash on Delivery) en Tunisie ?",
      answer: "C'est l'option la plus simple et sécurisée ! Vous passez votre commande sur le site sans avoir besoin de renseigner de carte bancaire. Notre transporteur partenaire (Aramex, Yalidine ou First Delivery) vous contacte par téléphone ou SMS le jour de la livraison pour convenir de l'heure. Vous réglez directement le montant exact en espèces au livreur à la réception de votre colis."
    },
    {
      question: "Quels sont les délais d'expédition sur les 24 gouvernorats ?",
      answer: "Pour le Grand Tunis (Tunis, Ariana, Ben Arous, Manouba) ainsi que Sousse, Monastir, Sfax et Nabeul, la livraison s'effectue généralement sous 24h à 48h ouvrables. Pour les autres gouvernorats (Nord, Centre et Sud de la Tunisie), comptez 48h à 72h ouvrables."
    },
    {
      question: "Quels sont les frais de livraison et à partir de quel montant est-elle offerte ?",
      answer: "Les frais de livraison standard sont forfaitaires entre 6.00 DT et 8.00 DT selon le transporteur choisi. La livraison est 100% offerte et automatique dès que votre panier atteint 150.00 DT d'achats !"
    },
    {
      question: "Puis-je échanger un article ou demander un retour s'il ne me convient pas ?",
      answer: "Absolument. Conformément à la réglementation e-commerce et à notre engagement qualité, vous disposez d'un délai de 7 jours après réception pour demander un échange (changement de taille, teinte de cuir, etc.) ou un remboursement si l'article est dans son état neuf d'origine avec son emballage."
    },
    {
      question: "Puis-je passer commande directement par WhatsApp ou par téléphone ?",
      answer: "Oui ! Si vous préférez être conseillé de vive voix ou nous envoyer une photo de ce que vous recherchez, notre service client est joignable 7j/7 au +216 71 000 000 ou par WhatsApp direct via le bouton dédié."
    }
  ];

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: 'Question sur une commande',
        message: '',
      });
    }, 3000);
  };

  return (
    <div className="py-16 sm:py-20 bg-stone-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-900 bg-amber-100/70 px-3 py-1 rounded-full">
            Aide & Service Client Tunisie
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
            Foire Aux Questions & Contact
          </h1>
          <p className="text-stone-600 text-sm leading-relaxed">
            Une question sur votre commande, le paiement en espèces au livreur ou les délais d'expédition ? Nous sommes à votre entière disposition.
          </p>
        </div>

        {/* WhatsApp Direct Banner */}
        <div className="bg-emerald-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 bg-emerald-800 text-emerald-200 text-xs px-2.5 py-1 rounded-full font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Réponse rapide en direct</span>
            </div>
            <h3 className="text-xl font-bold font-serif">Besoin d'un conseil immédiat ou d'un suivi ?</h3>
            <p className="text-xs sm:text-sm text-emerald-200">
              Discutez en direct avec notre équipe atelier sur WhatsApp pour commander ou poser vos questions.
            </p>
          </div>

          <a
            href="https://wa.me/21671000000?text=Bonjour,%20je%20souhaite%20des%20informations%20sur%20vos%20cr%C3%A9ations%20Shopify"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-2.5 shrink-0"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Contacter par WhatsApp</span>
          </a>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">
            Questions Fréquentes sur la Livraison & le Paiement
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-stone-200 overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-stone-900 text-sm hover:text-stone-700 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-stone-500 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-stone-900' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Form & Coordinates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pt-8 border-t border-stone-200">
          <div className="md:col-span-5 space-y-6">
            <h3 className="text-xl font-serif font-bold text-stone-900">
              Coordonnées de l'Atelier
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Venez nous rendre visite au showroom ou contactez-nous par e-mail ou téléphone.
            </p>

            <div className="space-y-4 text-xs text-stone-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-stone-900 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900">Showroom & Atelier</strong>
                  <span>Avenue Habib Bourguiba, La Marsa, Tunis, Tunisie</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-stone-900 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900">Téléphone</strong>
                  <span className="font-mono">+216 71 000 000 (Lun - Sam, 9h à 19h)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-stone-900 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900">Courrier électronique</strong>
                  <span>contact@ateliermasion.tn</span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs">
            <h3 className="text-lg font-serif font-bold text-stone-900 mb-4">
              Envoyez-nous un message
            </h3>

            {contactSubmitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-900">Message envoyé avec succès !</h4>
                <p className="text-xs text-emerald-700">
                  Notre équipe vous répondra par téléphone ou e-mail sous 2h ouvrables.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitContact} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Votre Nom *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nom & Prénom"
                      className="w-full bg-stone-50 border border-stone-300 rounded-md p-2.5 focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Téléphone *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+216 XX XXX XXX"
                      className="w-full bg-stone-50 border border-stone-300 rounded-md p-2.5 font-mono focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">E-mail</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="votre.email@domaine.tn"
                    className="w-full bg-stone-50 border border-stone-300 rounded-md p-2.5 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Sujet de la demande</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-md p-2.5 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  >
                    <option value="Question sur une commande">Question sur une commande</option>
                    <option value="Suivi de livraison Aramex/Yalidine">Suivi de livraison Aramex/Yalidine</option>
                    <option value="Demande de création sur-mesure">Demande de création sur-mesure</option>
                    <option value="Échange ou retour produit">Échange ou retour produit</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Votre Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Écrivez-nous vos précisions ou questions..."
                    className="w-full bg-stone-50 border border-stone-300 rounded-md p-2.5 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-stone-900 text-white rounded-lg font-semibold hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Envoyer ma demande</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
