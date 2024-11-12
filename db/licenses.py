class Licensees:
    def __init__(self, db):
        self.db = db

    def delete(self, id):
        self.db.cursor.execute(f"DELETE FROM Licensees WHERE id = ?", (id,))
        self.db.connection.commit()

    def create(self, name, customer_id):
        self.db.cursor.execute("INSERT INTO Licensees (name, customer_id) VALUES (?, ?)", (name, customer_id))

        self.db.connection.commit()

    def update(self, id, name, customer_id):
        self.db.cursor.execute(f"UPDATE Licensees SET name = ?, customer_id = ? WHERE id = ?", (name, customer_id, id,))

        self.db.connection.commit()
    
    def findByCustomer(self, customer_id):
        query = '''
            SELECT 
                Licensees.id, Licensees.name, Licensees.customer_id, Customers.id as CustomerId, Customers.name 
            FROM Licensees 
            JOIN Customers ON Customers.id = Licensees.customer_id
            WHERE Licensees.customer_id = ?
        '''

        self.db.cursor.execute(query, (customer_id,))

        record = self.db.cursor.fetchone()

        print(record)
        if not record:
            return None

        items = self.record_to_item(record)

        return items
    
    def findOne(self, id):
        self.db.cursor.execute(f'''
            SELECT 
                Licensees.id, Licensees.name, Licensees.customer_id, Customers.id as CustomerId, Customers.name 
            FROM Licensees 
            JOIN Customers ON Customers.id = Licensees.customer_id
            WHERE Licensees.id = ?
        ''', (id,))

        record = self.db.cursor.fetchone()
        
        if not record:
            return None
        
        item = self.record_to_item(record)

        return item

    def findAll(self):
        query = '''
            SELECT 
                Licensees.id, Licensees.name, Licensees.customer_id, Customers.id as CustomerId, Customers.name 
            FROM Licensees 
            JOIN Customers ON Customers.id = Licensees.customer_id
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
        
        return {"id": record[0], "name": record[1], "customer_id": record[2], "customer": customer}
        
    def records_to_items(self, records):
        items = []

        for record in records:
            items.append(self.record_to_item(record))

        return items