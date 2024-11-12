class Customer:
    def __init__(self, db):
        self.db = db

    def delete(self, id):
        self.db.cursor.execute(f"DELETE FROM Customers WHERE id = ?", (id,))
        self.db.connection.commit()

    def create(self, name):
        self.db.cursor.execute("INSERT INTO Customers (name) VALUES (?)", (name,))

        self.db.connection.commit()

    def update(self, id, name):
        self.db.cursor.execute(f"UPDATE Customers SET name = ? WHERE id = ?", (name, id,))

        self.db.connection.commit()
    
    def findOne(self, id):
        self.db.cursor.execute(f"SELECT Customers.* FROM Customers WHERE id = ?", (id,))
        
        record = self.db.cursor.fetchone()

        if not record:
            return None
        
        item = self.record_to_item(record)

        return item

    def findAll(self):
        query = 'SELECT Customers.* FROM Customers'

        self.db.cursor.execute(query)

        records = self.db.cursor.fetchall()

        items = self.records_to_items(records)

        return items
    
    def record_to_item(self, record):
        return {"id": record[0], "name": record[1]}
        
    def records_to_items(self, records):
        items = []

        for record in records:
            items.append(self.record_to_item(record))

        return items