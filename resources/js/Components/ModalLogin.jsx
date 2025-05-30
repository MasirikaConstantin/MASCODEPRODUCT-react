import { useState, useEffect } from "react";
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextInputEmal from "./TextInputEmal";

export default function ModalLogin({ status, canResetPassword }) {
  const [activeTab, setActiveTab] = useState('login');
  const [isAnimating, setIsAnimating] = useState(false);
  const { auth } = usePage().props;
  const isAuthenticated = auth?.user;

  // Formulaires
  const loginForm = useForm({
    email: '',
    password: '',
    username: '',
    remember: false,
  });

  const registerForm = useForm({
    name: '',
    email: '',
    password: '',
    username: '',
    password_confirmation: '',
  });

  const forgotForm = useForm({
    email: '',
  });

  // Animation lors du changement d'onglet
  const handleTabChange = (tab) => {
    setIsAnimating(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsAnimating(false);
    }, 200);
  };

  // Soumissions avec animations
  const submitLogin = (e) => {
    e.preventDefault();
    loginForm.post(route('login'), {
      preserveScroll: true,
      onSuccess: () => {
        loginForm.reset('password');
        document.getElementById('login_modal').close();
      }
    });
  };

  const submitRegister = (e) => {
    e.preventDefault();
    registerForm.post(route('register'), {
      preserveScroll: true,
      onSuccess: () => {
        registerForm.reset('password', 'password_confirmation');
        document.getElementById('login_modal').close();
      }
    });
  };

  const submitForgot = (e) => {
    e.preventDefault();
    forgotForm.post(route('password.email'), {
      preserveScroll: true,
      onSuccess: () => forgotForm.reset(),
    });
  };

  // Effet pour réinitialiser les formulaires quand le modal s'ouvre
  useEffect(() => {
    const modal = document.getElementById('login_modal');
    const resetForms = () => {
      loginForm.reset();
      registerForm.reset();
      forgotForm.reset();
    };

    modal.addEventListener('close', resetForms);
    return () => modal.removeEventListener('close', resetForms);
  }, []);
  return (
    <>
      {/* Bouton conditionnel amélioré */}
      {isAuthenticated ? (
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar group relative">
            <div className="absolute inset-0 bg-primary/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            {auth.user?.avatar ? (
              <img 
                src={auth.user.avatar}

                alt="Profile" 
                className="w-10 rounded-full transition-all duration-300 hover:ring-2 hover:ring-primary" 
              />
            ) : (
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-10">
                  <span className="text-xl uppercase">
                    {auth.user.name.substring(0, 2)}
                  </span>
                </div>
              </div>
            )}
          </label>
          <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-300 rounded-box w-52 animate-fade-in">
          <li>
              <Link 
                href={route('dashboard')} 
                className="justify-between hover:bg-primary/10 transition-colors"
              >
                <span className="flex items-center gap-2">
                  
                  <svg className="w-[20px] h-[20px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M11.5039 3.13176c.3074-.17568.6848-.17568.9923 0l3.5554 2.0317L12 7.42604 7.94841 5.16346l3.55549-2.0317Zm-4.50388 3.7928L7 10.2768l-3.15822 1.8047 4.14118 2.205L11 12.5625V9.15832L7.00002 6.92456ZM3 13.8991v3.8152c0 .3588.19229.6902.50386.8682l3.49615 1.9978V16.029L3 13.8991Zm6.00001 6.6812L12 18.866l3 1.7143v-4.5714l-3-1.7143-2.99999 1.7142v4.5715Zm7.99999 0 3.4961-1.9978c.3116-.178.5039-.5094.5039-.8682v-3.8152l-4 2.1299v4.5513Zm3.1582-8.4988L17 10.2768V6.92457l-4 2.23375v3.40418l3.0171 1.724 4.1411-2.205Z"/>
                  </svg>

                  Tableau de bord
                </span>
              </Link>
            </li>
            <li>
              <Link 
                href={route('mon.profile.edit')} 
                className="justify-between hover:bg-primary/10 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profil
                </span>
              </Link>
            </li>

            
            <li>
              <Link href={route('user-settings.edit')} className="hover:bg-primary/10 transition-colors">
                <span className="flex items-center gap-2">
                  <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Paramètres
                </span>
              </Link>
            </li>
            <li>
              <Link 
                href={route('logout')} 
                method="post"
                as="button"
                className="hover:bg-error/10 text-error transition-colors"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Déconnexion
                </span>
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <button 
          onClick={() => document.getElementById('login_modal').showModal()}
          className="btn btn-primary btn-sm sm:btn-md hover:scale-105 transition-all duration-200 relative overflow-hidden group"
        >
          <span className="hidden sm:inline relative z-10">Connexion</span>
          <span className="sm:hidden relative z-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </span>
          <span className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="absolute inset-0 bg-gradient-to-r from-primary/30 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
        </button>
      )}

      {/* Modal amélioré */}
      <dialog id="login_modal" className="modal modal-bottom sm:modal-middle backdrop-blur-sm">
        <div className={`modal-box bg-base-100 border border-base-200/50 shadow-xl transition-all duration-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          <button 
            onClick={() => document.getElementById('login_modal').close()}
            className="btn btn-sm btn-circle absolute right-4 top-4 hover:bg-error/10 hover:text-error transition-colors"
            aria-label="Fermer"
          >
            ✕
          </button>
          
          {status && (
            <div className="alert alert-success mb-4 animate-fade-in">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{status}</span>
            </div>
          )}

          <div className="text-center mb-6">
            <h3 className="font-bold text-2xl mb-1">
              {activeTab === 'login' ? 'Connectez-vous' : activeTab === 'register' ? 'Créez un compte' : 'Réinitialisation'}
            </h3>
            <p className="text-sm opacity-70">
              {activeTab === 'login' ? 'Accédez à votre espace personnel' : 
               activeTab === 'register' ? 'Rejoignez notre communauté' : 
               'Recevez un lien de réinitialisation'}
            </p>
          </div>
          
          <div className="tabs tabs-boxed bg-base-200/50 p-1 rounded-box mb-6">
            <button 
              className={`tab flex-1 transition-colors ${activeTab === 'login' ? 'tab-active bg-base-100 shadow' : ''}`}
              onClick={() => handleTabChange('login')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Connexion
            </button> 
            <button 
              className={`tab flex-1 transition-colors ${activeTab === 'register' ? 'tab-active bg-base-100 shadow' : ''}`}
              onClick={() => handleTabChange('register')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Inscription
            </button>
            {canResetPassword && (
              <button 
                className={`tab flex-1 transition-colors ${activeTab === 'forgot' ? 'tab-active bg-base-100 shadow' : ''}`}
                onClick={() => handleTabChange('forgot')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Mot de passe
              </button>
            )}
          </div>

          {/* Contenu des onglets avec animations */}
          <div className={`transition-opacity duration-200 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            {activeTab === 'login' && (
              <form onSubmit={submitLogin} className="space-y-4">
                <div className="form-control">
                  <InputLabel htmlFor="login_email" value="Email" className="label" />
                  <TextInput
                    id="login_email"
                    type="email"
                    name="email"
                    value={loginForm.data.email}
                    className="input input-bordered w-full focus:ring-2 focus:ring-primary"
                    autoComplete="username"
                    isFocused={true}
                    onChange={(e) => loginForm.setData('email', e.target.value)}
                  />
                  <InputError message={loginForm.errors.email} className="mt-1" />
                </div>
                
                <div className="form-control">
                  <div className="flex justify-between items-center">
                    <InputLabel htmlFor="login_password" value="Mot de passe" className="label" />
                    {canResetPassword && (
                      <button 
                        type="button" 
                        onClick={() => handleTabChange('forgot')}
                        className="text-xs link link-primary"
                      >
                        Mot de passe oublié?
                      </button>
                    )}
                  </div>
                  <TextInput
                    id="login_password"
                    type="password"
                    name="password"
                    value={loginForm.data.password}
                    className="input input-bordered w-full focus:ring-2 focus:ring-primary"
                    autoComplete="current-password"
                    onChange={(e) => loginForm.setData('password', e.target.value)}
                  />
                  <InputError message={loginForm.errors.password} className="mt-1" />
                </div>

                <div className="flex items-center justify-between">
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="checkbox"
                      name="remember"
                      checked={loginForm.data.remember}
                      onChange={(e) => loginForm.setData('remember', e.target.checked)}
                      className="checkbox checkbox-primary checkbox-sm"
                    />
                    <span className="label-text">Se souvenir de moi</span>
                  </label>
                </div>

                <div className="modal-action flex gap-2">
                  <button 
                    type="button" 
                    onClick={() => document.getElementById('login_modal').close()} 
                    className="btn btn-ghost hover:bg-base-200 transition-all"
                  >
                    Annuler
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary flex-1 hover:bg-primary-focus transition-all"
                    disabled={loginForm.processing}
                  >
                    {loginForm.processing ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        Connexion...
                      </>
                    ) : 'Se connecter'}
                  </button>
                </div>
              </form>
            )}
            
            {activeTab === 'register' && (
              <form onSubmit={submitRegister} className="space-y-4">
                <div className="form-control">
                  <InputLabel htmlFor="register_name" value="Nom complet" className="label" />
                  <TextInput
                    id="register_name"
                    type="text"
                    name="name"
                    value={registerForm.data.name}
                    className="input input-bordered w-full focus:ring-2 focus:ring-primary"
                    autoComplete="name"
                    isFocused={true}
                    onChange={(e) => registerForm.setData('name', e.target.value)}
                  />
                  <InputError message={registerForm.errors.name} className="mt-1" />
                </div>

                <div className="form-control">
                  <InputLabel htmlFor="register_username" value="Nom d'utilisateur" className="label" />
                  <TextInputEmal
                    id="register_username"
                    type="text"
                    name="username"
                    value={registerForm.data.username}
                    className="input input-bordered w-full focus:ring-2 focus:ring-primary"
                    autoComplete="username"
                    onChange={(e) => registerForm.setData('username', e.target.value)}
                  />
                  <InputError message={registerForm.errors.username} className="mt-1" />
                </div>
                
                <div className="form-control">
                  <InputLabel htmlFor="register_email" value="Email" className="label" />
                  <TextInput
                    id="register_email"
                    type="email"
                    name="email"
                    value={registerForm.data.email}
                    className="input input-bordered w-full focus:ring-2 focus:ring-primary"
                    autoComplete="email"
                    onChange={(e) => registerForm.setData('email', e.target.value)}
                  />
                  <InputError message={registerForm.errors.email} className="mt-1" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <InputLabel htmlFor="register_password" value="Mot de passe" className="label" />
                    <TextInput
                      id="register_password"
                      type="password"
                      name="password"
                      value={registerForm.data.password}
                      className="input input-bordered w-full focus:ring-2 focus:ring-primary"
                      autoComplete="new-password"
                      onChange={(e) => registerForm.setData('password', e.target.value)}
                    />
                    <InputError message={registerForm.errors.password} className="mt-1" />
                  </div>
                  
                  <div className="form-control">
                    <InputLabel htmlFor="register_password_confirmation" value="Confirmation" className="label" />
                    <TextInput
                      id="register_password_confirmation"
                      type="password"
                      name="password_confirmation"
                      value={registerForm.data.password_confirmation}
                      className="input input-bordered w-full focus:ring-2 focus:ring-primary"
                      autoComplete="new-password"
                      onChange={(e) => registerForm.setData('password_confirmation', e.target.value)}
                    />
                    <InputError message={registerForm.errors.password_confirmation} className="mt-1" />
                  </div>
                </div>

                <div className="modal-action flex gap-2">
                  <button 
                    type="button" 
                    onClick={() => document.getElementById('login_modal').close()} 
                    className="btn btn-ghost hover:bg-base-200 transition-all"
                  >
                    Annuler
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary flex-1 hover:bg-primary-focus transition-all"
                    disabled={registerForm.processing}
                  >
                    {registerForm.processing ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        Inscription...
                      </>
                    ) : "S'inscrire"}
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'forgot' && (
              <form onSubmit={submitForgot} className="space-y-4">
                <div className="form-control">
                  <InputLabel htmlFor="forgot_email" value="Email" className="label" />
                  <TextInput
                    id="forgot_email"
                    type="email"
                    name="email"
                    value={forgotForm.data.email}
                    className="input input-bordered w-full focus:ring-2 focus:ring-primary"
                    autoComplete="email"
                    isFocused={true}
                    onChange={(e) => forgotForm.setData('email', e.target.value)}
                  />
                  <InputError message={forgotForm.errors.email} className="mt-1" />
                </div>

                <div className="text-xs opacity-70">
                  <p>Un lien de réinitialisation vous sera envoyé à cette adresse email.</p>
                </div>
                
                <div className="modal-action flex gap-2">
                  <button 
                    type="button" 
                    onClick={() => handleTabChange('login')} 
                    className="btn btn-ghost hover:bg-base-200 transition-all"
                  >
                    Retour
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary flex-1 hover:bg-primary-focus transition-all"
                    disabled={forgotForm.processing}
                  >
                    {forgotForm.processing ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        Envoi...
                      </>
                    ) : 'Envoyer le lien'}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Séparateur social */}
          {(activeTab === 'login' || activeTab === 'register') && (
            <div className="divider my-6 text-xs opacity-50">OU</div>
          )}

          {/* Boutons de connexion sociale */}
          {(activeTab === 'login' || activeTab === 'register') && (
    <div className="flex justify-center gap-4">
        {/* Bouton Google */}
        

        <a 
            href="/auth/google" 

        className="btn bg-white text-black border-[#e5e5e5]">
          <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
          Login with Google
        </a>
        
        {/* Bouton GitHub */}
        

        <a
            href="/auth/github" 
         className="btn bg-black text-white border-black">
          <svg aria-label="GitHub logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="white" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"></path></svg>
          Login with GitHub
        </a>
        
       
    </div>
)}
        </div>
        
        {/* Backdrop animé */}
        <form method="dialog" className="modal-backdrop bg-black/50 backdrop-blur-sm transition-opacity duration-300">
          <button className="cursor-default">Fermer</button>
        </form>
      </dialog>
    </>
  );
}