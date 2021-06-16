import React from 'react';

// const exchanges = [
//   {
//     id: 'bittrex',
//     name: 'Bittrex',
//     website: 'bittrex.com',
//     phone: '(333) 333-3333',
//     logo: `https://gem-widgets-assets.s3-us-west-2.amazonaws.com/institutions/icons/color/bittrex_color_logo%402x.png`,
//   },
//   {
//     id: 'coinbase',
//     name: 'Coinbase',
//     website: 'coinbase.com',
//     phone: '(333) 333-3333',
//     logo: `https://gem-widgets-assets.s3-us-west-2.amazonaws.com/institutions/icons/color/coinbase_color_logo%402x.png`,
//   },
//   {
//     id: 'gate-io',
//     name: 'Gate.io',
//     website: 'gate.io',
//     phone: '(333) 333-3333',
//     logo: `https://gem-widgets-assets.s3-us-west-2.amazonaws.com/institutions/icons/color/gate-io_color_logo%402x.png`,
//   },
//   {
//     id: 'kraken',
//     name: 'Kraken',
//     website: 'kraken.com',
//     phone: '(333) 333-3333',
//     logo: `https://gem-widgets-assets.s3-us-west-2.amazonaws.com/institutions/icons/color/kraken_color_logo%402x.png`,
//   },
// ];

const ExchangeList = ({ query, onSelect, exchanges }) => {
  const filteredExchanges = exchanges.filter((exchange) =>
    exchange.name.toLowerCase().includes(query)
  );
  return (
    <div className="exchange-list-container">
      <p>
        {filteredExchanges.length} results {query ? 'for ' : ''}
        <span className="query">{query}</span>
      </p>
      <div className="exchange-list-rows">
        {filteredExchanges.map((exchange) => (
          <ExchangeRow
            exchange={exchange}
            onSelect={onSelect}
            key={exchange.id}
          />
        ))}
      </div>
    </div>
  );
};

const ExchangeRow = ({ exchange, onSelect }) => {
  return (
    <div className="exchange-row" onClick={() => onSelect(exchange)}>
      <div className="exchange-icon-container">
        <img src={exchange.logo} alt={exchange.name} />
      </div>
      <div className="exchange-info">
        <h6>{exchange.name}</h6>
        <p>{exchange.website}</p>
      </div>
    </div>
  );
};

export default ExchangeList;
