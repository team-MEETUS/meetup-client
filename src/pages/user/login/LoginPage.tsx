import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import classNames from 'classnames/bind';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as z from 'zod';

import { useUserMutation } from '@/apis/react-query/user/useUserMutation';
import CommonHeader from '@/components/header/CommonHeader';

import styles from './LoginPage.module.scss';

const LoginPage = () => {
  const navigate = useNavigate();
  const cn = classNames.bind(styles);
  const [, setValue] = useState({ phone: '', password: '' });
  const { postLogin } = useUserMutation();

  // const { data: loginData } = useLoginQuery(value);
  // Zod 스키마 정의
  const loginSchema = z.object({
    phone: z.string().regex(/^01[0-9]{8,9}$/, {
      message:
        '유효한 핸드폰 번호를 입력해 주세요. 하이픈(-) 없이 입력해 주세요.',
    }),
    password: z.string(),
    // .min(6, { message: '비밀번호는 최소 6자 이상이어야 합니다.' }),
  });

  type LoginFormValues = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      phone: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (e) => {
    try {
      setValue(e);
      // await console.log('로그인 데이터:', value);
      await postLogin.mutateAsync(e);
    } catch (error) {
      console.error('로그인 실패:', error);
      // 로그인 실패 시 처리 로직 추가
    }
  };

  const handleClickLink = (
    event: React.MouseEvent<HTMLButtonElement>,
    type = 'findPassword' || 'sign-up',
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (type === 'findPassword') {
      toast.info('준비중인 기능입니다.');
    } else if (type === 'sign-up') {
      navigate(`/user/sign-up`);
    }
  };

  const handleClickSocial = (
    event: React.MouseEvent<HTMLButtonElement>,
    type = 'kakao' || 'naver',
  ) => {
    event.preventDefault();
    event.stopPropagation();

    toast.info(`${type} 로그인은 준비 중인 기능입니다.`);
    // navigate(`/login/${type}`);
  };

  return (
    <div className={cn('container')}>
      <div className={cn('header')}>
        <CommonHeader title="로그인" onBackClick={() => navigate('/')} />
      </div>

      {/* 로고 */}
      <div className={cn('image_container')}>
        <img
          src={'/icons/icon-192.png'}
          alt="Logo"
          className={cn('logo_image')}
        />
      </div>

      <form
        onSubmit={(e) => void handleSubmit(onSubmit)(e)}
        className={cn('form')}
      >
        {/* 핸드폰 번호 */}
        <div className={cn('form_item')}>
          <label className={cn('label')} htmlFor="phone">
            핸드폰 번호
          </label>
          <input
            className={cn('input')}
            type="text"
            id="phone"
            placeholder="아이디(핸드폰 번호)"
            {...register('phone')}
          />
          {errors.phone && (
            <p className={cn('error_message')}>{errors.phone.message}</p>
          )}
        </div>

        {/* 비밀번호 */}
        <div className={cn('form_item')}>
          <label className={cn('label')} htmlFor="password">
            비밀번호
          </label>
          <input
            className={cn('input')}
            type="password"
            id="password"
            placeholder="비밀번호"
            {...register('password')}
          />
          {errors.password && (
            <p className={cn('error_message')}>{errors.password.message}</p>
          )}
        </div>

        {/* 제출 버튼 */}
        <button className={cn('submit_button')}>로그인</button>

        {/* 비밀번호 찾기 및 회원가입 */}
        <div className={cn('links_container')}>
          <button
            onClick={(event) => handleClickLink(event, 'findPassword')}
            className={cn('link')}
          >
            비밀번호 찾기
          </button>
          <button
            onClick={(event) => handleClickLink(event, 'sign-up')}
            className={cn('link')}
          >
            회원가입
          </button>
        </div>

        {/* 소셜 로그인 아이콘 */}
        <div className={cn('social_login')}>
          <button
            onClick={(event) => handleClickSocial(event, 'kakao')}
            className={cn('social_icon', 'kakao')}
          ></button>
          <button
            onClick={(event) => handleClickSocial(event, 'naver')}
            className={cn('social_icon', 'naver')}
          ></button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
