---
category :
tags : [learning, tutorial]
use_math : true
date: 2019-10-15
title: "Sample Explain Isolation Level"
draft: false
---

When using a database system, developers need to specify the isolation level to determine how transaction integrity is visible to other concurrent operations. I liked the way how [postgresql][1] define its isolation levels. Its isolation levels are defined in terms of phenomena, resulting from interaction, resulting from interaction between concurrent transactions, which must not occur at each level.

## **Phenomena**
The following four phenomenas are the possible results if concurrent transactions are executed at the **read uncommited** level, which I remembered as an level without any isolation effect.

### **dirty read**
A transaction reads data written by a concurrent uncommitted transaction.

*Example*:

Transaction A is trying to update the balance for account "1111" and account "1112"

```
BEGIN;
UPDATE accounts SET balance = balance + 100.00 WHERE acctnum = 1111;
UPDATE accounts SET balance = balance - 100.00 WHERE acctnum = 1112;
COMMIT;
```
Transaction B is trying to query the balance for account "1111"

```
BEGIN;
SELECT balance FROM accounts WHERE acctnum = 1111;
COMMIT;
```
If the `SELECT` of Transaction B is executed between the two `UPDATE` of Transaction A, then Transaction B would read the uncommited balance of account "1111". If Transaction A is commited successfully, then the result is the same. But if Transacation A failed to be commited, then the result of `SELECT` in Transacation B would be a wrong value since the value has been commited to the perminant table at the end.

### **nonrepeatable read**
A transaction re-reads data it has previously read and finds the data has been modified by another transaction(that committed since the initial read).

*Example*:
Transaction A is trying to update the balance for account "1111"

```
BEGIN;
UPDATE accounts SET balance = balance + 100.00 WHERE acctnum = 1111;
COMMIT;
```
Transaction B is trying to query the balance for account "1111" twiice

```
BEGIN;
SELECT balance FROM accounts WHERE acctnum = 1111;
SELECT balance FROM accounts WHERE acctnum = 1111;
COMMIT;
```
If the `COMMIT` of Transaction A happened between the two `SELECT` of transaction B, then the results of two `SELECT` in Transaction B would be different.

### **phantom read**
A transaction re-executes a query returning a set of rows that satify a search condition and find that the set of rows satisfying the condition has changed due to another recently-committed transaction.

*Example*:
Transaction A is trying to insert the account of account "1111"

```
INSERT INTO accounts
(account, balance)
VALUES
(1111, 1000.00);
```
Transaction B is trying to get balance of account "1111" twice

```
BEGIN;
SELECT balance FROM accounts WHERE acctnum = 1111;
SELECT balance FROM accounts WHERE acctnum = 1111;
COMMIT;
```
If the `INSERT` of Transaction A commited between the two `SELECT` of Transaction B, then the results of two `SELECT` in Transaction B would be different, the second `SELECT` would get the new committed row while the first one didn't.

Sometimes, it would be hard to tell the difference between **nonrepeatable read** and **phantom read**, because both them seems like just commit some writes to a table while another transaction is trying to read this table. A way to distinguish I learned previously is to see whether this wrong result can be prevent by adding a lock to the index of the record was trying to be updated in one Transaction.

For example, in the example of **nonrepeatable read**, if we add a lock to index account "1111" when Transcaction B first `SELECT` the record of account "1111", then transaction A cannot be commited since it would be told it is trying to update a locked record and transaction A would be rolled back. In the example of **phantom read**, we ain't able to add a similar lock when transaction B first `SELECT` since we don't even have the record account "1111" at our table at that time.

### **serialization anomaly**
The result of successfully committing a group of transactions is inconsistent with all possible ordering of running those transactions one at a time. Serializabilty is the ability to ensure that a schedule for executing concurrent transactions is equivalent to oen that executes the transactions serially in some order.

*Example*:
Transaction A is trying to insert the account of account "1111"

```
INSERT INTO accounts
(account, balance)
VALUES
(1111, 1000.00);
```
Transaction B is trying to get balance of account "1111" twice

```
BEGIN;
SELECT balance FROM accounts WHERE acctnum = 1111;
SELECT balance FROM accounts WHERE acctnum = 1111;
COMMIT;
```
One good serializabilty is to make sure the result of concurrent running transaction A and transaction B has the same result as running them in order `A->B` or `B->A`.

## **Isolation Level**
The following table is used to define the general isolation levels for the database system. Some database systems, such as postgresql, may have their own definition tables.

| Isolation Level  | Dirty Read | Nonrepeatable Read | Phantom Read | Serialization Anomaly |
|---|---|---|---|---|
| Read uncommited | Possible | Possible | Possible | Possible |
| Read commited | Not possible | Possible | Possible | Possible |
| Repeatable read | Not possible | Not possible | Possible | Possible |
| Serializable | Not possible | Not possible | Not possible | Not possible |


## References
[Postgresql](https://www.postgresql.org/docs/9.5/transaction-iso.html)

[Transaction, Isolation, Lock](https://www.jianshu.com/p/cb97f76a92fd)
