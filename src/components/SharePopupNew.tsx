"use client";

import React, { useState } from 'react';
import styles from './SharePopup.module.css';
import { X, Copy, Check, Facebook, Instagram, MessageCircle } from 'lucide-react';

type Props = {
  open: boolean;
  url: string;
  onClose: () => void;
}

export default function SharePopupNew({ open, url, onClose }: Props) {
  const [copied, setCopied] = useState(false);

  if (!open) return null;

  const onCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const tmp = document.createElement('input');
        tmp.value = url;
        document.body.appendChild(tmp);
        tmp.select();
        document.execCommand('copy');
        document.body.removeChild(tmp);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      // ignore
    }
  };

  const openShareWindow = (targetUrl: string) => {
    try {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } catch (e) {
      // ignore
    }
  };

  const socials = [
    {
      name: 'Facebook',
      icon: <Facebook />,
      onClick: () => openShareWindow(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`),
    },
    {
      name: 'Instagram',
      icon: <Instagram />,
      onClick: () => openShareWindow('https://www.instagram.com'),
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle />,
      onClick: () => openShareWindow(`https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`),
    },
  ];

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true" onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.title}>Share this event</div>
          <button onClick={onClose} className={styles.closeBtn} aria-label="Close">
            <X />
          </button>
        </div>

        <div className={styles.icons}>
          {socials.map((s) => (
            <button key={s.name} className={styles.iconBtn} onClick={s.onClick} aria-label={`Share to ${s.name}`}>
              {React.cloneElement(s.icon as React.ReactElement<any>, { size: 22 } as any)}
            </button>
          ))}
        </div>

        <div className={styles.urlRow}>
          <input readOnly className={styles.urlInput} value={url} aria-label="Share URL" />
          <button className={styles.copyBtn} onClick={onCopy}>{copied ? 'Copied' : 'Copy URL'}</button>
        </div>
      </div>
    </div>
  );
}
