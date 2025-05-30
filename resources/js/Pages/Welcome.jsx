import Header from '@/Components/Headers/Header';
import { Head, Link } from '@inertiajs/react';
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faArrowRight, faClock, faHeart, faEye, faTableCells } from '@fortawesome/free-solid-svg-icons';
import WelcomeModal from '@/Components/WelcomeModal';
import Footer from '@/Components/Headers/Footer';
import FormationsSection from '@/Components/FormationsSection';

export default function Welcome({ auth, posts, 
    recents, 
    astuces, 
    categories  }) {
        
  return (
  <>
    <div className="min-h-screen ">
            <Head title="Accueil" />

        <Header/>
        <WelcomeModal/>
      {/* Section Astuces */}
      <section className="pt-4  overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row">
            <h1 className="text-4xl font-bold text-white mb-4">
              <i className="bi bi-patch-question"></i> Les Astuces récentes
            </h1>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {astuces.data.map((astuce) => (
              <Link
              to={`/astuces/${astuce.slug}`}
              href={route('astuces.show', { astuce: astuce.slug })}

              key={astuce.id}
              className="card card-compact group relative h-80 bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out hover:-translate-y-1 border border-gray-700/30 hover:border-primary/30"
            >
              {/* Badge de catégorie */}
              <div className="absolute top-3 left-3 z-10">
                <div className="badge badge-lg badge-primary bg-primary/20 border-primary/30 text-primary-content group-hover:bg-primary/40 group-hover:text-primary-content transition-colors duration-300">
                  <FontAwesomeIcon icon="folder" className="mr-1.5 text-xs" />
                  {astuce.category.titre}
                </div>
              </div>
    
              {/* Image Container */}
              {astuce.image ? (
                <figure className="relative h-40 overflow-hidden">
                  <img
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    src={`${window.location.origin}/storage/${astuce.image}`}

                    alt={astuce.titre}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-base-100/60 to-transparent"></div>
                </figure>
              ) : (
                <figure className="h-40 bg-gradient-to-br from-primary to-secondary flex items-center justify-center transition-all duration-500 group-hover:bg-gradient-to-bl">
                  <div className="text-center p-4">
                    <div
                      className="w-12 h-12 mx-auto transition-transform duration-500 group-hover:scale-110"
                      dangerouslySetInnerHTML={{ __html: astuce.category.svg }}
                    />
                    <h3 className="text-sm font-bold text-white mt-2 opacity-90">
                      {astuce.category.titre}
                    </h3>
                  </div>
                </figure>
              )}
    
              {/* Content */}
              <div className="card-body p-5">
                <h2 className="card-title text-base-content group-hover:text-primary transition-colors duration-300 mb-1 line-clamp-2">
                  {astuce.titre}
                  {new Date(astuce.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
                    <div className="badge badge-secondary badge-sm ml-2 animate-pulse">NEW</div>
                  )}
                </h2>
    
                <p className="text-base-content/70 text-sm line-clamp-2 mb-4">
                  {astuce.description.substring(0, 90)}
                </p>
    
                {/* Footer */}
                <div className="card-actions justify-between items-center mt-auto">
                  <div className="flex items-center space-x-3 text-base-content/50">
                    <div className="flex items-center space-x-1 text-xs">
                      <FontAwesomeIcon icon={['far', 'clock']} className="text-xs" />
                      <span>
                        {formatDistanceToNow(new Date(astuce.created_at), {
                          addSuffix: true,
                          locale: fr
                        })}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs">
                      <FontAwesomeIcon icon={['far', 'comment-alt']} className="text-xs" />
                      <span>{astuce.stats.comments_count || 0}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs">
                      <FontAwesomeIcon icon={faHeart} />
                      <span>{astuce.stats.likes_count || 0}</span>
                    </div>

                    <div className="flex items-center space-x-1 text-xs">
                    <FontAwesomeIcon icon={faEye} />
                      <span>{astuce.stats.views_count || 0}</span>
                      
                    </div>
                  </div>
    
                  <button className="btn btn-circle btn-sm btn-ghost group-hover:btn-primary transition-all duration-300 transform group-hover:scale-110">
                    <FontAwesomeIcon icon="arrow-right" className="text-base-content/50 group-hover:text-white" />
                  </button>
                </div>
              </div>
    
              {/* Effet de halo */}
              <div className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 rounded-xl border-2 border-primary/20"></div>
              </div>
            </Link>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <Link href={route('astuces.index')} className="btn btn-neutral">
              <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/>
                <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
              </svg>
              Voir toutes les astuces
            </Link>

            <Link href={route('astuces.create')} className="btn btn-neutral">
              <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
              </svg>
              Publier une astuce
            </Link>
          </div>
        </div>
      </section>

      {/* Section Questions */}
      <section className="container mx-auto px-4 my-8">
        <h1 className="text-4xl font-bold mb-4">
          <i className="bi bi-patch-question"></i> Les Questions récentes
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {posts.data.map((post) => (
            <Link
            href={route('posts.show', { nom: post.slug })}
            key={post.id}
            className="card group relative h-96 bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out hover:-translate-y-2 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden"
          >
            {/* Gradient overlay and category badge */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 z-10"></div>
            
            <div className="absolute top-4 left-4 z-20">
              <span className="badge badge-lg glass bg-white/10 text-white border-white/20 backdrop-blur-sm group-hover:bg-primary/80 transition-colors">
                <FontAwesomeIcon icon={faFolder} className="mr-2" />
                {post.categorie.titre}
                <div className="flex items-center space-x-1 text-xs">
                      <FontAwesomeIcon icon={faHeart} />
                      <span>{post.stats.likes_count || 0}</span>
                    </div>
              </span>
              
            </div>
      
            {/* Image Container */}
            {post.image_url ? (
              <figure className="h-48 w-full overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  src={post.image_url}
                  alt={post.titre}
                  loading="lazy"
                />
              </figure>
            ) : (
              <div className="h-48 bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <div className="text-center text-white p-4">
                  <div className="w-16 h-16 mx-auto" dangerouslySetInnerHTML={{ __html: post.category?.svg || '' }} />
                  <h3 className="text-lg font-bold mt-3">{post.category?.titre || 'Général'}</h3>
                </div>
              </div>
            )}
      
            {/* Content */}
            <div className="card-body p-6 relative z-10">
              <div className="flex-1">
                <h2 className="card-title text-2xl font-bold text-white group-hover:text-primary transition-colors mb-3 line-clamp-2">
                  {post.titre}
                </h2>
                
                <div className="prose prose-sm dark:prose-invert line-clamp-3 mb-4">
                  <div dangerouslySetInnerHTML={{ __html: post.contenus.substring(0, 150) + '...' }} />
                </div>
              </div>
      
              {/* Footer */}
              <div className="card-actions justify-between items-center mt-4">
                <div className="flex items-center space-x-3 text-sm text-white/80">
                  <div className="flex items-center space-x-1">
                    <FontAwesomeIcon icon={faClock} className="text-xs" />
                    <span className='text-xs'>
                      {formatDistanceToNow(new Date(post.created_at), {
                        addSuffix: true,
                        locale: fr
                      })}
                    </span>
                  </div>
                  
                  {/* View count */}
                  <div className="flex items-center space-x-1 text-xs">
                      <FontAwesomeIcon icon={['far', 'comment-alt']} className="text-xs" />
                      <span className='text-xs'>{post.stats.comments_count || 0}</span>
                    </div>
                    

                    <div className="flex items-center space-x-1 text-xs">
                    <FontAwesomeIcon icon={faEye} />
                      <span className='text-xs'>{post.stats.views_count || 0}</span>
                      
                    </div>
                </div>
      
                {/* Read more button */}
                <button className="btn btn-circle btn-sm glass bg-white/20 hover:bg-primary text-white border-none group-hover:rotate-45 transition-all">
                  <FontAwesomeIcon icon={faArrowRight} className="text-lg" />
                </button>
              </div>
            </div>
      
            {/* Hover effect */}
            <div className="absolute inset-0 bg-black/5 group-hover:bg-primary/10 transition-all duration-500"></div>
          </Link>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <Link href={route('accueil')} className="btn btn-neutral">
            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/>
              <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
            </svg>
            Voir le Forum
          </Link>

          <Link href={route('posts.newpost')} className="btn btn-neutral">
            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>
            Poser une question
          </Link>

          <Link href={route("advanced-search")} className="btn btn-neutral">
            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
            </svg>
            Rechercher
          </Link>
        </div>
      </section>

     {/* Section Catégories améliorée */}
      {/* Section Catégories - Version élégante */}
      <section className="container mx-auto my-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
            <span className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-full mr-3">
              <i className="bi bi-sliders text-xl"></i>
            </span>
            <span className="">
              Nos Thématiques
            </span>
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-300 max-w-2xl mx-auto">
            Explorez nos contenus par centres d'intérêt
          </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
  {categories.map(({id, titre, description, image, imageUrlcat, svg}) => (
    <Link
    href={route("astuces.index",{"categorie_id": id,'lorem': titre})} 
    key={id}
      title={titre}
      data-tip={description}
      className="btn btn-sm btn-ghost normal-case 
                 bg-base-100 hover:bg-base-200 border border-base-300 
                 dark:bg-base-100-dark dark:hover:bg-base-200-dark dark:border-base-300-dark
                 flex items-center gap-2 px-4 py-2 rounded-btn
                 ml-3 mr-2 mb-2"
    >
      {image ? (
        <div className="w-5 h-5">
          <img src={imageUrlcat} alt={titre} className="w-full h-full object-contain" />
        </div>
      ) : (
        <div className="w-5 h-5" dangerouslySetInnerHTML={{ __html: svg }} />
      )}
      <span>{titre}</span>
    </Link>
  ))}
</div>

        <div className="text-center">
          <Link 
            href={route("astuces.index")} 
            className="btn btn-primary btn-md rounded-full shadow-lg hover:shadow-xl gap-2 py-2"
          >
            <FontAwesomeIcon icon={faTableCells} />
            Parcourir toutes les catégories
          </Link>
        </div>
      </section>

<FormationsSection/>
          </div>
      <Footer/>
</>
  );
};
