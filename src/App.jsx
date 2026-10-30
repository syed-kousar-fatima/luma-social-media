import { useEffect, useState } from 'react';
import AuthPage from './pages/AuthPage';
import SocialApp from './pages/SocialApp';

const AUTH_KEY = 'luma-auth';

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(AUTH_KEY) || sessionStorage.getItem(AUTH_KEY) || 'null');
    } catch {
      return null;
    }
  });
  const [showSplash, setShowSplash] = useState(!user);

  useEffect(() => {
    if (!showSplash) return undefined;
    const timer = window.setTimeout(() => setShowSplash(false), 1900);
    return () => window.clearTimeout(timer);
  }, [showSplash]);

  const signIn = (account, remember) => {
    const saved = JSON.stringify(account);
    if (remember) {
      localStorage.setItem(AUTH_KEY, saved);
      sessionStorage.removeItem(AUTH_KEY);
    } else {
      sessionStorage.setItem(AUTH_KEY, saved);
      localStorage.removeItem(AUTH_KEY);
    }
    setUser(account);
  };

  const signOut = () => {
    localStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem(AUTH_KEY);
    setUser(null);
    setShowSplash(false);
  };

  if (user) return <SocialApp user={user} onSignOut={signOut} />;
  if (showSplash) return <div className="splash-screen"><div className="splash-mark"><span>L</span><span>U</span><span>M</span><span>A</span></div><p>Make room for your story.</p></div>;
  return <AuthPage onSignIn={signIn} />;
}
