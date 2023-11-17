import React, { useEffect } from 'react';
import Loading from './loading';
import { useRouter } from 'next/router';

interface Props {
  isLogin: boolean;
}
//TODO 로그인 처리
const Index = (props: Props) => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      props.isLogin && router.push('/home');
      !props.isLogin && router.push('/logIn');
    }, 1000);
  }, []);

  return <Loading />;
};

Index.defaultProps = {
  isLogin: true,
};
export default Index;
