import styled, { keyframes } from 'styled-components'
import ImageLogo from 'assets/animation logo.png'
import LogoText from 'assets/animationText.png'

export const Topimagesbox = () => {
  return (
    <>
      <TopContainer>
        <AnimationBox>
          <Logoanimation src={ImageLogo} />
          <ImageText src={LogoText} />
        </AnimationBox>
      </TopContainer>
    </>
  )
}

const TopContainer = styled.div`
  width: 1060px;
  position: absolute;
  top: -14px;
`

const bounceAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px); /* 통통 튀는 높이를 조절하세요 */
  }
`

const AnimationBox = styled.div`
  width: 300px;
  margin: 0 auto;
  animation: ${bounceAnimation} 1s infinite;
`
const Logoanimation = styled.img`
  width: 100px;
  height: auto;
`
const ImageText = styled.img`
  width: 200px;
  height: 120px;
  top: -20px;
  position: absolute;
`
