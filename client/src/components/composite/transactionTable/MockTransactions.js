const createMockTransaction = () => ({
    "id": Math.random().toString(),
    "created_at": "2019-09-16T21:55:40.849Z",
    "updated_at": "2019-09-16T21:55:40.849Z",
    "user_id": "resource_8bfd0fbbbe56ac3f",
    "source": {
      "id": "resource_8bfd0fbbbe56ac3f",
      "created_at": "2019-09-16T21:55:40.849Z",
      "updated_at": "2019-09-16T21:55:40.849Z",
      "asset_id": "bitcoin",
      "status": "available",
      "name": "My BTC Wallet",
      "type": "ExchangeAccount",
      "enabled": true,
      "connection_id": "resource_8bfd0fbbbe56ac3f"
    },
    "fees": [
      {
        "type": "NetworkFee",
        "amount": 2.0000123,
        "asset_id": "bitcoin",
        "summary": "Bitcoin Network Fee",
        "description": "This fee is charged by the Bitcoin network to process this transaction."
      }
    ],
    "status": "completed",
    "source_amount": 2.0000123,
    "destination_amount": 2.0000123,
    "source_asset_id": "bitcoin",
    "destination_asset_id": "bitcoin",
    "type": "Transfer",
    "additional_data": {},
    "reason": {
      "message": "Completed successfully."
    },
    "destination": { address: "735gy3bry83487r48g3r348r8g74" }
});

const mockTransactions = new Array(50).fill(createMockTransaction());

export default mockTransactions;