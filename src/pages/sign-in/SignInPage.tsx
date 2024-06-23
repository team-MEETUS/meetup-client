import FormInput from '@/components/input/FormInput';

import styles from './SignInPage.module.scss';
import FormButton from '@/components/button/FormButton';

const SignInPage = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>MEETUP</h2>
      <div className={styles.form_container}>
        <FormInput
          label="핸드폰번호"
          input={{
            type: 'tel',
            id: 'phoneNumber',
          }}
        />
        <FormInput
          label="비밀번호"
          input={{
            type: 'password',
            id: 'password',
          }}
        />
        <FormButton text="로그인" />
      </div>
      <div className={styles.sign_up}>
        <span>비밀번호 찾기</span>
        <span>회원가입</span>
      </div>
    </div>
  );
};

export default SignInPage;
