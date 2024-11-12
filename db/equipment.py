class Equipment:
    def __init__(self, db):
        self.db = db

    def delete(self, id):
        self.db.cursor.execute(f"DELETE FROM Equipment WHERE id = ?", (id,))
        self.db.connection.commit()

    def create(self, name):
        self.db.cursor.execute("INSERT INTO Equipment (name) VALUES (?)", (name,))

        self.db.connection.commit()

    def update(self, id, name):
        self.db.cursor.execute(f"UPDATE Equipment SET name = ? WHERE id = ?", (name, id,))

        self.db.connection.commit()
    
    def findOne(self, id):
        self.db.cursor.execute(f"SELECT Equipment.* FROM Equipment WHERE id = ?", (id,))
        
        record = self.db.cursor.fetchone()

        if not record:
            return None
        
        item = self.record_to_item(record)

        return item

    def findByName(self, name):
        self.db.cursor.execute(f"SELECT Equipment.* FROM Equipment WHERE name = ?", (name,))
        
        record = self.db.cursor.fetchone()

        if not record:
            return None
        
        item = self.record_to_item(record)

        return item
    
    def findAll(self):
        query = 'SELECT Equipment.* FROM Equipment'

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