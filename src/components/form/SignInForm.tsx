import { styled } from 'styled-components'
import { Link } from 'react-router-dom'
// import IntroText from 'assets/intro-text.png'

export const SignInForm = () => {
  const texts = {
    title: '당연하지',
    email: '이메일',
    pwd: '비밀번호',
    btn: '로그인',
    noAccounts: '아직 계정이 없으신가요?',
    signup: '회원가입 하러 가기',
    emailPh: '이메일을 입력하세요 ',
    pwdPh: '비밀번호를 입력하세요 '
  }
  return (
    // <SignInWrapper>
    <SignInContainer>
      <div className="rectangle">
        <div className="signin-text">{texts.title}</div>
        <form
          method="post"
          // action='HOST URL'
          className="form-container">
          <div className="email">{texts.email}</div>
          <input
            type="text"
            className="signin-input"
            placeholder={texts.emailPh}
          />
          <div className="password">{texts.pwd}</div>
          <input
            type="text"
            className="signin-input"
            placeholder={texts.pwdPh}
          />
          <button className="signin">{texts.btn}</button>
          <div className="signup-cta">
            <span>{texts.noAccounts}</span>
            <Link to="/signup">{texts.signup}</Link>
          </div>
        </form>
      </div>
    </SignInContainer>
    // </SignInWrapper>
  )
}

// const SignInWrapper = styled.div`
//   /* display: flex; */
// `

const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  flex-grow: 1;
  .rectangle {
    width: 568px;
    height: 774px;
    background-color: white;
    margin: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    border-radius: 36px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .signin-text {
      z-index: 1;
      font-weight: 700;
      font-size: 60px;
      margin-bottom: 500px;
    }

    .form-container {
      display: flex;
      flex-direction: column;
      position: absolute;
      margin-top: 150px;
      .signin-input {
        background: #ffffff;
        border: 1px solid #d9d9d9;
        border-radius: 10px;
        padding-left: 10px;
        width: 434px;
        height: 60px;
        margin-bottom: 36px;
      }
    }
  }
  .email,
  .password {
    padding: 10px;
    line-height: 16px;
    letter-spacing: -0.48px;
    font-weight: 700;
  }
  .signin {
    all: unset;
    width: 434px;
    height: 60px;
    color: #fff;
    text-align: center;
    background-color: #ffd42e;
    border-radius: 10px;
    margin-bottom: 36px;
  }

  .signup-cta {
    width: 434px;
    height: 60px;
    display: flex;
    justify-content: center;
    margin: 0 10px;
    font-size: 14px;
    span {
      padding-right: 20px;
    }
    a {
      text-decoration: underline;
      color: #ffd42e;
      padding-left: 20px;
      font-weight: 700;

      &:visited {
        color: #ffd42e;
      }
    }
  }
`
