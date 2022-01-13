import SodamContact from 'constants/sodamContactList';
import SodamDoc from 'constants/sodamDocList';
import Image from 'next/image';
import Link from 'next/link';
import logo from 'public/assets/footerLogo.svg';
import styled from 'styled-components';

function Footer() {
  return (
    <FooterWrapper>
      <Logo>
        <Image src={logo} alt="로고" />
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
  );
}

const FooterWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 5.5rem 0 5.5rem 36rem;
  background-color: ${({ theme }) => theme.colors.grayBg};
  color: ${({ theme }) => theme.colors.black2};
`;

const Logo = styled.div`
  width: 18.7rem;
  margin-right: 22.2rem;
`;

const LeftFooterWrapper = styled.div`
  width: 28.1rem;
`;

const LeftFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const ContactTitle = styled.div`
  font-weight: 600;
  font-size: 1.4rem;
`;

const ContactContent = styled.li`
  list-style: none;
  font-weight: 400;
  font-size: 1.4rem;

  & > a {
    text-decoration: none;
    color: inherit;
  }
`;

const RightFooterWrapper = styled.div`
  font-weight: 400;
  font-size: 1.4rem;
  padding: 0 5.4rem;
`;

const RightFooter = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-between;
  margin: 0 0 1.6rem 12.6rem;

  & > a {
    text-decoration: none;
    color: inherit;
  }
`;

export default Footer;
