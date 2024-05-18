import { FC, useEffect, useState } from "react";
import { IUniversity } from "./university.interface";
import CardUniversity from "../Card/cardUniversity";
import axios from "axios";
import { InView, useInView } from "react-intersection-observer";
import { ListStyle } from "../List/List.styles";
import styled from "styled-components";

const LIMIT_UNIVERSITIES = 10;

const BlockOnServer = styled.div`
  height: 100px;
  background-color: rgba(green, 0.1);
  border: 2px solid white;
  margin-bottom: 10px;
`;

const DynamicPagination: FC = () => {
  const [universities, setUniversities] = useState<IUniversity[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchUniversities();
  }, [currentPage]);

  const { ref, inView } = useInView({
    threshold: 1.0,
  });

  useEffect(() => {
    if (inView) {
      console.log("inView");
      setLoading(true);
      setCurrentPage((prev) => prev + 1);
    }
  }, [inView]);

  const fetchUniversities = async () => {
    try {
      const offset = (currentPage - 1) * LIMIT_UNIVERSITIES;
      const response = await axios.get(
        `http://universities.hipolabs.com/search?offset=${offset}&limit=${LIMIT_UNIVERSITIES}`,
      );
      setUniversities((prev) => [...prev, ...response.data]);
    } catch (error) {
      console.log("fetch universities err:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>List Universities</h1>
      <p>Dynamic Pagination</p>
      {/* <ListStyle> */}
      {universities.map((university: IUniversity, idx: number) => (
        <CardUniversity data={university} key={idx} />
      ))}
      {loading && <div>Loading...</div>}
      {!loading && <BlockOnServer ref={ref}></BlockOnServer>}
      {/* </ListStyle> */}
    </>
  );
};

export default DynamicPagination;
