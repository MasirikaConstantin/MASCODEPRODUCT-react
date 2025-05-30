import { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { 
    FaFacebook, 
    FaTwitter, 
    FaInstagram, 
    FaYoutube, 
    FaGithub 
} from "react-icons/fa";
import toast from 'react-hot-toast';

const Footer = () => {
  const [showModal, setShowModal] = useState(false);
  const { csrf } = usePage().props;
  
  // Utilisation du hook useForm d'Inertia
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
        // Vous pouvez utiliser une notification ici si nécessaire
      },
    });
  };

  return (
    <div className="">
      <footer className="bg-gradient-to-b from-base-200 to-base-100 py-16 border-t-4 border-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* À propos */}
            <div className="md:col-span-5">
              <div className="space-y-4">
                <h3 className="text-primary font-bold flex items-center">
                  <i className="bi bi-info-circle mr-2"></i> À propos
                </h3>
                <div className="text-base-content">
                  Bienvenue sur <a href="/" className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">mon-site</a> !
                  <p className="mt-2">Nous sommes une plateforme en ligne dédiée à fournir des réponses claires et précises à vos questions, quelle que soit leur domaine.</p>
                </div>
                <button 
                  className="btn btn-link text-primary hover:text-primary-focus no-underline"
                  onClick={() => setShowModal(true)}
                >
                  En savoir plus →
                </button>
              </div>
            </div>

            {/* Modal DaisyUI */}
            <dialog open={showModal} className="modal">
              <div className="modal-box max-w-2xl max-h-[90vh] overflow-y-auto bg-base-200">
                <div className="flex justify-between items-center border-b border-base-300 pb-4">
                  <h5 className="text-xl font-bold text-primary">
                    <i className="bi bi-info-circle mr-2"></i> À propos
                  </h5>
                  <button 
                    onClick={() => setShowModal(false)} 
                    className="btn btn-sm btn-circle btn-ghost"
                  >
                    ✕
                  </button>
                </div>

                <div className="mt-6 text-base-content space-y-6">
                  <div>
                    <p className="font-bold mb-2">À propos de nous : Votre guichet unique pour les questions et les réponses</p>
                    <p>Bienvenue sur <span className="text-2xl text-primary">mon-site</span> !</p>
                  </div>

                  <div>
                    <p className="font-bold mb-2">Notre mission :</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Offrir un espace ouvert et convivial où chacun peut poser des questions et obtenir des réponses de qualité.</li>
                      <li>Favoriser le partage de connaissances et l'apprentissage continu dans une variété de domaines.</li>
                      <li>Cultiver une communauté inclusive et respectueuse où chacun se sent à l'aise pour s'exprimer et apprendre.</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-bold mb-2">Ce qui nous distingue :</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><span className="font-semibold">Diversité des sujets:</span> Nous abordons un large éventail de sujets.</li>
                      <li><span className="font-semibold">Expertise des contributeurs:</span> Notre communauté regroupe des experts et des passionnés.</li>
                      <li><span className="font-semibold">Qualité des réponses:</span> Nous nous engageons à fournir des réponses claires et précises.</li>
                      <li><span className="font-semibold">Approche collaborative:</span> Nous encourageons les interactions entre utilisateurs.</li>
                    </ul>
                  </div>

                  <div>
                    <a href="/register" className="text-primary hover:text-primary-focus font-bold">Rejoignez-nous !</a>
                    <p className="mt-4">Ensemble, construisons un monde où la connaissance est accessible à tous !</p>
                  </div>
                </div>
              </div>
              {/* Backdrop click */}
              <form method="dialog" className="modal-backdrop">
                <button onClick={() => setShowModal(false)}>close</button>
              </form>
            </dialog>

            {/* Réseaux sociaux */}
            <div className="md:col-span-7">
              <div className="mt-8 pt-8 border-t-4 border-primary">
                <div className="flex flex-wrap items-center justify-between ">
                  <div className="flex gap-4 mt-4 md:mt-0 ">
                    <a href="https://www.facebook.com/mascodeproduct" className="btn btn-circle btn-ghost" title="Constantin Masirika Jr.">
                      <FaFacebook className="text-blue-500 text-xl" />
                    </a>
                    <a href="https://x.com/negroconstantin" className="btn btn-circle btn-ghost" title="Constantin Masirika Jr.">
                      <FaTwitter className="text-gray-500 text-xl" />
                    </a>
                    <a href="https://www.instagram.com/mascodeproduct/" className="btn btn-circle btn-ghost" title="Constantin Masirika Jr.">
                      <FaInstagram className="text-pink-500 text-xl" />
                    </a>
                    <a href="https://youtube.com/@masproduct360" className="btn btn-circle btn-ghost" title="Constantin Masirika Jr.">
                      <FaYoutube className="text-red-500 text-xl" />
                    </a>
                    <a href="https://github.com/MasirikaConstantin" className="btn btn-circle btn-ghost" title="Constantin Masirika Jr.">
                      <FaGithub className="text-gray-500 text-xl" />
                    </a>
                  </div>
                </div>

                {/* Formulaire de contact */}
                <div className="mt-8 ">
                  <h3 className="text-primary font-bold mb-4">Contactez-nous</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="hidden" name="_token" value={csrf} />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="label">
                          <span className="label-text">Nom</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="nom"
                          value={data.nom}
                          onChange={(e) => setData('nom', e.target.value)}
                          className="input input-bordered w-full"
                        />
                        {errors.nom && <p className="mt-1 text-sm text-error">{errors.nom}</p>}
                      </div>
                      <div>
                        <label htmlFor="email" className="label">
                          <span className="label-text">Email</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={data.email}
                          onChange={(e) => setData('email', e.target.value)}
                          className="input input-bordered w-full"
                        />
                        {errors.email && <p className="mt-1 text-sm text-error">{errors.email}</p>}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="message" className="label">
                        <span className="label-text">Message</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows="4"
                        value={data.message}
                        onChange={(e) => setData('message', e.target.value)}
                        className="textarea textarea-bordered w-full"
                      ></textarea>
                      {errors.message && <p className="mt-1 text-sm text-error">{errors.message}</p>}
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={processing}
                    >
                      {processing ? 'Envoi en cours...' : 'Envoyer'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-base-content text-center mt-6">
          &copy; 2023 - 2025 <strong>Mas Code Product </strong>Company, Inc. Tout droit réservé.
        </p>
      </footer>
    </div>
  );
};

export default Footer;