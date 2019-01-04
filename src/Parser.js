import PageBreak from './DOMComponents/PageBreak';
import TextNode from './DOMComponents/TextNode';
import Table from './DOMComponents/Table';
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
  table: Table,
  thead: TableHeader,
  th: TextNode,
  tbody: TableBody,
  tr: TableRowContainer,
  td: TextNode,
};
