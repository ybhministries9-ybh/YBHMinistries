"use client";

import React, { useState } from 'react';
import styles from './SharePopup.module.css';
import copyToClipboard from '../utils/clipboard';
import { X, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

type Props = {
  open: boolean;
  url: string;
  onClose: () => void;
}

export default function SharePopup({ open, url, onClose }: Props) {
  const [copied, setCopied] = useState(false);

  if (!open) return null;

  const onCopy = async () => {
    try {
      const ok = await copyToClipboard(url);
      if (ok) {
        setCopied(true);
        toast.success('Link copied to clipboard');
        setTimeout(() => setCopied(false), 2500);
      } else {
        toast.error('Copy failed');
      }
    } catch (e) {
      toast.error('Copy failed');
    }
  };

  const openShareWindow = (targetUrl: string) => {
    try {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } catch (e) {
      // ignore
    }
  };

  const shareText = `Join us for 24 hours of non-stop worship this Saturday as we lift His name high and experience His presence together! 🙌✨🔥`;
  // use shared clipboard util for copying text

  const socials = [
    {
      name: 'Facebook',
      icon: <Facebook />,
      className: styles.facebook,
      onClick: async () => {
        // copy message+url so user can paste if Facebook composer doesn't prefill
        const ok = await copyToClipboard(`${shareText}\n${url}`);
        if (ok) toast.success('Message copied to clipboard');
        else toast.error('Copy failed');
        openShareWindow(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
      },
    },
    {
      name: 'Instagram',
      icon: <Instagram />,
      className: styles.instagram,
      onClick: async () => {
        const isMobile = typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent || '');
        if (isMobile && navigator.share) {
          try {
            await navigator.share({ text: shareText, url });
            return;
          } catch (e) {
            // ignore and fallback
          }
        }
        // Desktop fallback: copy message + URL and open Instagram create page
        const ok = await copyToClipboard(`${shareText}\n${url}`);
        if (ok) toast.success('Message copied to clipboard');
        else toast.error('Copy failed');
        openShareWindow('https://www.instagram.com/create/style/');
      },
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle />,
      className: styles.whatsapp,
      onClick: () => openShareWindow(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + '\n' + url)}`),
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
            <button
              key={s.name}
              className={`${styles.iconBtn} ${s.className ?? ''}`}
              onClick={s.onClick}
              aria-label={`Share to ${s.name}`}
              title={`Share to ${s.name}`}
            >
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
