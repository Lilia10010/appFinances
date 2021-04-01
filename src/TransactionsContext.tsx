import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from './services/api';


interface Transaction{
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}
//omt quais os campos para retirar e Pick quais quer usar
type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

interface TransactionProviderProps{
    children: ReactNode;
}

interface TransactionsContextData{
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => void;
}

export const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
)

export function TransactionsProvider({children}: TransactionProviderProps){
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        api.get('transactions')
        //salvando os dados dentro do estado
        .then(response =>setTransactions(response.data.transactions))
    }, [])

    function createTransaction(transaction: TransactionInput){
        api.post('/transaction', transaction)
    }

    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    )
}