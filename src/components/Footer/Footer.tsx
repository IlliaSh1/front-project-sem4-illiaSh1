import styled from "styled-components";

interface StyledProps {}

const FooterStyle = styled.footer<StyledProps>`
  display: flex;
  justify-content: center;

  border-top: 2px solid var(--primary-color);
`;

function Footer() {
  return (
    <FooterStyle className="footer">
      <p data-testid="footer_credits">Шамаров Илья Глебович, гр. 221-321</p>
    </FooterStyle>
  );
}

export default Footer;
