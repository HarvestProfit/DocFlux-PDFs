import PageBreak from './DOMComponents/PageBreak';
import TextNode from './DOMComponents/TextNode';
import Table from './DOMComponents/Table';
import Image from './DOMComponents/Image';
import Raw from './DOMComponents/Raw';
import Variable from './DOMComponents/Variable';
import { Header, Footer } from './DOMComponents/HeaderFooter';
import TableRowContainer, { TableHeader, TableBody } from './DOMComponents/TableRowContainer';


export default {
  br: PageBreak,
  div: TextNode,
  h1: TextNode,
  h2: TextNode,
  h3: TextNode,
  h4: TextNode,
  h5: TextNode,
  h6: TextNode,
  p: TextNode,
  span: TextNode,
  small: TextNode,
  b: TextNode,
  em: TextNode,
  ol: TextNode,
  ul: TextNode,
  li: TextNode,
  a: TextNode,
  table: Table,
  thead: TableHeader,
  th: TextNode,
  tbody: TableBody,
  tr: TableRowContainer,
  td: TextNode,
  img: Image,
  raw: Raw,
  header: Header,
  footer: Footer,
  currentpage: Variable,
  totalpages: Variable,
};
