import { TransactionProps } from "@/lib/transaction";
import { formatSilverEuro } from "@/lib/utils";

export function Transactions({
  transactions,
}: {
  transactions: TransactionProps[];
}) {
  return (
    <div>
      <ul>
        {transactions.map((transaction) => {
          return (
            <TransactionItem key={transaction.id} transaction={transaction} />
          );
        })}
      </ul>
    </div>
  );
}

function TransactionItem({ transaction }: { transaction: TransactionProps }) {
  return (
    <li key={transaction.id}>
      {transaction.narrative}: {formatSilverEuro(transaction.amount)}
    </li>
  );
}
