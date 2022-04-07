import SodamContact from 'constants/sodamContactList';
import SodamDoc from 'constants/sodamDocList';
import Link from 'next/link';
import FooterLogoIC from 'public/assets/footerLogo.svg';
import styled from 'styled-components';
import { applyReponsiveWidth } from 'styles/mixin';

function Footer() {
  return (
    <MarginWrapper>
      <FooterWrapper>
        <Logo>
          <FooterLogoIC />
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
  height: 23.6rem;
  padding-top: 5.4rem;
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

const ContactTitle = styled.div`
  width: 7.7rem;
  font-weight: 600;
  font-size: 1.4rem;
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
`;

const RightFooterWrapper = styled.div`
  flex: 1;
  font-weight: 400;
  font-size: 1.4rem;
`;

const RightFooter = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-between;
  margin: 0 0 1.6rem 0;

  & > a {
    text-decoration: none;
    color: inherit;
  }
`;

export default Footer;
