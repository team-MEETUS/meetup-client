import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import classNames from 'classnames/bind';
import * as _ from 'lodash';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as z from 'zod';

import { useGetAllGeoDataQuery } from '@/apis/react-query/common/useGeoQuery';
import { useUserMutation } from '@/apis/react-query/user/useUserMutation';
import { GetAllGeoAPIResponseBody } from '@/apis/server/common/geoAPI';
import CommonHeader from '@/components/header/CommonHeader';

import styles from './SignUpPage.module.scss';

const SignUpPage = () => {
  const navigate = useNavigate();
  const cn = classNames.bind(styles);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [smsCodeSent, setSmsCodeSent] = useState(false);
  const [verificationCodeServer, setVerificationCodeServer] = useState('');
  const [verificationCodeClient, setVerificationCodeClient] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGeos, setFilteredGeos] = useState<GetAllGeoAPIResponseBody[]>(
    [],
  );
  const [selectedGeo, setSelectedGeo] = useState<GetAllGeoAPIResponseBody>();

  const { postCreateMember, postPhoneCheck } = useUserMutation();
  const { GetAllGeoData } = useGetAllGeoDataQuery();

  const filterGeos = (term: string) => {
    if (!term) {
      setFilteredGeos([]);
      return;
    }
    const lowerTerm = term.toLowerCase();
    const filtered =
      (GetAllGeoData &&
        GetAllGeoData.filter(
          (geo) =>
            geo.city.toLowerCase().includes(lowerTerm) ||
            geo.district.toLowerCase().includes(lowerTerm) ||
            geo.county?.toLowerCase().includes(lowerTerm),
        )) ||
      [];
    setFilteredGeos(filtered);
  };

  const handleSelectGeo = (geo: GetAllGeoAPIResponseBody) => {
    setSelectedGeo(geo);
    setSearchTerm('');
    setFilteredGeos([]);
    setModalOpen(false);
  };

  const signUpSchema = z
    .object({
      phone: z.string().regex(/^01[0-9]{8,9}$/, {
        message:
          '유효한 핸드폰 번호를 입력해 주세요. 하이픈(-) 없이 입력해 주세요.',
      }),
      password: z
        .string()
        .min(6, { message: '비밀번호는 6~15자리 입니다.' })
        .max(15, { message: '비밀번호는 6~15자리 입니다.' }),
      checkPassword: z
        .string()
        .min(6, { message: '비밀번호는 6~15자리 입니다.' })
        .max(15, { message: '비밀번호는 6~15자리 입니다.' }),
      nickname: z
        .string()
        .min(2, { message: '닉네임은 최소 2자 이상이어야 합니다.' })
        .max(10, { message: '닉네임은 최대 10자까지 가능합니다.' }),
      birth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: '생년월일은 YYYY-MM-DD 형식이어야 합니다.',
      }),
      gender: z.number().refine((val) => [0, 1].includes(val), {
        message: '성별을 선택해 주세요.',
      }),
    })
    .refine((data) => data.password === data.checkPassword, {
      message: '비밀번호가 일치하지 않습니다.',
      path: ['checkPassword'],
    });

  type SignUpFormValues = z.infer<typeof signUpSchema>;

  const {
    trigger,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      phone: '',
      password: '',
      checkPassword: '',
      nickname: '',
      birth: '',
      gender: 0,
    },
  });

  const phone = useWatch<SignUpFormValues>({ name: 'phone', control });

  const handleRequestSMS = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    const isValid = await trigger('phone');

    try {
      if (isValid) {
        setSmsCodeSent(true);
        const response = await postPhoneCheck.mutateAsync(phone as string);
        const verificationCode = response.data.randomNum;

        setVerificationCodeServer(String(verificationCode));
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleVerifyCode = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      if (!verificationCodeClient) {
        toast.error('인증번호를 입력해 주세요.');
        return false;
      } else if (verificationCodeClient !== verificationCodeServer) {
        toast.error('인증번호가 일치하지 않습니다.');
        return false;
      } else if (verificationCodeClient === verificationCodeServer) {
        toast.success('전화번호 인증이 완료되었습니다.');
        setIsPhoneVerified(true);
        return true;
      }
    } catch (error) {
      toast.error('인증번호가 올바르지 않습니다.');
    }
  };

  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    try {
      if (!isPhoneVerified) {
        toast.error('전화번호 인증을 완료해 주세요.');
        return;
      } else if (!selectedGeo || !selectedGeo.geoId) {
        toast.error('지역을 선택해 주세요.');
        return;
      }
      const body = {
        ..._.omit(data, 'checkPassword'),
        geoId: selectedGeo.geoId,
      };

      await postCreateMember.mutateAsync(body);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cn('container')}>
      <div className={cn('header')}>
        <CommonHeader title="회원가입" onBackClick={() => navigate('/')} />
      </div>

      {/* 로고 */}
      <div className={cn('image_container')}>
        <img
          src={'/icons/icon-192.png'}
          alt="Logo"
          className={cn('logo_image')}
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={cn('form')}>
        {/* 핸드폰 번호 */}
        <div className={cn('form_item')}>
          <label className={cn('label')} htmlFor="phone">
            핸드폰 번호
          </label>
          <div className={cn('phone_input_container')}>
            <input
              className={cn('input')}
              type="text"
              id="phone"
              placeholder="핸드폰 번호"
              {...register('phone')}
            />
            <button className={cn('submit_button')} onClick={handleRequestSMS}>
              {smsCodeSent ? '인증번호 재전송' : '문자인증하기'}
            </button>
          </div>
          {errors.phone && (
            <p className={cn('error_message')}>{errors.phone.message}</p>
          )}
        </div>

        {/* 인증번호 */}
        {smsCodeSent && (
          <div className={cn('form_item')}>
            <label className={cn('label')} htmlFor="verificationCode">
              인증번호
            </label>
            <div className={cn('phone_input_container')}>
              <input
                className={cn('input')}
                type="text"
                id="verificationCode"
                placeholder="인증번호"
                value={verificationCodeClient}
                onChange={(e) => setVerificationCodeClient(e.target.value)}
              />
              <button
                className={cn('submit_button')}
                onClick={handleVerifyCode}
              >
                인증번호 확인
              </button>
            </div>
          </div>
        )}

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

        {/* 비밀번호 확인 */}
        <div className={cn('form_item')}>
          <label className={cn('label')} htmlFor="checkPassword">
            비밀번호 확인
          </label>
          <input
            className={cn('input')}
            type="password"
            id="checkPassword"
            placeholder="비밀번호 확인"
            {...register('checkPassword')}
          />
          {errors.checkPassword && (
            <p className={cn('error_message')}>
              {errors.checkPassword.message}
            </p>
          )}
        </div>

        {/* 닉네임 */}
        <div className={cn('form_item')}>
          <label className={cn('label')} htmlFor="nickname">
            닉네임
          </label>
          <input
            className={cn('input')}
            type="text"
            id="nickname"
            placeholder="닉네임"
            {...register('nickname')}
          />
          {errors.nickname && (
            <p className={cn('error_message')}>{errors.nickname.message}</p>
          )}
        </div>

        {/* 생년월일 */}
        <div className={cn('form_item')}>
          <label className={cn('label')} htmlFor="birth">
            생년월일
          </label>
          <input
            className={cn('input')}
            type="date"
            id="birth"
            placeholder="YYYY-MM-DD"
            {...register('birth')}
          />
          {errors.birth && (
            <p className={cn('error_message')}>{errors.birth.message}</p>
          )}
        </div>

        {/* 성별 */}
        <div className={cn('form_item')}>
          <label className={cn('label')} htmlFor="gender">
            성별
          </label>
          <select
            className={cn('input')}
            id="gender"
            {...register('gender', {
              setValueAs: (val: string) => parseInt(val, 10),
            })}
          >
            <option value="" disabled>
              성별 선택
            </option>
            <option value={0}>남성</option>
            <option value={1}>여성</option>
          </select>
          {errors.gender && (
            <p className={cn('error_message')}>{errors.gender.message}</p>
          )}
        </div>

        {/* 지역 */}
        <div className={cn('form_item')}>
          <label className={cn('label')} htmlFor="geo">
            지역
          </label>
          <input
            className={cn('input')}
            type="text"
            id="region"
            placeholder="지역 검색"
            value={
              selectedGeo
                ? `${selectedGeo.city} ${selectedGeo.district} ${selectedGeo.county}`
                : searchTerm
            }
            onClick={() => setModalOpen(true)}
            readOnly
          />
        </div>

        <button className={cn('submit_button')} type="submit">
          회원가입
        </button>
      </form>

      {/* 지역 검색 모달 */}
      {modalOpen && (
        <>
          {/* 딤드 배경 */}
          <div
            className={cn('modal_background')}
            onClick={() => setModalOpen(false)}
          />

          {/* 지역 검색 모달 */}
          <div className={cn('modal')}>
            <h2 className={cn('modal_title')}>지역 검색</h2>
            <input
              className={cn('modal_search')}
              type="text"
              placeholder="지역 검색"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                filterGeos(e.target.value);
              }}
            />
            <ul className={cn('search_list')}>
              {filteredGeos.map((geo) => (
                <li
                  className={cn('search_item')}
                  key={geo.geoId}
                  onClick={() => handleSelectGeo(geo)}
                >
                  {geo.city} {geo.district}{' '}
                  {geo.county ? `(${geo.county})` : ''}
                </li>
              ))}
            </ul>
            <button
              className={cn('modal_button')}
              onClick={() => setModalOpen(false)}
            >
              X
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SignUpPage;
