import sqlite3

class DbConnection:
    def __init__(self, db_name):
        self.database_name = db_name
        self.connection = None
        self.cursor = None
        self.connect_to_database()
    
    def create_tables(self):
        self.cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")

        tables = self.cursor.fetchall()

        if ('Customers',) not in tables:
            self.cursor.execute('''CREATE TABLE Customers(id INTEGER PRIMARY KEY, name TEXT)''')
            self.connection.commit()

        if ('Objects',) not in tables:
            self.cursor.execute('''CREATE TABLE Objects(id INTEGER PRIMARY KEY, name TEXT, address TEXT, customer_id INTEGER, FOREIGN KEY (customer_id) REFERENCES Customers(id) ON DELETE CASCADE)''')
            self.connection.commit()

        if ('Contracts',) not in tables:
            self.cursor.execute('''CREATE TABLE Contracts
                                (id INTEGER PRIMARY KEY, contract_number TEXT, customer_id INTEGER,
                                FOREIGN KEY (customer_id) REFERENCES Customers(id) ON DELETE CASCADE)''')
            self.connection.commit()

        if ('Licensees',) not in tables:
            self.cursor.execute('''CREATE TABLE Licensees
                                (id INTEGER PRIMARY KEY, name TEXT, customer_id INTEGER,
                                FOREIGN KEY (customer_id) REFERENCES Customers(id) ON DELETE CASCADE)''')
            self.connection.commit()

        if ('Equipment',) not in tables:
            self.cursor.execute('''CREATE TABLE Equipment
                                (id INTEGER PRIMARY KEY, name TEXT)''')
            self.connection.commit()

    def connect_to_database(self):
        self.connection = sqlite3.connect(self.database_name)
        self.cursor = self.connection.cursor()
        self.cursor.execute("PRAGMA foreign_keys = ON")

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        self.connection.close()