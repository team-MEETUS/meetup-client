import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as z from 'zod';

import { useUserMutation } from '@/apis/react-query/user/useUserMutation';

const LoginPage = () => {
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

  // useEffect(() => {
  //   console.log(loginData);
  // }, [loginData]);

  return (
    <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
      <div>
        <label htmlFor="phone">핸드폰 번호</label>
        <input
          type="text"
          id="phone"
          placeholder="아이디(핸드폰 번호)"
          {...register('phone')}
        />
        {errors.phone && <p style={{ color: 'red' }}>{errors.phone.message}</p>}
      </div>

      <div>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          placeholder="비밀번호"
          {...register('password')}
        />
        {errors.password && (
          <p style={{ color: 'red' }}>{errors.password.message}</p>
        )}
      </div>

      <button>로그인</button>
    </form>
  );
};

export default LoginPage;
