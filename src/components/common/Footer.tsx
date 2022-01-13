import Image from 'next/image';
import logo from 'public/assets/footerLogo.svg';
import styled from 'styled-components';

function Footer() {
  const sodamContact = [
    {
      contactTitle: 'Contact',
      contactContent: 'vvayun@naver.com',
      contactURL: 'https://www.naver.com',
    },
    {
      contactTitle: 'Info',
      contactContent: '공식 노션 바로가기',
      contactURL: 'https://www.notion.so/d062eead83c14467a64c232212591b48',
    },
    {
      contactTitle: 'Instagram',
      contactContent: '@official_sodam',
      contactURL: 'https://www.instagram.com/official_sodam/',
    },
  ];

  const sodamDoc = [
    {
      docTitle: '이용약관',
      docURL: 'https://www.naver.com',
    },
    {
      docTitle: '개인정보처리방침',
      docURL: 'https://www.naver.com',
    },
    {
      docTitle: '제휴/광고 문의',
      docURL: 'https://www.naver.com',
    },
    {
      docTitle: '소품샵 등록/삭제 문의',
      docURL: 'https://www.naver.com',
    },
  ];

  return (
    <FooterWrapper>
      <Logo>
        <Image src={logo} alt="로고" />
      </Logo>
      <LeftFooterWrapper>
        {sodamContact.map((contact) => (
          <LeftFooter key={contact.contactTitle}>
            <ContactTitle>{contact.contactTitle}</ContactTitle>
            <ContactContent>{contact.contactContent}</ContactContent>
          </LeftFooter>
        ))}
      </LeftFooterWrapper>
      <RightFooterWrapper>
        {sodamDoc.map((doc) => (
          <RightFooter key={doc.docTitle}>{doc.docTitle}</RightFooter>
        ))}
      </RightFooterWrapper>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #f8f8f8;
  color: #514c57;
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
  font-weight: bold;
  font-size: 1.4rem;
`;

const ContactContent = styled.div`
  font-weight: medium;
  font-size: 1.4rem;
`;

const RightFooterWrapper = styled.div`
  font-size: 1.4rem;
  padding: 5.4rem;
`;

const RightFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 0 1.6rem 12.6rem;
`;

export default Footer;
