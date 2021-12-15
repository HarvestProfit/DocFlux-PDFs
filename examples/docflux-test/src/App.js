import React from 'react';
import './App.css';

import SettlementsPDF from './documents/SettlementsPDF';

class App extends React.Component {
  exportPdf = () => {
    console.log('pdf yo');
    const pdf = SettlementsPDF.create({});
    pdf.download();
  }

  render = () => (
    <div className="App">
      <button onClick={this.exportPdf}>
        Download PDF
      </button>
    </div>
  );
}

export default App;