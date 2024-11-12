class Object:
    def __init__(self, db):
        self.db = db

    def delete(self, id):
        self.db.cursor.execute(f"DELETE FROM Objects WHERE id = ?", (id,))
        self.db.connection.commit()

    def create(self, name, address, customer_id):
        self.db.cursor.execute("INSERT INTO Objects (name, address, customer_id) VALUES (?, ?, ?)", (name, address, customer_id))

        self.db.connection.commit()

    def update(self, id, name, address, customer_id):
        self.db.cursor.execute(f"UPDATE Objects SET name = ?, address = ?, customer_id = ? WHERE id = ?", (name, address, customer_id, id,))

        self.db.connection.commit()
    
    def findByCustomer(self, customer_id):
        query = 'SELECT Objects.* FROM Objects WHERE customer_id = ?'

        self.db.cursor.execute(query, (customer_id,))

        records = self.db.cursor.fetchall()

        items = self.records_to_items(records)

        return items
    
    def findOne(self, id):
        self.db.cursor.execute(f'''
            SELECT 
                Objects.id, Objects.name, Objects.address, Objects.customer_id, Customers.id as CustomerId, Customers.name 
            FROM Objects 
            JOIN Customers ON Customers.id = Objects.customer_id
            WHERE Objects.id = ?
        ''', (id,))
        
        record = self.db.cursor.fetchone()

        if not record:
            return None
        
        item = self.record_to_item(record)

        return item

    def findAll(self):
        query = '''
            SELECT 
                Objects.id, Objects.name, Objects.address, Objects.customer_id, 
                Customers.id as CustomerId, Customers.name 
            FROM Objects 
            JOIN Customers ON Customers.id = Objects.customer_id
        '''

        self.db.cursor.execute(query)

        records = self.db.cursor.fetchall()

        items = self.records_to_items(records)

        return items

    def record_to_item(self, record):
        customer = {"id": record[4], "name": record[5]}
        item = {"id": record[0], "name": record[1], "address": record[2], "customer_id": record[3], "customer": customer}

        return item
        
    def records_to_items(self, records):
        items = []

        for record in records:
            items.append(self.record_to_item(record))

        return items