import { useState } from 'react';
import { FiArrowRight, FiCheck, FiEye, FiEyeOff, FiLock, FiMail, FiUser } from 'react-icons/fi';
import Brand from '../components/Brand';
import { validateAuth } from '../utils/validation';

export default function AuthPage({ onSignIn }) {
  const [mode, setMode] = useState('signup');
  const [form, setForm] = useState({ name: '', email: '', password: '', remember: true });
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const update = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: '' }));
    setNotice('');
  };
  const submit = (event) => {
    event.preventDefault();
    const validation = validateAuth({ ...form, mode });
    if (Object.keys(validation).length) { setErrors(validation); return; }
    const accounts = JSON.parse(localStorage.getItem('luma-accounts') || '[]');
    const email = form.email.trim().toLowerCase();
    if (mode === 'signup') {
      if (accounts.some((account) => account.email === email)) { setErrors({ email: 'An account with this email already exists.' }); return; }
      const account = { name: form.name.trim(), email, handle: form.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '') || 'lumauser', avatar: '' };
      localStorage.setItem('luma-accounts', JSON.stringify([...accounts, { ...account, password: form.password }]));
      onSignIn(account, form.remember);
      return;
    }
    const account = accounts.find((item) => item.email === email && item.password === form.password);
    if (!account) { setNotice('We couldn’t find an account with those details. Check your email and password or create an account.'); return; }
    const { password: _password, ...safeAccount } = account;
    onSignIn(safeAccount, form.remember);
  };

  return <main className="auth-page">
    <div className="auth-art"><div className="auth-art-glow" /><Brand /><div className="art-copy"><span className="eyebrow">A LITTLE MORE YOU</span><h1>Your world,<br /><em>in full color.</em></h1><p>A place for the moments, people, and ideas that make life yours.</p><div className="art-people"><div className="mini-avatars"><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces" alt="" /><img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces" alt="" /><img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&crop=faces" alt="" /></div><span><strong>12k+</strong> kind people, sharing life</span></div></div><div className="art-image"><img src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1400&auto=format&fit=crop&q=85" alt="Golden light over a mountain lake" /><span className="art-image-caption">TAKE THE SCENIC ROUTE <b>↗</b></span></div><span className="auth-vertical">LUMA COMMUNITY · EST. 2025</span></div>
    <section className="auth-panel"><div className="auth-mobile-brand"><Brand /></div><div className="auth-form-wrap">
      <div className="auth-topline"><span>Already have an account?</span><button onClick={() => { setMode(mode === 'signup' ? 'login' : 'signup'); setErrors({}); setNotice(''); }}>{mode === 'signup' ? 'Log in' : 'Sign up'} <FiArrowRight /></button></div>
      <div className="auth-heading"><span className="eyebrow">{mode === 'signup' ? 'YOUR PEOPLE ARE HERE' : 'GOOD TO HAVE YOU BACK'}</span><h2>{mode === 'signup' ? 'Create your space.' : 'Welcome back.'}</h2><p>{mode === 'signup' ? 'Start sharing the little things that mean a lot.' : 'Pick up right where you left off.'}</p></div>
      <form className="auth-form" onSubmit={submit} noValidate>
        {mode === 'signup' && <label className="field-label">Your name<div className={`input-wrap ${errors.name ? 'has-error' : ''}`}><FiUser /><input autoComplete="name" value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="e.g. Alex Morgan" />{errors.name && <span className="field-error">{errors.name}</span>}</div></label>}
        <label className="field-label">Email address<div className={`input-wrap ${errors.email ? 'has-error' : ''}`}><FiMail /><input type="email" autoComplete="email" value={form.email} onChange={(event) => update('email', event.target.value)} placeholder="you@example.com" />{errors.email && <span className="field-error">{errors.email}</span>}</div></label>
        <label className="field-label">Password<div className={`input-wrap ${errors.password ? 'has-error' : ''}`}><FiLock /><input type={showPassword ? 'text' : 'password'} autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} value={form.password} onChange={(event) => update('password', event.target.value)} placeholder="At least 8 characters" /><button className="password-toggle" type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FiEyeOff /> : <FiEye />}</button>{errors.password && <span className="field-error">{errors.password}</span>}</div></label>
        {notice && <p className="auth-notice" role="alert">{notice}</p>}
        <label className="remember-row"><input type="checkbox" checked={form.remember} onChange={(event) => update('remember', event.target.checked)} /><span className="custom-check"><FiCheck /></span><span>Remember me</span>{mode === 'login' && <button type="button" className="forgot-link" onClick={() => setNotice('For this demo, create an account to save your sign-in details.')}>Forgot password?</button>}</label>
        <button className="auth-submit" type="submit">{mode === 'signup' ? 'Create account' : 'Log in'} <FiArrowRight /></button>
      </form>
      <div className="auth-terms">By continuing, you agree to our <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>.</div>
    </div><div className="auth-footer"><span>© 2025 Luma Social</span><span>Made for the moments that matter <i>✦</i></span></div></section>
  </main>;
}
