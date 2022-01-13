import Image from 'next/image';
import { useRouter } from 'next/router';
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
      docURL: 'https://www.notion.so/d062eead83c14467a64c232212591b48',
    },
    {
      docTitle: '개인정보처리방침',
      docURL: 'https://www.notion.so/d062eead83c14467a64c232212591b48',
    },
    {
      docTitle: '제휴/광고 문의',
      docURL: 'https://www.instagram.com/official_sodam/',
    },
    {
      docTitle: '소품샵 등록/삭제 문의',
      docURL: 'https://www.instagram.com/official_sodam/',
    },
  ];

  const router = useRouter();

  const onClickContact = (sodamContact: {
    contactTitle: string;
    contactContent: string;
    contactURL: string;
  }) => {
    router.push(sodamContact.contactURL);
  };

  const onClickDoc = (sodamDoc: { docTitle: string; docURL: string }) => {
    router.push(sodamDoc.docURL);
  };

  return (
    <FooterWrapper>
      <Logo>
        <Image src={logo} alt="로고" />
      </Logo>
      <LeftFooterWrapper>
        {sodamContact.map((contact) => (
          <LeftFooter key={contact.contactTitle} onClick={() => onClickContact(contact)}>
            <ContactTitle>{contact.contactTitle}</ContactTitle>
            <ContactContent>{contact.contactContent}</ContactContent>
          </LeftFooter>
        ))}
      </LeftFooterWrapper>
      <RightFooterWrapper>
        {sodamDoc.map((doc) => (
          <RightFooter key={doc.docTitle} onClick={() => onClickDoc(doc)}>
            {doc.docTitle}
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

const ContactContent = styled.div`
  font-weight: 400;
  font-size: 1.4rem;
`;

const RightFooterWrapper = styled.div`
  font-weight: 400;
  font-size: 1.4rem;
  padding: 0 5.4rem;
`;

const RightFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 0 1.6rem 12.6rem;
`;

export default Footer;
