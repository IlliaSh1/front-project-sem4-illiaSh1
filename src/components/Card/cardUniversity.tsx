import { FC } from "react";
import { IUniversity } from "../DynamicPagination/university.interface";
import styled from "styled-components";

const CardStyled = styled.div`
  height: 50px;
  background-color: #222;
  color: #5875f3;
  border: 1px solid #888;
  padding: 5px;
`;

const CardUniversity: FC<{ data: IUniversity }> = ({ data }) => (
  <>
    <CardStyled>
      {data.country} - {data.name}
    </CardStyled>
  </>
);

export default CardUniversity;
