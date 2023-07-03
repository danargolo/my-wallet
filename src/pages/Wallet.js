import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/Form';
import Table from '../components/Table';
import '../styles/wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <section className="wallet">
          <WalletForm />
          <Table />
        </section>
      </>
    );
  }
}

export default Wallet;
