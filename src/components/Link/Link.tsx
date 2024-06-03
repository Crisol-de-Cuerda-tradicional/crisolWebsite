import React, { AnchorHTMLAttributes } from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { useRouter } from 'next/router';

type LinkProps = {
  children: React.ReactNode;
  skipLocaleHandling?: boolean;
} & NextLinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps>;

export const Link = ({ children, skipLocaleHandling, ...rest }: LinkProps) => {
  const router = useRouter();
  const locale = rest.locale || router.query.locale?.toString() || '';

  let href = rest.href;
  if (typeof href === 'string') {
    if (href.indexOf('http') === 0) skipLocaleHandling = true;
    if (href[0] === '#' || href[0] === '?') skipLocaleHandling = true;
    if (locale && !skipLocaleHandling) {
      href =
        href !== router.pathname
          ? `/${locale}${href}`
          : router.pathname.replace('[locale]', locale);
    }
  }

  const localeOnClick = () => {
    localStorage.setItem('i18nextLng', locale);
  };

  return (
    <>
      <NextLink {...rest} href={href} onClick={locale ? localeOnClick : rest.onClick} scroll={true}>
        {children}
      </NextLink>
    </>
  );
};
