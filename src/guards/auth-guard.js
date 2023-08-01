import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuthContext } from 'src/contexts/auth-context';
import { useSearchParams } from 'next/navigation';

export const AuthGuard = (props) => {
  const { children } = props;
  const router = useRouter();
  const { isAuthenticated } = useAuthContext();
  const ignore = useRef(false);
  const [checked, setChecked] = useState(false);
  const params = useSearchParams();
  if (params.get('refund') == 'true') {
    let balance = localStorage.getItem('balance')
    let amount = params.get('amount');
    localStorage.setItem('balance', parseInt(balance) + parseInt(amount))
    const url = "https://es-dev.infath.sa/EPaymentPOC_CW/Payment_Redirection?Trans_Num=" + params.get('Trans_Num') + '&refund=true';
    global.href = url
    router.push(url)

  }

  if (params.get('Auction_Id')) {
    localStorage.setItem('params', decodeURI(params));
  }

  // Only do authentication check on component mount.
  // This flow allows you to manually redirect the user after sign-out, otherwise this will be
  // triggered and will automatically redirect to sign-in page.

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      // Prevent from calling twice in development mode with React.StrictMode enabled
      if (ignore.current) {
        return;
      }

      ignore.current = true;

      if (!isAuthenticated) {
        console.log('Not authenticated, redirecting');
        router
          .replace({
            pathname: '/auth/login',
            query: router.asPath !== '/' ? { continueUrl: router.asPath } : undefined
          })
          .catch(console.error);
      } else {
        setChecked(true);
      }
    },
    [router.isReady]
  );

  if (!checked) {
    return null;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node
};
