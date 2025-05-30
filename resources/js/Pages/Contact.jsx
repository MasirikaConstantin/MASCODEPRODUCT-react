import FormationsSection from '@/Components/FormationsSection';
import BaseLayout from '@/Layouts/Base';
import { useForm, usePage } from '@inertiajs/react';
import React from 'react';
import toast from 'react-hot-toast';


const ContactPage = () => {
  const { csrf } = usePage().props;
  const { data, setData, post, processing, errors, reset } = useForm({
    nom: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    post('/contact', {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Message envoyé avec succès !');

        reset();
      },
    });
  };

  return (
    <BaseLayout>
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-12">
        {/* Contact Form */}
        <div className="max-w-2xl mx-auto bg-base-200 backdrop-blur-md rounded-xl p-8 border border-white/20">
          <h2 className="text-3xl font-bold mb-8 text-center">Contactez-nous</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nom */}
            <div>
              <label htmlFor="name" className="block text-white text-sm font-medium mb-2">
                Nom
              </label>
              <input
                type="text"
                id="name"
                name="nom"
                value={data.nom}
                onChange={(e) => setData('nom', e.target.value)}

                className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                  errors.nom ? 'border-red-500' : 'border-white/20'
                } text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Votre nom"
              />
              {errors.nom && <p className="mt-2 text-red-400 text-sm">{errors.nom}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}

                className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                  errors.email ? 'border-red-500' : 'border-white/20'
                } text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="votre@email.com"
              />
              {errors.email && <p className="mt-2 text-red-400 text-sm">{errors.email}</p>}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-white text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={data.message}
                onChange={(e) => setData('message', e.target.value)}

                className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                  errors.message ? 'border-red-500' : 'border-white/20'
                } text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Votre message"
              ></textarea>
              {errors.message && <p className="mt-2 text-red-400 text-sm">{errors.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full btn btn-primary font-bold py-3 px-4 "
            >
              Envoyer
            </button>
          </form>
        </div>

        {/* Formations Section */}
        <div className="mt-16">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">Nos Formations</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Web Development Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white border border-white/20">
              <h3 className="text-2xl font-bold mb-4">Développement Web</h3>
              <p className="mb-4">
                Formation complète en développement web. Apprenez HTML, CSS, JavaScript et les frameworks modernes pour créer des sites web responsifs et dynamiques.
              </p>
              <div className="flex items-center text-sm">
                <span className="bg-blue-500 px-3 py-1 rounded-full">6 mois</span>
              </div>
            </div>

            {/* Mobile Development Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white border border-white/20">
              <h3 className="text-2xl font-bold mb-4">Développement Mobile</h3>
              <p className="mb-4">
                Devenez expert en développement d'applications mobiles. Maîtrisez React Native et Flutter pour créer des apps iOS et Android.
              </p>
              <div className="flex items-center text-sm">
                <span className="bg-blue-500 px-3 py-1 rounded-full">4 mois</span>
              </div>
            </div>

            {/* AI Development Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white border border-white/20">
              <h3 className="text-2xl font-bold mb-4">Intelligence Artificielle</h3>
              <p className="mb-4">
                Plongez dans le monde de l'IA et du Machine Learning. Découvrez les algorithmes et les outils pour créer des solutions intelligentes.
              </p>
              <div className="flex items-center text-sm">
                <span className="bg-blue-500 px-3 py-1 rounded-full">8 mois</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FormationsSection></FormationsSection>
    </div>
    </BaseLayout>
  );
};

export default ContactPage;