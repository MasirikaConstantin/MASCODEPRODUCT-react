import React, { useState } from 'react';

const FormationsSection = ({ showViewAllButton = true }) => {
  const [openModal, setOpenModal] = useState(null);

  const closeModal = () => setOpenModal(null);

const formations = [
    {
        id: 'mobile',
        title: 'Développement Mobile',
        description: 'iOS, Android, Cross-platform',
        icon: (
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
            </svg>
        ),
        badges: [
            { text: 'Flutter', color: 'badge-info' },
            { text: 'React Native', color: 'badge-warning' },
            { text: 'Swift', color: 'badge-secondary' }
        ]
    },
    {
        id: 'web',
        title: 'Développement Web',
        description: 'Frontend, Backend, Full-Stack',
        icon: (
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
        ),
        badges: [
            { text: 'HTML/CSS', color: 'badge-info' },
            { text: 'JavaScript', color: 'badge-warning' },
            { text: 'PHP', color: 'badge-secondary' }
        ]
    },
    {
        id: 'ia',
        title: 'IA & Machine Learning',
        description: 'Deep Learning, Data Science',
        icon: (
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
        ),
        badges: [
            { text: 'Python', color: 'badge-info' },
            { text: 'TensorFlow', color: 'badge-success' },
            { text: 'PyTorch', color: 'badge-warning' }
        ]
    },
    {
        id: 'cyber',
        title: 'Cybersécurité',
        description: 'Sécurité Web, Ethical Hacking',
        icon: (
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
        ),
        badges: [
            { text: 'Pentesting', color: 'badge-error' },
            { text: 'Cryptographie', color: 'badge-secondary' },
            { text: 'Forensics', color: 'badge-success' }
        ]
    },
    {
        id: 'cloud',
        title: 'Cloud Computing',
        description: 'AWS, Azure, Google Cloud',
        icon: (
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/>
            </svg>
        ),
        badges: [
            { text: 'AWS', color: 'badge-warning' },
            { text: 'Docker', color: 'badge-info' },
            { text: 'Kubernetes', color: 'badge-success' }
        ]
    },
    {
        id: 'blockchain',
        title: 'Blockchain',
        description: 'Web3, Smart Contracts',
        icon: (
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
            </svg>
        ),
        badges: [
            { text: 'Ethereum', color: 'badge-secondary' },
            { text: 'Solidity', color: 'badge-warning' },
            { text: 'Web3.js', color: 'badge-info' }
        ]
    }
];

  const CheckIcon = () => (
    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
    </svg>
  );

  const CalendarIcon = () => (
    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
      <path d="M3 3h18v2H3V3zm17 3V5h2v2h-2zm-5 0V5h2v2h-2zM8 5H6v2h2V5zm2 0v2h2V5h-2zm2 4H5v12h14V9h-7zM5 9H3v12h18V9h-2v10H5V9zm2 5h3v2H7v-2zm0 3h3v2H7v-2zm0-6h3v2H7v-2zm5 3h3v2h-3v-2zm0 3h3v2h-3v-2zm5-6h3v2h-3v-2zm0 3h3v2h-3v-2z"/>
    </svg>
  );

  const renderModal = (formationId) => {
    if(formationId === 'mobile'){
        return(
            <div className="modal modal-open">
            <div className="modal-box max-w-2xl">
              {/* Modal Header */}
              <div className="flex justify-between items-center pb-4 border-b">
                <h3 className="text-xl font-bold">Formation Développement Mobile</h3>
                <button className="btn btn-sm btn-circle" onClick={closeModal}>✕</button>
              </div>
          
              {/* Modal Content */}
              <div className="space-y-6 py-4">
                {/* Introduction */}
                <div className="bg-base-200 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2">Créez des Applications Mobiles Professionnelles</h4>
                  <p>
                    Plongez dans l'univers du développement mobile et maîtrisez les technologies les plus demandées du marché pour créer des applications iOS et Android performantes.
                  </p>
                </div>
          
                {/* Technologies Grid */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-base-200 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <span className="font-semibold">Flutter</span>
                    </div>
                    <p className="text-sm">Framework Google pour des applications multiplateformes élégantes et performantes</p>
                  </div>
                  
                  <div className="bg-base-200 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <span className="font-semibold">React Native</span>
                    </div>
                    <p className="text-sm">Développez des applications natives avec JavaScript et React</p>
                  </div>
          
                  <div className="bg-base-200 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <span className="font-semibold">Swift</span>
                    </div>
                    <p className="text-sm">Langage officiel Apple pour des applications iOS professionnelles</p>
                  </div>
                </div>
          
                {/* Programme d'apprentissage */}
                <div>
                  <h4 className="text-lg font-semibold mb-4">Ce Que Vous Apprendrez</h4>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium mb-2">Développement Multiplateforme</h5>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                          </svg>
                          <span className="text-sm">Architecture des applications mobiles</span>
                        </li>
                        <li className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                          </svg>
                          <span className="text-sm">Interfaces utilisateur réactives</span>
                        </li>
                        <li className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                          </svg>
                          <span className="text-sm">Gestion d'état et performance</span>
                        </li>
                      </ul>
                    </div>
          
                    <div>
                      <h5 className="font-medium mb-2">Fonctionnalités Avancées</h5>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                          </svg>
                          <span className="text-sm">Intégration API et bases de données</span>
                        </li>
                        <li className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                          </svg>
                          <span className="text-sm">Authentification et sécurité</span>
                        </li>
                        <li className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                          </svg>
                          <span className="text-sm">Publication sur les stores</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
          
                {/* Avantages */}
                <div className="bg-base-200 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold mb-3">Les + de la Formation</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                      </svg>
                      <span>Projets Concrets</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                      </svg>
                      <span>Code Review</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                      </svg>
                      <span>Support Continu</span>
                    </div>
                  </div>
                </div>
          
                {/* CTA */}
                <div className="text-center">
                  <button className="btn btn-primary relative">
                    Réserver Ma Place
                    <span className="absolute -top-2 -right-2 badge badge-success">En cours</span>
                  </button>
                  <p className="mt-2 text-sm">Formation en petit groupe - 18 personnes max.</p>
                </div>
              </div>
            </div>
          </div>
        )
    }
    if (formationId === 'web') {
        return (
            <div className="modal modal-open">
            <div className="modal-box max-w-2xl">
              {/* Modal Header */}
              <div className="flex justify-between items-center pb-4 border-b">
                <h3 className="text-xl font-bold">Formation Développement Web</h3>
                <button className="btn btn-sm btn-circle"onClick={closeModal} >✕</button>
              </div>
          
              {/* Modal Content */}
              <div className="space-y-6 py-4">
                {/* Introduction */}
                <div className="bg-base-200 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2">Devenez un Développeur Web Complet</h4>
                  <p>
                    Lancez votre carrière dans le développement web avec notre formation complète qui couvre tous les aspects essentiels du développement moderne.
                  </p>
                </div>
          
                {/* Programme */}
                <div>
                  <h4 className="text-lg font-semibold mb-3">Notre Programme Complet</h4>
                  
                  {/* Frontend */}
                  <div className="mb-6">
                    <h5 className="font-medium mb-2">Frontend Development</h5>
                    <p className="mb-2">Maîtrisez la création d'interfaces web modernes avec :</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>HTML5 & CSS3 - Les fondations de tout site web moderne</li>
                      <li>JavaScript - Rendez vos sites interactifs et dynamiques</li>
                      <li>Frameworks modernes et responsive design</li>
                    </ul>
                  </div>
          
                  {/* Backend */}
                  <div className="mb-6">
                    <h5 className="font-medium mb-2">Backend Development</h5>
                    <p className="mb-2">Développez des applications web robustes avec :</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>PHP - Le langage serveur le plus utilisé au monde</li>
                      <li>Bases de données et API REST</li>
                      <li>Sécurité et performance des applications</li>
                    </ul>
                  </div>
                </div>
          
                {/* Avantages */}
                <div className="bg-base-200 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold mb-3">Pourquoi Choisir Notre Formation ?</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                      </svg>
                      <span>Projets pratiques réels avec des cas concrets du marché</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                      </svg>
                      <span>Suivi personnalisé avec des experts du secteur</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                      </svg>
                      <span>Certification professionnelle reconnue par l'industrie</span>
                    </li>
                  </ul>
                </div>
          
                {/* CTA */}
                <div className="text-center pt-4">
                  <button className="btn btn-primary relative px-8 py-3">
                    Commencer Votre Formation
                    <span className="absolute -top-2 -right-2 badge badge-success">En cours</span>
                  </button>
                  <p className="mt-3 text-sm text-base-content/70">
                    Places limitées - Prochaine session commence le 15 septembre 2023
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
    }
    if (formationId === 'ia') {
      return (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-info">
                Formation Intelligence Artificielle & Machine Learning
              </h3>
              <button className="btn btn-sm btn-circle btn-ghost" onClick={closeModal}>
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="card bg-base-200">
                <div className="card-body">
                  <h4 className="card-title">Entrez dans l'Ère de l'Intelligence Artificielle</h4>
                  <p>Découvrez les fondements et applications avancées de l'IA et du Machine Learning. Une formation complète pour maîtriser les technologies qui façonnent l'avenir.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="card bg-base-300">
                  <div className="card-body">
                    <h4 className="card-title text-info">Fondamentaux</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <CheckIcon />
                        <span className="text-sm">Python pour Data Science</span>
                      </div>
                      <div className="flex items-center">
                        <CheckIcon />
                        <span className="text-sm">Statistiques & Probabilités</span>
                      </div>
                      <div className="flex items-center">
                        <CheckIcon />
                        <span className="text-sm">Algèbre linéaire</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card bg-base-300">
                  <div className="card-body">
                    <h4 className="card-title text-success">Technologies Avancées</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <CheckIcon />
                        <span className="text-sm">Deep Learning avec TensorFlow</span>
                      </div>
                      <div className="flex items-center">
                        <CheckIcon />
                        <span className="text-sm">Neural Networks avec PyTorch</span>
                      </div>
                      <div className="flex items-center">
                        <CheckIcon />
                        <span className="text-sm">Computer Vision & NLP</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-warning">Applications Pratiques</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="card bg-base-300">
                    <div className="card-body">
                      <h5 className="font-medium">Vision par Ordinateur</h5>
                      <p className="text-sm opacity-70">Reconnaissance d'images et détection d'objets en temps réel</p>
                    </div>
                  </div>
                  <div className="card bg-base-300">
                    <div className="card-body">
                      <h5 className="font-medium">Traitement du Langage</h5>
                      <p className="text-sm opacity-70">Analyse de sentiment et génération de texte</p>
                    </div>
                  </div>
                  <div className="card bg-base-300">
                    <div className="card-body">
                      <h5 className="font-medium">Prédiction de Données</h5>
                      <p className="text-sm opacity-70">Modèles prédictifs et séries temporelles</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button className="btn btn-primary relative">
                  Découvrir le Programme Complet
                  <div className="badge badge-warning absolute -top-2 -right-2">
                    À venir
                  </div>
                </button>
                <div className="mt-4 flex justify-center items-center space-x-2">
                  <CalendarIcon />
                  <p className="text-sm opacity-70">Prochain début de formation dans 2 semaines</p>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop" onClick={closeModal}></div>
        </div>
      );
    }

    if (formationId === 'cyber') {
      return (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-info">
                Formation Cybersécurité & Ethical Hacking
              </h3>
              <button className="btn btn-sm btn-circle btn-ghost" onClick={closeModal}>
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="card bg-base-200">
                <div className="card-body">
                  <h4 className="card-title">Devenez Expert en Sécurité Informatique</h4>
                  <p>Plongez dans l'univers de la cybersécurité et maîtrisez les techniques de protection des systèmes d'information.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="card bg-base-300">
                  <div className="card-body">
                    <h4 className="card-title text-error">Sécurité Offensive</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <CheckIcon />
                        <span className="text-sm">Tests d'intrusion</span>
                      </div>
                      <div className="flex items-center">
                        <CheckIcon />
                        <span className="text-sm">Exploitation de vulnérabilités</span>
                      </div>
                      <div className="flex items-center">
                        <CheckIcon />
                        <span className="text-sm">Social Engineering</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card bg-base-300">
                  <div className="card-body">
                    <h4 className="card-title text-secondary">Sécurité Défensive</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <CheckIcon />
                        <span className="text-sm">Pare-feu & IDS/IPS</span>
                      </div>
                      <div className="flex items-center">
                        <CheckIcon />
                        <span className="text-sm">Sécurisation des réseaux</span>
                      </div>
                      <div className="flex items-center">
                        <CheckIcon />
                        <span className="text-sm">Analyse de malwares</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button className="btn btn-primary relative">
                  Commencer votre Formation
                  <div className="badge badge-warning absolute -top-2 -right-2">
                    À venir
                  </div>
                </button>
                <div className="mt-4 flex justify-center items-center space-x-2">
                  <CalendarIcon />
                  <p className="text-sm opacity-70">Formation certifiante - Prochaine session dans 3 semaines</p>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop" onClick={closeModal}></div>
        </div>
      );
    }

    if (formationId === 'cloud') {
      return (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-info">
                Formation Cloud Computing & DevOps
              </h3>
              <button className="btn btn-sm btn-circle btn-ghost" onClick={closeModal}>
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="card bg-base-200">
                <div className="card-body">
                  <h4 className="card-title">Maîtrisez le Cloud & DevOps</h4>
                  <p>Devenez expert en solutions cloud et pratiques DevOps modernes. Une formation complète couvrant les principales plateformes cloud.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="card bg-base-300">
                  <div className="card-body">
                    <h4 className="card-title text-warning">Amazon Web Services</h4>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <CheckIcon />
                        EC2, S3, RDS
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckIcon />
                        Lambda, CloudFormation
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card bg-base-300">
                  <div className="card-body">
                    <h4 className="card-title text-info">Microsoft Azure</h4>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <CheckIcon />
                        Virtual Machines, Storage
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckIcon />
                        Functions, DevOps
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card bg-base-300">
                  <div className="card-body">
                    <h4 className="card-title text-success">Google Cloud</h4>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <CheckIcon />
                        Compute Engine, Storage
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckIcon />
                        Kubernetes Engine
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button className="btn btn-primary relative">
                  Débuter dans le Cloud
                  <div className="badge badge-warning absolute -top-2 -right-2">
                    À venir
                  </div>
                </button>
                <div className="mt-4 flex justify-center items-center space-x-2">
                  <CalendarIcon />
                  <p className="text-sm opacity-70">Certifications officielles incluses - Prochaine session dans 2 semaines</p>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop" onClick={closeModal}></div>
        </div>
      );
    }

    if (formationId === 'blockchain') {
      return (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-secondary">
                Formation Blockchain & Web3
              </h3>
              <button className="btn btn-sm btn-circle btn-ghost" onClick={closeModal}>
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="card bg-base-200">
                <div className="card-body">
                  <h4 className="card-title">Devenez Développeur Blockchain</h4>
                  <p>Plongez dans l'univers révolutionnaire de la blockchain et du Web3. Apprenez à développer des applications décentralisées.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="card bg-base-300">
                  <div className="card-body">
                    <h4 className="card-title text-secondary">Ethereum</h4>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <CheckIcon />
                        Architecture EVM
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckIcon />
                        Gaz & Transactions
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card bg-base-300">
                  <div className="card-body">
                    <h4 className="card-title text-warning">Solidity</h4>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <CheckIcon />
                        Smart Contracts
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckIcon />
                        Tokens & NFTs
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card bg-base-300">
                  <div className="card-body">
                    <h4 className="card-title text-info">Web3</h4>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <CheckIcon />
                        DApps
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckIcon />
                        Wallets & Web3.js
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button className="btn btn-primary relative">
                  Commencer l'Aventure Web3
                  <div className="badge badge-warning absolute -top-2 -right-2">
                    À venir
                  </div>
                </button>
                <div className="mt-4 flex justify-center items-center space-x-2">
                  <CalendarIcon />
                  <p className="text-sm opacity-70">Formation incluant support technique 24/7 - Places limitées</p>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop" onClick={closeModal}></div>
        </div>
      );
    }

    return null;
  };

  return (
    <section className="py-20 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold  mb-4">
            Formez-vous aux Technologies de Demain
          </h2>
          <p className="text-base-content opacity-70 text-md max-w-2xl mx-auto">
            Développez vos compétences avec nos formations en ligne certifiantes. 
            Explorez des domaines innovants et restez à la pointe de la technologie.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {formations.map((formation) => (
            <button
              key={formation.id}
              onClick={() => setOpenModal(formation.id)}
              className="text-start"
            >
              <div className="card bg-base-100 hover:scale-105 transition-all duration-300 border border-primary border-opacity-30 shadow-lg">
                <div className="card-body">
                  <div className="text-primary mb-4">
                    {formation.icon}
                  </div>
                  <h3 className="card-title text-base-content">{formation.title}</h3>
                  <p className="text-base-content opacity-70 mb-4">{formation.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {formation.badges.map((badge, index) => (
                      <div key={index} className={`badge ${badge.color}`}>
                        {badge.text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {showViewAllButton && (
          <div className="text-center mt-12">
            <a href="/contact" className="btn btn-primary">
              À Venir bientôt Contactez nous pour en savoir plus
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
          </div>
        )}
      </div>

      {openModal && renderModal(openModal)}
    </section>
  );
};

export default FormationsSection;




















