class Contracts:
    def __init__(self, db):
        self.db = db

    def delete(self, id):
        self.db.cursor.execute(f"DELETE FROM Contracts WHERE id = ?", (id,))
        self.db.connection.commit()

    def create(self, contract_number, customer_id):
        self.db.cursor.execute("INSERT INTO Contracts (contract_number, customer_id) VALUES (?, ?)", (contract_number, customer_id))

        self.db.connection.commit()

    def update(self, id, contract_number, customer_id):
        self.db.cursor.execute(f"UPDATE Contracts SET contract_number = ?, customer_id = ? WHERE id = ?", (contract_number, customer_id, id,))

        self.db.connection.commit()
    
    def findByCustomer(self, customer_id):
        query = 'SELECT Contracts.* FROM Contracts WHERE customer_id = ?'

        self.db.cursor.execute(query, (customer_id,))

        records = self.db.cursor.fetchall()

        items = self.records_to_items(records)

        return items
    
    def findOne(self, id):
        self.db.cursor.execute(f'''
            SELECT 
                Contracts.id, Contracts.contract_number, Contracts.customer_id, Customers.id as CustomerId, Customers.name 
            FROM Contracts 
            JOIN Customers ON Customers.id = Contracts.customer_id
            WHERE Contracts.id = ?
        ''', (id,))

        record = self.db.cursor.fetchone()

        if not record:
            return None
        
        item = self.record_to_item(record)

        return item

    def findAll(self):
        query = '''
            SELECT 
                Contracts.id, Contracts.contract_number, Contracts.customer_id, Customers.id as CustomerId, Customers.name 
            FROM Contracts 
            JOIN Customers ON Customers.id = Contracts.customer_id
        '''
        self.db.cursor.execute(query)

        records = self.db.cursor.fetchall()

        items = self.records_to_items(records)

        return items

    def record_to_item(self, record):
        customer = {
            "id": record[3],
            "name": record[4]
        }
        
        return {"id": record[0], "contract_number": record[1], "customer_id": record[2], "customer": customer}
        
    def records_to_items(self, records):
        items = []

        for record in records:
            items.append(self.record_to_item(record))

        return items