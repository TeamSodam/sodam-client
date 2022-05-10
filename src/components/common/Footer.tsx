import SodamContact from 'constants/sodamContactList';
import SodamDoc from 'constants/sodamDocList';
import Link from 'next/link';
import FooterLogoIC from 'public/assets/footerLogo.svg';
import MobileFooterLogoIC from 'public/assets/footerLogo_mobile.svg';
import styled, { css } from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { applyReponsiveWidth } from 'styles/mixin';
import Screen from 'styles/Screen';

function Footer() {
  return (
    <MarginWrapper>
      <FooterWrapper>
        <Logo>
          <Screen mobile>
            <MobileFooterLogoIC />
          </Screen>
          <Screen tablet desktop wide>
            <FooterLogoIC />
          </Screen>
        </Logo>
        <LeftFooterWrapper>
          {SodamContact.map((contact) => (
            <LeftFooter key={contact.contactTitle}>
              <ContactTitle>{contact.contactTitle}</ContactTitle>
              <ContactContent>
                <Link href={contact.contactURL}>{contact.contactContent}</Link>
              </ContactContent>
            </LeftFooter>
          ))}
        </LeftFooterWrapper>
        <RightFooterWrapper>
          {SodamDoc.map((doc) => (
            <RightFooter key={doc.docTitle}>
              <Link href={doc.docURL}>{doc.docTitle}</Link>
            </RightFooter>
          ))}
        </RightFooterWrapper>
      </FooterWrapper>
    </MarginWrapper>
  );
}

const MarginWrapper = styled.div`
  margin: 0 auto;
  width: ${({ theme }) => theme.clientWidth}px !important;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ theme }) => theme.colors.grayBg};
`;

const FooterWrapper = styled.div`
  ${applyReponsiveWidth}
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 5.4rem 0;
  ${applyMediaQuery('mobile')} {
    padding: 1.8rem 0;
    gap: 3.7rem;
  }
  color: ${({ theme }) => theme.colors.black2};
`;

const Logo = styled.div`
  flex: 1;
`;

const LeftFooterWrapper = styled.div`
  flex: 1;
`;

const LeftFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  gap: 2.4rem;
`;

const MobileFontStyle = css`
  font-size: 5px;
  line-height: 7px;
`;

const ContactTitle = styled.div`
  width: 7.7rem;
  font-weight: 600;
  font-size: 1.4rem;

  ${applyMediaQuery('mobile')} {
    width: 2.5rem;
    ${MobileFontStyle}
  }
`;

const ContactContent = styled.li`
  flex: 1;
  list-style: none;
  font-weight: 400;
  font-size: 1.4rem;

  & > a {
    text-decoration: none;
    color: inherit;
  }

  ${applyMediaQuery('mobile')} {
    ${MobileFontStyle}
  }
`;

const RightFooterWrapper = styled.div`
  flex: 1;
  font-weight: 400;
  font-size: 1.4rem;

  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  ${applyMediaQuery('mobile')} {
    ${MobileFontStyle}
  }
`;

const RightFooter = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-between;

  & > a {
    text-decoration: none;
    color: inherit;
  }
`;

export default Footer;
